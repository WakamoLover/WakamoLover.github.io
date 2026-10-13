import { PageId } from '../types';

export const CATEGORY_TABS: Record<PageId, string[]> = {
  [PageId.PAGE1]: ['All', 'Hoyoverse', 'HyperGraph', 'Nexon', 'Kuro Games', 'Shift Up', 'Yostar', 'Manjuu', 'Sega', 'Bushroad', 'Hotta Studio', 'QualiArts', 'Others'],
  [PageId.PAGE2]: ['All', 'Illustrator', 'Cosplayer', 'Mangaka', 'Concept Artist', 'Designer', 'Others'],
  [PageId.PAGE3]: ['All', 'YouTube', 'Bilibili', 'Niconico', 'Others'],
  [PageId.PAGE4]: ['All', 'Social', 'Image', 'Pose', 'Color', 'Design', 'Market', 'Others'],
};
