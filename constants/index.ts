import { ContentType, Post, HotContentItem, User } from '../types';
import { GAME_ITEMS as GAME_ITEMS_BASE } from './game';
import { REF_ITEMS as REF_ITEMS_BASE } from './ref';
import { MEDIA_ITEMS as MEDIA_ITEMS_BASE } from './media';
import { LIBRARY_ITEMS as LIBRARY_ITEMS_BASE } from './library';

const generateIds = (items: any[], prefix: string): Post[] => {
  return items.map((item, index) => ({
    ...item,
    id: `${prefix}${index + 1}`,
    iconImage: item.iconImage || getPlatformIconImage(item.externalLink || item.channelUrl)
  }));
};

const getPlatformIconImage = (url?: string): string | undefined => {
  const normalizedUrl = url?.toLowerCase() || '';

  if (normalizedUrl.includes('x.com') || normalizedUrl.includes('twitter.com')) {
    return 'https://cdn.simpleicons.org/x/ffffff';
  }
  if (normalizedUrl.includes('bilibili.com')) {
    return 'https://cdn.simpleicons.org/bilibili/ffffff';
  }
  if (normalizedUrl.includes('youtube.com') || normalizedUrl.includes('youtu.be')) {
    return 'https://cdn.simpleicons.org/youtube/ffffff';
  }
  if (normalizedUrl.includes('pixiv.net')) {
    return 'https://cdn.simpleicons.org/pixiv/ffffff';
  }
  if (normalizedUrl.includes('nicovideo.jp') || normalizedUrl.includes('nico.ms')) {
    return 'https://cdn.simpleicons.org/niconico/ffffff';
  }
  if (normalizedUrl.includes('chzzk.naver.com')) {
    return 'https://cdn.simpleicons.org/chzzk/ffffff';
  }
  if (normalizedUrl.includes('afreecatv.com') || normalizedUrl.includes('sooplive.com')) {
    return 'https://cdn.simpleicons.org/afreecatv/ffffff';
  }

  return undefined;
};

const GAME_ITEMS = generateIds(GAME_ITEMS_BASE, 'g');
const REF_ITEMS = generateIds(REF_ITEMS_BASE, 'r');
const MEDIA_ITEMS = generateIds(MEDIA_ITEMS_BASE, 'm');
const LIBRARY_ITEMS = generateIds(LIBRARY_ITEMS_BASE, 'l');

export const MOCK_USERS: User[] = [
  { id: 'admin', name: 'Miyouji', avatar: 'miyouji.png' },
  { id: 'u1', name: 'Miyouji', avatar: 'miyouji.png' },
];

export const NAV_ITEMS = ['HOME', 'LIBRARY', 'VIDEO', 'GAME', 'REF'];

export const CATEGORY_TABS: Record<string, string[]> = {
  'GAME': ['All', 'Hoyoverse', 'HyperGraph', 'Nexon', 'Kuro Games', 'Shift Up', 'Yostar', 'Manjuu', 'Sega', 'Bushroad', 'Hotta Studio', 'Others'],
  'LIBRARY': ['All', 'Illustrator', 'Cosplayer', 'Mangaka', 'Concept Artist', 'Designer', 'Others'],
  'REF': ['All', 'Social', 'Image', 'Pose', 'Color', 'Design', 'Market', 'Others'],
  'VIDEO': ['All', 'YouTube', 'Bilibili', 'Niconico', 'Others']
};

export const MOCK_POSTS: Post[] = [
  ...GAME_ITEMS,
  ...REF_ITEMS,
  ...MEDIA_ITEMS,
  ...LIBRARY_ITEMS,
];

export const OFFICIAL_NOTICES: HotContentItem[] = [
  { 
    id: 'n1', 
    title: 'Make Artist Great Again.', 
    image: '',
    category: 'notice'
  },
  { 
    id: 'n2', 
    title: 'Do not share this site with others.', 
    image: '',
    category: 'notice'
  },
];

