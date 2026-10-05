import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { CREATOR_ITEMS } from '../constants/creator';
import { GAME_ITEMS } from '../constants/game';
import { REF_ITEMS } from '../constants/ref';
import { MEDIA_ITEMS } from '../constants/media';
import type { Post } from '../types';

type Source = {
  key: string;
  label: string;
  items: Omit<Post, 'id'>[];
};

type SupabaseErrorDetails = {
  message: string;
  code?: string;
  details?: string;
  hint?: string;
};

const describeSupabaseError = (error: SupabaseErrorDetails): string => [
  error.message,
  error.code ? `code: ${error.code}` : '',
  error.details ? `details: ${error.details}` : '',
  error.hint ? `hint: ${error.hint}` : '',
].filter(Boolean).join(' | ');

const sources: Source[] = [
  { key: 'creator', label: 'Creator', items: CREATOR_ITEMS },
  { key: 'game', label: 'Game', items: GAME_ITEMS },
  { key: 'ref', label: 'Reference', items: REF_ITEMS },
  { key: 'media', label: 'Media', items: MEDIA_ITEMS },
];

const formatPost = (item: Omit<Post, 'id'>, sourceKey: string) => {
  const {
    title,
    subtitle,
    description,
    coverImage,
    type,
    category,
    ...metadata
  } = item;

  if (!title.trim()) {
    throw new Error(`Empty title found in source record ${sourceKey}.`);
  }

  return {
    source_key: sourceKey,
    title: title.trim(),
    subtitle: subtitle || '',
    description: description || '',
    coverImage: coverImage || '',
    type,
    category: category ?? null,
    metadata,
  };
};

const formattedItems = sources.flatMap((source) =>
  source.items.map((item, index) => formatPost(item, `${source.key}:${index}`)),
);

const validateConfiguration = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl) {
    throw new Error('Set SUPABASE_URL (or VITE_SUPABASE_URL) in .env.');
  }
  try {
    new URL(supabaseUrl);
  } catch {
    throw new Error('SUPABASE_URL must be a valid absolute URL.');
  }
  if (!supabaseServiceRoleKey) {
    throw new Error('Set SUPABASE_SERVICE_ROLE_KEY in .env. Never use a VITE_ prefix for this secret.');
  }

  return { supabaseUrl, supabaseServiceRoleKey };
};

const migrateData = async () => {
  if (formattedItems.length === 0) {
    throw new Error('No constants data found to migrate.');
  }

  const uniqueKeys = new Set(formattedItems.map((item) => item.source_key));
  if (uniqueKeys.size !== formattedItems.length) {
    throw new Error('Duplicate source keys found; refusing to migrate ambiguous card records.');
  }

  const counts = sources.map(({ label, items }) => `${label}: ${items.length}`).join(', ');
  console.log(`Validated ${formattedItems.length} cards (${counts}).`);

  if (process.argv.includes('--dry-run')) {
    console.log('Dry run complete; no Supabase connection or writes were made.');
    return;
  }

  const { supabaseUrl, supabaseServiceRoleKey } = validateConfiguration();
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { error: schemaError } = await supabase
    .from('posts')
    .select('source_key')
    .limit(0);
  if (schemaError) {
    throw new Error(
      `Could not verify posts.source_key. Run supabase/posts-migration.sql first. ${describeSupabaseError(schemaError)}`,
    );
  }

  const batchSize = 500;
  for (let offset = 0; offset < formattedItems.length; offset += batchSize) {
    const batch = formattedItems.slice(offset, offset + batchSize);
    const { error } = await supabase
      .from('posts')
      .upsert(batch, { onConflict: 'source_key' });
    if (error) {
      throw new Error(
        `posts upsert failed (${offset + 1}-${offset + batch.length}): ${describeSupabaseError(error)}. `
        + 'Check the posts schema, source_key unique index, and SUPABASE_SERVICE_ROLE_KEY.',
      );
    }
    console.log(`${offset + batch.length}/${formattedItems.length} cards saved.`);
  }

  const { count, error: verifyError } = await supabase
    .from('posts')
    .select('source_key', { count: 'exact', head: true })
    .in('source_key', [...uniqueKeys]);
  if (verifyError) {
    throw new Error(`Migration writes completed, but verification failed: ${describeSupabaseError(verifyError)}`);
  }
  if (count !== formattedItems.length) {
    throw new Error(`Migration verification found ${count ?? 0} of ${formattedItems.length} source records.`);
  }

  console.log(`Migration verified: ${count} constants cards are present in posts.`);
};

void migrateData().catch((error: unknown) => {
  console.error('Migration failed:');
  if (error instanceof Error) {
    console.error(error.stack || error.message);
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});
