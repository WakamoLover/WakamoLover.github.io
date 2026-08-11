import { ContentType, Post } from '../types';

// Video Page Items (id는 constants/index.ts에서 자동으로 생성됨)
export const VIDEO_ITEMS: Omit<Post, 'id'>[] = [

// --- Illustration ---
  {
    title: 'キュアスカイ',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Youtube',
    channelUrl: 'https://youtu.be/uOrSsajNt_w?si=2VAeYKivkD77Ft5Z'
  } as any,

];
