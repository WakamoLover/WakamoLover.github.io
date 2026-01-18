import { ContentType, Post } from '../types';

// Artist Page Items (id는 constants/index.ts에서 자동으로 생성됨)
export const ARTIST_ITEMS: Omit<Post, 'id'>[] = [
  {
    title: 'Character Title Page',
    description: 'X(Twitter) post preview automation test',
    coverImage: 'https://pbs.twimg.com/media/G9dqE7Aa0AAnDmW?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Concept Artist',
    externalLink: 'https://x.com/SilverPalace_EN/status/2006561152202060147?s=20'
  } as any,
];
