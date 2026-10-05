import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

type Bucket = 'game' | 'ref' | 'media';
type PostRow = Record<string, unknown> & {
  id: string | number;
  title?: string;
  type?: string;
  category?: string | null;
  source_key?: string | null;
  coverImage?: string | null;
  cover_image?: string | null;
};

type MigrationTarget = {
  post: PostRow;
  bucket: Bucket;
  relativeFilePath: string;
  absoluteFilePath: string;
  currentCoverImage: string | null;
};

const projectRoot = process.cwd();
const localMediaRoot = path.join(projectRoot, 'public', 'media');
const pageSize = 500;
const bucketNames: Bucket[] = ['game', 'ref', 'media'];

const describeError = (error: { message: string; code?: string; details?: string; hint?: string }) =>
  [error.message, error.code && `code=${error.code}`, error.details && `details=${error.details}`, error.hint && `hint=${error.hint}`]
    .filter(Boolean)
    .join(' | ');

const createAdminClient = (url: string, serviceRoleKey: string) => createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const readCoverImage = (post: PostRow): { value: string | null; column: 'coverImage' | 'cover_image' } | null => {
  if (typeof post.coverImage === 'string' || post.coverImage === null) {
    return { value: post.coverImage, column: 'coverImage' };
  }
  if (typeof post.cover_image === 'string' || post.cover_image === null) {
    return { value: post.cover_image, column: 'cover_image' };
  }
  return null;
};

const sourceKeyParts = (post: PostRow): { bucket: Bucket; index: number } | null => {
  if (typeof post.source_key !== 'string') return null;
  const match = post.source_key.match(/^(game|ref|media):(\d+)$/i);
  if (!match) return null;
  return { bucket: match[1].toLowerCase() as Bucket, index: Number(match[2]) };
};

const sortBySourceIndex = (left: PostRow, right: PostRow): number => {
  const leftSource = sourceKeyParts(left);
  const rightSource = sourceKeyParts(right);
  return (leftSource?.index ?? Number.MAX_SAFE_INTEGER) - (rightSource?.index ?? Number.MAX_SAFE_INTEGER);
};

const fetchAllPosts = async (
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<{ posts: PostRow[]; supabase: ReturnType<typeof createAdminClient> }> => {
  const supabase = createAdminClient(supabaseUrl, serviceRoleKey);
  const posts: PostRow[] = [];
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: true })
      .range(offset, offset + pageSize - 1);
    if (error) throw new Error(`Could not read posts (${offset}-${offset + pageSize - 1}): ${describeError(error)}`);
    posts.push(...(data as PostRow[]));
    if (!data || data.length < pageSize) break;
  }
  return { posts, supabase };
};

const normalizeLocalPath = (coverImage: string): string | null => {
  const source = coverImage.trim().replace(/\\/g, '/');
  if (/^(?:https?:|data:|blob:|\/\/)/i.test(source)) return null;
  const normalized = source.replace(/^\/+/, '').replace(/^public\//i, '');
  if (normalized.toLowerCase().startsWith('media/')) return normalized.slice('media/'.length);
  if (/^(?:game|ref)\//i.test(normalized)) return normalized;
  return null;
};

const classifyBucket = (post: PostRow, relativeFilePath: string): Bucket | null => {
  const folder = relativeFilePath.split('/')[0]?.toLowerCase();
  if (folder === 'game' || folder === 'ref') return folder;
  if (!relativeFilePath.includes('/')) return 'media';
  if (folder && bucketNames.includes(folder as Bucket)) return folder as Bucket;

  const type = typeof post.type === 'string' ? post.type.toLowerCase() : '';
  const category = typeof post.category === 'string' ? post.category.toLowerCase() : '';
  if (type === 'game' || category.includes('game')) return 'game';
  if (type === 'ref' || category.includes('reference')) return 'ref';
  return 'media';
};

const makeTargets = async (posts: PostRow[]): Promise<{ targets: MigrationTarget[]; missing: string[] }> => {
  const localPosts = posts.flatMap((post) => {
    const cover = readCoverImage(post);
    const localPath = cover?.value ? normalizeLocalPath(cover.value) : null;
    return cover && localPath ? [{ post, cover, localPath }] : [];
  });

  const byBucket = new Map<Bucket, typeof localPosts>();
  for (const item of localPosts) {
    const bucket = classifyBucket(item.post, item.localPath);
    if (!bucket) continue;
    const existing = byBucket.get(bucket) ?? [];
    existing.push(item);
    byBucket.set(bucket, existing);
  }

  const targets: MigrationTarget[] = [];
  const missing: string[] = [];

  for (const [bucket, items] of byBucket) {
    const orderedItems = [...items].sort((left, right) => sortBySourceIndex(left.post, right.post));
    for (const item of orderedItems) {
      const selectedPath = path.resolve(localMediaRoot, item.localPath);
      const rootCandidate = path.resolve(localMediaRoot);
      if (!selectedPath.startsWith(`${rootCandidate}${path.sep}`)) {
        missing.push(`${String(item.post.id)} (${item.localPath}: path outside public/media)`);
        continue;
      }

      try {
        await readFile(selectedPath);
      } catch {
        missing.push(`${String(item.post.id)} (${item.localPath}: local asset not found)`);
        continue;
      }

      const relativePath = path.relative(localMediaRoot, selectedPath).split(path.sep).join('/');
      targets.push({
        post: item.post,
        bucket,
        relativeFilePath: relativePath,
        absoluteFilePath: selectedPath,
        currentCoverImage: item.cover.value,
      });
    }
  }

  return { targets, missing };
};

const migrateStorage = async () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl) throw new Error('Set SUPABASE_URL or VITE_SUPABASE_URL in the local .env file.');
  if (!serviceRoleKey) throw new Error('Set SUPABASE_SERVICE_ROLE_KEY in the local .env file. Do not use a VITE_ prefix.');

  const { posts, supabase } = await fetchAllPosts(supabaseUrl, serviceRoleKey);
  const { targets, missing } = await makeTargets(posts);

  console.log(`Read ${posts.length} posts from Supabase.`);
  console.log(`Local image migration candidates: ${targets.length}.`);
  for (const bucket of bucketNames) {
    console.log(`  ${bucket}: ${targets.filter((target) => target.bucket === bucket).length}`);
  }
  if (missing.length) {
    console.warn(`Skipped ${missing.length} local image(s) with no matching file:`);
    for (const entry of missing) console.warn(`  ${entry}`);
  }
  if (process.argv.includes('--dry-run')) {
    for (const target of targets) {
      console.log(`DRY RUN post=${target.post.id} bucket=${target.bucket} file=${target.relativeFilePath}`);
    }
    console.log('Dry run complete. No uploads or database updates were made.');
    return;
  }
  if (targets.length === 0) {
    console.log('No matching local card images found. No changes were made.');
    return;
  }

  let uploadedCount = 0;
  let updatedCount = 0;
  let errorCount = 0;
  for (const target of targets) {
    const storagePath = path.basename(target.relativeFilePath);
    try {
      const file = await readFile(target.absoluteFilePath);
      const extension = path.extname(target.absoluteFilePath).toLowerCase();
      const contentType = extension === '.svg' ? 'image/svg+xml'
        : extension === '.png' ? 'image/png'
          : extension === '.gif' ? 'image/gif'
            : extension === '.avif' ? 'image/avif'
              : extension === '.webp' ? 'image/webp'
                : extension === '.jpg' || extension === '.jpeg' ? 'image/jpeg'
                  : 'application/octet-stream';

      const { error: uploadError } = await supabase.storage
        .from(target.bucket)
        .upload(storagePath, file, { contentType, upsert: true, cacheControl: '3600' });
      if (uploadError) throw new Error(`Storage upload: ${describeError(uploadError)}`);
      uploadedCount += 1;

      const { data } = supabase.storage.from(target.bucket).getPublicUrl(storagePath);
      if (!data.publicUrl) throw new Error('Storage returned an empty public URL.');

      const coverColumn = Object.hasOwn(target.post, 'cover_image') && !Object.hasOwn(target.post, 'coverImage')
        ? 'cover_image'
        : 'coverImage';
      let updateQuery = supabase
        .from('posts')
        .update({ [coverColumn]: data.publicUrl })
        .eq('id', target.post.id);
      updateQuery = target.currentCoverImage === null
        ? updateQuery.is(coverColumn, null)
        : updateQuery.eq(coverColumn, target.currentCoverImage);
      const { data: updatedRows, error: updateError } = await updateQuery.select('id');
      if (updateError) throw new Error(`Database update: ${describeError(updateError)}`);
      if (!updatedRows?.length) {
        throw new Error('Database row changed during migration or was not updated; review this record before retrying.');
      }
      updatedCount += 1;
      console.log(`Updated ${String(target.post.id)} "${target.post.title || ''}" -> ${target.bucket}/${storagePath}`);
    } catch (error) {
      errorCount += 1;
      console.error(`Failed post=${String(target.post.id)} file=${storagePath}:`, error instanceof Error ? error.message : String(error));
    }
  }

  console.log(`Migration finished. Uploaded: ${uploadedCount}, database rows updated: ${updatedCount}, errors: ${errorCount}.`);
  if (errorCount > 0) process.exitCode = 1;
};

void migrateStorage().catch((error: unknown) => {
  console.error('Storage migration failed:', error instanceof Error ? error.stack || error.message : error);
  process.exitCode = 1;
});
