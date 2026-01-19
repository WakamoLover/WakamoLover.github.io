// Language translations

export type Language = 'en' | 'ko';

export interface Translations {
  // Menu items
  home: string;
  game: string;
  library: string;
  reference: string;
  video: string;
  
  // UI elements
  search: string;
  systemSettings: string;
  darkMode: string;
  lightMode: string;
  bgmOn: string;
  muted: string;
  language: string;
  
  // Categories - Game
  categoryAll: string;
  categoryHoyoverse: string;
  categoryHyperGraph: string;
  categoryNexon: string;
  categoryKuroGames: string;
  categoryShiftUp: string;
  categoryYostar: string;
  categoryManjuu: string;
  categorySega: string;
  categoryOthers: string;
  
  // Categories - Library
  categoryIllustrator: string;
  categoryCosplayer: string;
  categoryMangaka: string;
  categoryConceptArtist: string;
  categoryDesigner: string;
  
  // Categories - Reference
  categorySocial: string;
  categoryImage: string;
  categoryPose: string;
  categoryColor: string;
  categoryDesign: string;
  categoryMarket: string;
  
  // Categories - Video
  categoryGameTrailer: string;
  categoryHowTo: string;
  categoryProcess: string;
  categoryLiveStream: string;
  
  // Other
  officialNotices: string;
  forYou: string;
  results: string;
  noContentFound: string;
  show: string;
  
  // Footer
  footerText1: string;
  footerText2: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Menu items
    home: 'Home',
    game: 'Game',
    library: 'Library',
    reference: 'Reference',
    video: 'Video',
    
    // UI elements
    search: 'Search...',
    systemSettings: 'System Settings',
    darkMode: 'Dark',
    lightMode: 'Light',
    bgmOn: 'BGM On',
    muted: 'Muted',
    language: 'English',
    
    // Categories - Game
    categoryAll: 'All',
    categoryHoyoverse: 'Hoyoverse',
    categoryHyperGraph: 'HyperGraph',
    categoryNexon: 'Nexon',
    categoryKuroGames: 'Kuro Games',
    categoryShiftUp: 'Shift Up',
    categoryYostar: 'Yostar',
    categoryManjuu: 'Manjuu',
    categorySega: 'Sega',
    categoryOthers: 'Others',
    
    // Categories - Library
    categoryIllustrator: 'Illustrator',
    categoryCosplayer: 'Cosplayer',
    categoryMangaka: 'Mangaka',
    categoryConceptArtist: 'Concept Artist',
    categoryDesigner: 'Designer',
    
    // Categories - Reference
    categorySocial: 'Social',
    categoryImage: 'Image',
    categoryPose: 'Pose',
    categoryColor: 'Color',
    categoryDesign: 'Design',
    categoryMarket: 'Market',
    
    // Categories - Video
    categoryGameTrailer: 'Game Trailer',
    categoryHowTo: 'How to',
    categoryProcess: 'Process',
    categoryLiveStream: 'Live Stream',
    
    // Other
    officialNotices: 'Official Notices',
    forYou: 'For you',
    results: 'results',
    noContentFound: 'No content found.',
    show: 'Show',
    
    // Footer
    footerText1: 'WakaMoe is a non-profit database for certain artist.',
    footerText2: 'All content is the trademark and copyright of certain anime game companies and their respective holders.',
  },
  ko: {
    // Menu items
    home: '홈',
    game: '게임',
    library: '라이브러리',
    reference: '자료',
    video: '동영상',
    
    // UI elements
    search: '검색...',
    systemSettings: '시스템 설정',
    darkMode: '다크',
    lightMode: '라이트',
    bgmOn: 'BGM 켜짐',
    muted: '음소거',
    language: '한국어',
    
    // Categories - Game
    categoryAll: '전체',
    categoryHoyoverse: '호요버스',
    categoryHyperGraph: '하이퍼그리프',
    categoryNexon: '넥슨',
    categoryKuroGames: '쿠로 게임즈',
    categoryShiftUp: '시프트업',
    categoryYostar: '요스타',
    categoryManjuu: '만쥬',
    categorySega: '세가',
    categoryOthers: '기타',
    
    // Categories - Library
    categoryIllustrator: '일러스트레이터',
    categoryCosplayer: '코스플레이어',
    categoryMangaka: '만화가',
    categoryConceptArtist: '컨셉 아티스트',
    categoryDesigner: '디자이너',
    
    // Categories - Reference
    categorySocial: '소셜',
    categoryImage: '이미지',
    categoryPose: '포즈',
    categoryColor: '색상',
    categoryDesign: '디자인',
    categoryMarket: '마켓',
    
    // Categories - Video
    categoryGameTrailer: '트레일러',
    categoryHowTo: '방법',
    categoryProcess: '과정',
    categoryLiveStream: '스트리밍',
    
    // Other
    officialNotices: '공지사항',
    forYou: '추천',
    results: '결과',
    noContentFound: '콘텐츠가 없습니다.',
    show: '표시',
    
    // Footer
    footerText1: 'WakaMoe는 특정 아티스트를 위한 비영리 데이터베이스입니다.',
    footerText2: '모든 콘텐츠는 특정 애니메이션 게임 회사 및 해당 권리 보유자의 상표 및 저작권입니다.',
  },
};

export const getTranslation = (lang: Language, key: keyof Translations): string => {
  return translations[lang][key];
};
