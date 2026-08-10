import { ContentType, Post } from '../types';

// Video Page Items (id는 constants/index.ts에서 자동으로 생성됨)
export const VIDEO_ITEMS: Omit<Post, 'id'>[] = [

// --- Illustration ---
  {
    title: 'Unknown',
    description: '',
    coverImage: 'https://i.ytimg.com/vi/QwExFKxU5ok/hqdefault.jpg',
    type: ContentType.VIDEO,
    category: 'Youtube',
    channelUrl: 'https://youtu.be/QwExFKxU5ok'
  } as any,

];
