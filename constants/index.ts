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
    title: {
      en: 'ARKNIGHT: END FIELD',
      ko: '명일방주: 엔드필드'
    },
    link: 'https://endfield.gryphline.com/en-us#home'
  },
  {
    id: '2',
    image: 'hero2.png',
    title: {
      en: 'SILVER PALACE',
      ko: '백야극광'
    },
    link: 'https://silverpalace.elementagames.com/en-us#home'
  },
  {
    id: '3',
    image: 'hero3.png',
    title: {
      en: 'ANANTA',
      ko: '아난타'
    },
    link: 'https://www.anantagame.com/'
  },
  {
    id: '4',
    image: 'hero4.png',
    title: {
      en: 'NEVERNESS TO EVERNESS',
      ko: '영원의 끝'
    },
    link: 'https://nte.perfectworld.com/en/index.html'
  }
];

// Sidebar Mini Carousel
export const SIDEBAR_CAROUSEL: CarouselItem[] = [
  {
    id: 's1',
    image: 'mini1.png',
    title: {
      en: 'Zhao EP - "Tiny Giant"',
      ko: '자오 EP - "작은 거인"'
    },
    link: 'https://youtu.be/TU5Bt8MLPjk?si=eSlI48w6OQ8TOh8n'
  },
  {
    id: 's2',
    image: 'mini2.png',
    title: {
      en: 'Operator Combat Demo - Ardelia',
      ko: '오퍼레이터 전투 데모 - 아델리아'
    },
    link: 'https://youtu.be/5HbgNb1XmbE?si=QHYav3Uh69UeZpCx'
  },
  {
    id: 's3',
    image: 'mini3.png',
    title: {
      en: '"Columbina: To Where She Flies"',
      ko: '"콜롬비나: 그녀가 날아가는 곳"'
    },
    link: 'https://youtu.be/WsYsNoNjbaw?si=BWgXUGvWlwTj1Q7G'
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
    title: {
      en: 'Make Artist Great Again.',
      ko: '아티스트를 다시 위대하게.'
    }, 
    category: {
      en: 'Notice',
      ko: '공지'
    }, 
    image: '' 
  },
  { 
    id: 'n2', 
    title: {
      en: 'Do not share this site with others.',
      ko: '이 사이트를 다른 사람과 공유하지 마세요.'
    }, 
    category: {
      en: 'Notice',
      ko: '공지'
    }, 
    image: '' 
  },
];

// For you Links
export const FOR_YOU_LINKS: ExternalLinkItem[] = [
  { id: 'p1', title: '', image: 'hoyolab.png', url: 'https://www.hoyolab.com/' }
];

// Re-export for backward compatibility
export const PARTNER_LINKS = FOR_YOU_LINKS;
