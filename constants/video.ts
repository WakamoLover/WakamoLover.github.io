import { ContentType, Post } from '../types';

// Video Page Items (id는 constants/index.ts에서 자동으로 생성됨)
export const VIDEO_ITEMS: Omit<Post, 'id'>[] = [

// --- Illustration ---
  {
    title: 'Unknown',
    description: '',
    coverImage: 'https://i.ytimg.com/vi/QwExFKxU5ok/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBhNm2QTFNgyb-sXLQZ8ujWu9U84Ahttps://i.ytimg.com/an_webp/QwExFKxU5ok/mqdefault_6s.webp?du=3000&sqp=CIPv5tMG&rs=AOn4CLB2cc6-loEMi2APSWe5wLR0gjzmMghttps://i.ytimg.com/vi/QwExFKxU5ok/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBhNm2QTFNgyb-sXLQZ8ujWu9U84A',
    type: ContentType.VIDEO,
    category: 'Youtube',
    channelUrl: 'https://youtu.be/QwExFKxU5ok'
  } as any,

];
