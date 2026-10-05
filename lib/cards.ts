import type { Post } from '../types';
import { isCardType, requireSupabase, type CardRow } from './supabase';

export type EditableCard = Omit<Post, 'id' | 'thumbnail'>;

const mapRowToPost = (row: CardRow): Post => {
  if (!isCardType(row.type)) {
    throw new Error(`Card ${row.id} has an unsupported type: ${row.type}`);
  }

  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    description: row.description,
    coverImage: (() => {
      const raw = (row as any).coverimage || row.cover_image || (row as any).coverImage;
      if (!raw) return '';
      if (raw.startsWith('http')) return raw;
      return raw.replace(/^\/(media\/)?/, '');
    })(),
    iconImage: row.icon_image ?? undefined,
    type: row.type,
    category: row.category ?? undefined,
    tags: row.tags || (row as any).tag_list || [],
    videoUrl: (row as any).videourl || row.video_url || (row as any).videoUrl || undefined,
    channelUrl: (row as any).channelurl || row.channel_url || (row as any).channelUrl || undefined,
    externalLink: (row as any).externallink || row.external_link || (row as any).externalLink || undefined,
    gameLinks: (row as any).gameLinks || row.game_links || (row as any).gamelinks || [],
    imageIndex: row.image_index ?? undefined,
    sliderImages: row.slider_images,
  };
};

const mapPostToRow = (post: EditableCard, id?: string) => ({
  id: id || crypto.randomUUID(),
  title: post.title,
  subtitle: post.subtitle || null,
  description: post.description,
  cover_image: post.coverImage || '',
  icon_image: post.iconImage || null,
  type: post.type,
  category: post.category || null,
  tags: post.tags ?? [],
  video_url: post.videoUrl || null,
  channel_url: post.channelUrl || null,
  external_link: post.externalLink || null,
  game_links: post.gameLinks ?? [],
  image_index: post.imageIndex ?? null,
  slider_images: post.sliderImages ?? [],
});

export const fetchCards = async (): Promise<Post[]> => {
  const client = requireSupabase();
  const pageSize = 1000;
  const rows: CardRow[] = [];

  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await client
      .from('cards')
      .select('*')
      .order('title', { ascending: true })
      .order('id', { ascending: true })
      .range(offset, offset + pageSize - 1);

      console.log('Supabase 응답 데이터:', data);
      console.log('Supabase 에러:', error);

    if (error) throw error;
    rows.push(...data);
    if (data.length < pageSize) break;
  }

  return rows.map(mapRowToPost);
};

export const insertCard = async (post: EditableCard): Promise<Post> => {
  const { data, error } = await requireSupabase()
    .from('cards')
    .insert(mapPostToRow(post))
    .select()
    .single();

  if (error) throw error;
  return mapRowToPost(data);
};

export const updateCard = async (id: string, post: EditableCard): Promise<Post> => {
  const { data, error } = await requireSupabase()
    .from('cards')
    .update(mapPostToRow(post))
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return mapRowToPost(data);
};

export const deleteCard = async (id: string): Promise<void> => {
  const { data, error } = await requireSupabase()
    .from('cards')
    .delete()
    .eq('id', id)
    .select('id')
    .single();

  if (error) throw error;
  if (!data) throw new Error(`Card ${id} was not found.`);
};

export const seedCards = async (posts: Post[]): Promise<Post[]> => {
  const rows = posts.map(({ id, ...post }) => mapPostToRow(post, id));
  const { data, error } = await requireSupabase()
    .from('cards')
    .insert(rows)
    .select()
    .order('title', { ascending: true });

  if (error) throw error;
  return data.map(mapRowToPost);
};
