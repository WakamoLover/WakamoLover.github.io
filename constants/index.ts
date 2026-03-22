import { ContentType, Post, CarouselItem, HotContentItem, ExternalLinkItem, User } from '../types';
import { GAME_ITEMS as GAME_ITEMS_BASE } from './game';
import { REF_ITEMS as REF_ITEMS_BASE } from './ref';
import { VIDEO_ITEMS as VIDEO_ITEMS_BASE } from './video';
import { LIBRARY_ITEMS as LIBRARY_ITEMS_BASE } from './library';

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
const LIBRARY_ITEMS = generateIds(LIBRARY_ITEMS_BASE, 'l');

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
    title: 'AZUR PROMILIA',
    link: 'https://azurpromilia.com/en/home/'
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
    title: 'Sparxie Character Trailer — "Ravings"',
    link: 'https://youtu.be/NU6J88t4luM'
  },
  {
    id: 's2',
    image: 'mini2.png',
    title: 'Tangtang: Supreme Chief, Supreme Presence',
    link: 'https://youtu.be/AOcUXl2SjNA'
  },
  {
    id: 's3',
    image: 'mini3.png',
    title: '"Zibai: Mortal Flesh to Kindred Earth"',
    link: 'https://youtu.be/t4xEbesXXtg'
  }
];

export const NAV_ITEMS = ['HOME', 'GAME', 'LIBRARY', 'REF', 'VIDEO'];

// Categories for each page
export const CATEGORY_TABS: Record<string, string[]> = {
  'GAME': ['All', 'Hoyoverse', 'HyperGraph', 'Nexon', 'Kuro Games', 'Shift Up', 'Yostar', 'Manjuu', 'Sega', 'Others'],
  'LIBRARY': ['All', 'Illustrator', 'Cosplayer', 'Mangaka', 'Concept Artist', 'Designer'],
  'REF': ['All', 'Social', 'Image', 'Pose', 'Color', 'Design', 'Market', 'Others'],
  'VIDEO': ['All', 'Game Trailer', 'How to', 'Process', 'Live Stream']
};

export const MOCK_POSTS: Post[] = [
  ...GAME_ITEMS,
  ...REF_ITEMS,
  ...VIDEO_ITEMS,
  ...LIBRARY_ITEMS,
];

// Official Notices
export const OFFICIAL_NOTICES: HotContentItem[] = [
  { 
    id: 'n1', 
    title: 'Make Artist Great Again.', 
    category: 'Notice', 
    image: '' 
  },
  { 
    id: 'n2', 
    title: 'Do not share this site with others.', 
    category: 'Notice', 
    image: '' 
  },
];

// For you Links
export const FOR_YOU_LINKS: ExternalLinkItem[] = [
  { id: 'p1', title: '', image: 'hoyolab.png', url: 'https://www.hoyolab.com/' }
];

// Re-export for backward compatibility
export const PARTNER_LINKS = FOR_YOU_LINKS;
