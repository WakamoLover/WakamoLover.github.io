import { ContentType, Post, CarouselItem, HotContentItem, ExternalLinkItem, User } from '../types';
import { GAME_ITEMS as GAME_ITEMS_BASE } from './game';
import { REF_ITEMS as REF_ITEMS_BASE } from './ref';
import { VIDEO_ITEMS as VIDEO_ITEMS_BASE } from './video';
import { LIBRARY_ITEMS as LIBRARY_ITEMS_BASE } from './library';

// Auto ID generation for items
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
];

export const NAV_ITEMS = ['HOME', 'GAME', 'LIBRARY', 'REF', 'VIDEO'];

// Categories for each page
export const CATEGORY_TABS: Record<string, string[]> = {
  'GAME': ['All', 'Hoyoverse', 'HyperGraph', 'Nexon', 'Kuro Games', 'Shift Up', 'Yostar', 'Manjuu', 'Sega', 'Bushroad', 'Hotta Studio', 'Others'],
  'LIBRARY': ['All', 'Illustrator', 'Cosplayer', 'Mangaka', 'Concept Artist', 'Designer', 'Others'],
  'REF': ['All', 'Social', 'Image', 'Pose', 'Color', 'Design', 'Market', 'Others'],
  'VIDEO': ['All', 'YouTube', 'Bilibili', 'Niconico', 'Others']
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
    image: '' 
  },
  { 
    id: 'n2', 
    title: 'Do not share this site with others.', 
    image: '' 
  },
];

// For you Links
export const FOR_YOU_LINKS: ExternalLinkItem[] = [
  { id: 'p1', title: '', image: 'hoyolab.png', url: 'https://www.hoyolab.com/' }
];

// Re-export for backward compatibility
export const PARTNER_LINKS = FOR_YOU_LINKS;
