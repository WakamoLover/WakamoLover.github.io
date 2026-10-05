import { ContentType, Post, User } from '../types';
import { GAME_ITEMS as GAME_ITEMS_BASE } from './game';
import { REF_ITEMS as REF_ITEMS_BASE } from './ref';
import { MEDIA_ITEMS as MEDIA_ITEMS_BASE } from './media';
import { CREATOR_ITEMS as CREATOR_ITEMS_BASE } from './creator';

const generateIds = (items: any[], prefix: string): Post[] => {
  return items.map((item, index) => ({
    ...item,
    id: `${prefix}${index + 1}`,
    subtitle: item.subtitle,
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
const CREATOR_ITEMS = generateIds(CREATOR_ITEMS_BASE, 'l');

export const MOCK_USERS: User[] = [
  { id: 'admin', name: 'Miyouji', avatar: 'user_100001.png' },
  { id: 'u1', name: 'Miyouji', avatar: 'user_100002.png' },
];

export const NAV_ITEMS = ['GAME', 'CREATOR', 'MEDIA', 'REF'];

export const MOCK_POSTS: Post[] = [
  ...GAME_ITEMS,
  ...REF_ITEMS,
  ...MEDIA_ITEMS,
  ...CREATOR_ITEMS,
];
