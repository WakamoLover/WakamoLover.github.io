import { Language, translations } from './constants/translations';

/**
 * Helper function to get localized text
 * Supports both string and LocalizedString formats
 */
export const getLocalizedText = (
  text: string | { en: string; ko: string },
  language: Language = 'en'
): string => {
  if (typeof text === 'string') return text;
  return text[language];
};

/**
 * Category translation mapping
 * Maps English category names to their translation keys
 */
export const CATEGORY_MAP: Record<string, string> = {
  'Hoyoverse': 'categoryHoyoverse',
  'HyperGraph': 'categoryHyperGraph',
  'Nexon': 'categoryNexon',
  'Kuro Games': 'categoryKuroGames',
  'Shift Up': 'categoryShiftUp',
  'Yostar': 'categoryYostar',
  'Manjuu': 'categoryManjuu',
  'Sega': 'categorySega',
  'Others': 'categoryOthers',
  'Illustrator': 'categoryIllustrator',
  'Cosplayer': 'categoryCosplayer',
  'Mangaka': 'categoryMangaka',
  'Concept Artist': 'categoryConceptArtist',
  'Designer': 'categoryDesigner',
  'Social': 'categorySocial',
  'Image': 'categoryImage',
  'Pose': 'categoryPose',
  'Color': 'categoryColor',
  'Design': 'categoryDesign',
  'Market': 'categoryMarket',
  'Game Trailer': 'categoryGameTrailer',
  'How to': 'categoryHowTo',
  'Process': 'categoryProcess',
  'Live Stream': 'categoryLiveStream',
};

/**
 * Translate category name to the current language
 */
export const translateCategory = (category: string, language: Language): string => {
  const t = translations[language];
  const translationKey = CATEGORY_MAP[category] as keyof typeof t;
  return translationKey ? t[translationKey] : category;
};
