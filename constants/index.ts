import { ContentType, Post, CarouselItem, HotContentItem, ExternalLinkItem, User } from '../types';
import { GAME_ITEMS as GAME_ITEMS_BASE } from './game';
import { REF_ITEMS as REF_ITEMS_BASE } from './ref';
import { VIDEO_ITEMS as VIDEO_ITEMS_BASE } from './video';
import { ARTIST_ITEMS as ARTIST_ITEMS_BASE } from './artist';

// 자동 id 생성 함수
const generateIds = (items: any[], prefix: string): Post[] => {
  return items.map((item, index) => ({
    ...item,
    id: `${prefix}${index + 1}`
  }));
};

const GAME_ITEMS = generateIds(GAME_ITEMS_BASE, 'g');
const REF_ITEMS = generateIds(REF_ITEMS_BASE, 'r');
const VIDEO_ITEMS = generateIds(VIDEO_ITEMS_BASE, 'v');
const ARTIST_ITEMS = generateIds(ARTIST_ITEMS_BASE, 'a');

// Mock Users
export const MOCK_USERS: User[] = [
  { id: 'admin', name: 'Miyouji', avatar: 'miyouji.png' },
  { id: 'u1', name: 'Miyouji', avatar: 'miyouji.png' },
];

// Main Hero Carousel
export const MOCK_CAROUSEL: CarouselItem[] = [
  {
    id: '1',
    image: 'hero1.png',
    title: 'ARKNIGHT: END FIELD',
    link: 'https://endfield.gryphline.com/en-us#home'
  },
  {
    id: '2',
    image: 'hero2.png',
    title: 'SILVER PALACE',
    link: 'https://silverpalace.elementagames.com/en-us#home'
  },
  {
    id: '3',
    image: 'hero3.png',
    title: 'ANANTA',
    link: 'https://www.anantagame.com/'
  },
  {
    id: '4',
    image: 'hero4.png',
    title: 'NEVERNESS TO EVERNESS',
    link: 'https://nte.perfectworld.com/en/index.html'
  }
];

// Sidebar Mini Carousel
export const SIDEBAR_CAROUSEL: CarouselItem[] = [
  {
    id: 's1',
    image: 'mini1.png',
    title: 'Zhao EP - "Tiny Giant"',
    link: 'https://youtu.be/TU5Bt8MLPjk?si=eSlI48w6OQ8TOh8n'
  },
  {
    id: 's2',
    image: 'mini2.png',
    title: 'Operator Combat Demo - Ardelia',
    link: 'https://youtu.be/5HbgNb1XmbE?si=QHYav3Uh69UeZpCx'
  },
  {
    id: 's3',
    image: 'mini3.png',
    title: '"Columbina: To Where She Flies"',
    link: 'https://youtu.be/WsYsNoNjbaw?si=BWgXUGvWlwTj1Q7G'
  }
];

export const NAV_ITEMS = ['HOME', 'GAME', 'REF', 'VIDEO', 'WORK'];

// Categories for each page
export const CATEGORY_TABS: Record<string, string[]> = {
  'GAME': ['All', 'Hoyoverse', 'HyperGraph', 'Nexon', 'Kuro Games', 'Shift Up', 'Yostar', 'Manjuu', 'Sega', 'Others'],
  'REF': ['All', 'Social', 'Image', 'Pose', 'Color', 'Design', 'Market', 'Others'],
  'VIDEO': ['All', 'Game Trailer', 'How to', 'Process', 'Live Stream'],
  'WORK': ['All', 'Illustrator', 'Cosplayer', 'Mangaka', 'Concept Artist', 'Designer']
};

export const MOCK_POSTS: Post[] = [
  ...GAME_ITEMS,
  ...REF_ITEMS,
  ...VIDEO_ITEMS,
  ...ARTIST_ITEMS,
];

// Official Notices
export const OFFICIAL_NOTICES: HotContentItem[] = [
  { id: 'n1', title: 'Make Artist Great Again.', category: 'Notice', image: '' },
  { id: 'n2', title: 'Do not share this site with others.', category: 'Notice', image: '' },
];

// For you Links
export const FOR_YOU_LINKS: ExternalLinkItem[] = [
  { id: 'p1', title: '', image: 'hoyolab.png', url: 'https://www.hoyolab.com/' }
];

// Re-export for backward compatibility
export const PARTNER_LINKS = FOR_YOU_LINKS;
