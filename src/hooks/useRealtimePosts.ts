import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { ContentType, type GameLink, type Post } from '../../types';

type PostRow = Record<string, unknown>;

export interface RealtimePostsState {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  isLoading: boolean;
  error: string | null;
}

const isRecord = (value: unknown): value is PostRow =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const readField = (record: PostRow, ...keys: string[]): unknown => {
  for (const key of keys) {
    if (key in record) return record[key];
  }
  const normalizedKeys = new Set(keys.map((key) => key.toLowerCase()));
  const matchingKey = Object.keys(record).find((key) => normalizedKeys.has(key.toLowerCase()));
  return matchingKey ? record[matchingKey] : undefined;
};

const readString = (...values: unknown[]): string | undefined =>
  values.find((value): value is string => typeof value === 'string');

const readStringArray = (...values: unknown[]): string[] | undefined => {
  const value = values.find((candidate) =>
    Array.isArray(candidate) && candidate.every((entry) => typeof entry === 'string'),
  );
  return Array.isArray(value) ? value as string[] : undefined;
};

const readGameLinks = (...values: unknown[]): GameLink[] | undefined => {
  const value = values.find((candidate) =>
    Array.isArray(candidate)
    && candidate.every((entry) =>
      isRecord(entry) && typeof entry.label === 'string' && typeof entry.url === 'string',
    ),
  );
  return Array.isArray(value) ? value as GameLink[] : undefined;
};

const mapPostRow = (value: unknown): Post => {
  if (!isRecord(value)) throw new Error('Supabase returned a malformed post row.');
  const rawMetadata = readField(value, 'metadata');
  const metadata = isRecord(rawMetadata) ? rawMetadata : {};
  const id = readField(value, 'id');
  const rawType = readString(readField(value, 'type'))?.trim().toUpperCase();
  const type = Object.values(ContentType).find((contentType) => contentType === rawType);
  const title = readString(readField(value, 'title'));
  if ((typeof id !== 'string' && typeof id !== 'number') || !title) {
    throw new Error('Supabase returned a post without a valid id or title.');
  }
  if (!type) {
    throw new Error(`Post ${String(id)} has an unsupported type: ${String(rawType)}.`);
  }

  const coverImage = readString(
    readField(value, 'coverImage', 'cover_image', 'coverimage'),
    readField(metadata, 'coverImage', 'cover_image', 'coverimage'),
  );
  if (coverImage === undefined) {
    throw new Error(`Post ${String(id)} has no cover image value.`);
  }

  const rawCategory = readField(value, 'category');
  const category = typeof rawCategory === 'string'
    ? rawCategory
    : Array.isArray(rawCategory) && rawCategory.every((entry) => typeof entry === 'string')
      ? rawCategory
      : undefined;
  const subtitle = readString(readField(value, 'subtitle'));
  const description = readString(readField(value, 'description'));
  const iconImage = readString(
    readField(value, 'iconImage', 'icon_image'),
    readField(metadata, 'iconImage', 'icon_image'),
  );
  const videoUrl = readString(
    readField(value, 'videoUrl', 'video_url'),
    readField(metadata, 'videoUrl', 'video_url'),
  );
  const channelUrl = readString(
    readField(value, 'channelUrl', 'channel_url'),
    readField(metadata, 'channelUrl', 'channel_url'),
  );
  const externalLink = readString(
    readField(value, 'externalLink', 'external_link'),
    readField(metadata, 'externalLink', 'external_link'),
  );
  const tags = readStringArray(readField(value, 'tags'), readField(metadata, 'tags'));
  const gameLinks = readGameLinks(
    readField(value, 'gameLinks', 'game_links'),
    readField(metadata, 'gameLinks', 'game_links'),
  );
  const sliderImages = readStringArray(
    readField(value, 'sliderImages', 'slider_images'),
    readField(metadata, 'sliderImages', 'slider_images'),
  );
  const imageIndex = [
    readField(value, 'imageIndex', 'image_index'),
    readField(metadata, 'imageIndex', 'image_index'),
  ]
    .find((candidate): candidate is number => typeof candidate === 'number');

  return {
    ...metadata,
    id: String(id),
    sourceKey: readString(readField(value, 'source_key', 'sourceKey')),
    title,
    subtitle,
    description: description ?? '',
    coverImage,
    type,
    category,
    iconImage,
    videoUrl,
    channelUrl,
    externalLink,
    tags,
    gameLinks,
    sliderImages,
    imageIndex,
  };
};

export const useRealtimePosts = (): RealtimePostsState => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const loadPosts = useCallback(async () => {
    if (!supabase) {
      setError('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      setIsLoading(false);
      return;
    }

    const currentRequestId = ++requestId.current;
    setError(null);
    try {
      const { data, error: queryError } = await supabase
        .from('posts')
        .select('*')
        .order('id', { ascending: true });
      if (import.meta.env.DEV) {
        console.log('Fetched Data from DB:', data);
        console.log('Fetched post count:', data?.length ?? 0);
      }
      if (queryError) throw queryError;
      if (currentRequestId !== requestId.current) return;
      setPosts(data.map(mapPostRow));
    } catch (loadError) {
      if (currentRequestId !== requestId.current) return;
      if (import.meta.env.DEV) {
        console.error('Failed to fetch posts from Supabase:', loadError);
      }
      setError(loadError instanceof Error ? loadError.message : String(loadError));
    } finally {
      if (currentRequestId === requestId.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    void loadPosts();
    if (!supabase) return () => {
      isMounted = false;
      requestId.current += 1;
    };

    const channel = supabase
      .channel('posts-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
        if (isMounted) void loadPosts();
      })
      .subscribe((status, subscriptionError) => {
        if (!isMounted) return;
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          setError(subscriptionError?.message || `Supabase Realtime subscription failed: ${status}.`);
        }
      });

    return () => {
      isMounted = false;
      requestId.current += 1;
      void supabase.removeChannel(channel);
    };
  }, [loadPosts]);

  return { posts, setPosts, isLoading, error };
};
