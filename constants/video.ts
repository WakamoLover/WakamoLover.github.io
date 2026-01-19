import { ContentType, Post } from '../types';

// Video Page Items (id는 constants/index.ts에서 자동으로 생성됨)
export const VIDEO_ITEMS: Omit<Post, 'id'>[] = [

// --- Game Trailer ---
  {
    title: {
      en: 'ANANTA | Teaser Trailer',
      ko: 'ANANTA | 티저 트레일러'
    },
    description: {
      en: 'Hold up, what\'s the move now that we\'ve ghosted the codename? Infinite Vacay, Infinite Cash, Infinite Cola… Ugh, no time! Let\'s just go with "ANANTA"!',
      ko: '잠깐, 코드명을 버린 지금 다음 행보는 뭐지? 무한 휴가, 무한 현금, 무한 콜라… 아, 시간 없어! 그냥 "ANANTA"로 가자!'
    },
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Game Trailer',
    videoUrl: 'https://youtu.be/r_Ze7iJtYb0'
  } as any,
  {
    title: {
      en: 'Azur Promilia - "Set Sail Towards the Blue Beyond"',
      ko: '벽람항로: 프로밀리아 - "푸른 저편을 향해 항해하다"'
    },
    description: {
      en: 'Guided by shooting stars, amid the sparkling constellations, this is your very own journey.',
      ko: '별똥별의 인도를 받으며, 반짝이는 별자리 속에서, 이것은 당신만의 여정입니다.'
    },
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Game Trailer',
    videoUrl: 'https://youtu.be/c3VdbqfTz7k'
  } as any,
  {
    title: 'Silver Palace丨Monotype Beta Test Gameplay Showcase',
    description: 'The riddle remains unsolved—venture forth into the city.',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Game Trailer',
    videoUrl: 'https://youtu.be/7K-YtjMoxoQ'
  } as any,
  {
    title: 'NTE Opening Animation | Hypervortex Before the Storm',
    description: 'Members of ETD-4 from the Bureau of Anomaly Control immediately departed from Hethereau, rushing to the scene to handle the disaster.',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Game Trailer',
    videoUrl: 'https://youtu.be/CqaMyyuf-jc'
  } as any,
  {
    title: 'Arknights: Endfield New Horizons Trailer [The Mission]',
    description: '"You may have forgotten these faces, but they will always remember yours."',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Game Trailer',
    videoUrl: 'https://youtu.be/WyeCPKCe3vg'
  } as any,
  {
    title: 'Resonator Showcase | Mornye — VERY FIRST STAR',
    description: 'The stars never turned for those of us living underground. Yet one day... we will... set the entire universe in motion.',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Game Trailer',
    videoUrl: 'https://youtu.be/IfGkvnwSbXE'
  } as any,

// --- How to ---
  {
    title: 'This Will Instantly Improve Your Coloring Skills!',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'How to',
    videoUrl: 'https://youtu.be/wBLg-AiXM1k'
  } as any,
  {
    title: 'Does My Art Leave an Impression!? Let\'s Find the Kick in My Drawing',
    description: 'Have you heard that line before? In cooking, there’s a kick. In comics, a hook. So what about illustration? What gives it that punch? Let’s explore it through drawing!',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'How to',
    videoUrl: 'https://youtu.be/qxGGv4wpYnM'
  } as any,
  {
    title: 'How to design a character to become a professional!',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'How to',
    videoUrl: 'https://youtu.be/BXwsQQWM2A0'
  } as any,
  {
    title: '5 Character Design Errors Artists Always Miss!',
    description: 'Today\'s video is a summary of five common mistakes made by beginners.',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'How to',
    videoUrl: 'https://youtu.be/XaEgUj-YFB8'
  } as any,

// --- Process ---
  {
    title: 'イラストレーター 藤ちょこ　イラストメイキング',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Process',
    videoUrl: 'https://youtu.be/a4gAj1e3j0w'
  } as any,
  {
    title: 'New Year\'s Illustration 2026',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Process',
    videoUrl: 'https://youtu.be/FzcIUToejWc'
  } as any,
  {
    title: 'Drawing Zenless Zone Zero Yixuan',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Process',
    videoUrl: 'https://youtu.be/4gQaURFVpI0'
  } as any,
  {
    title: '30살 직장인 마법소녀 그리기',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Process',
    videoUrl: 'https://youtu.be/iZ7mjrB-UXA?'
  } as any,
  {
    title: '結構ガチになってしまった魚',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Process',
    videoUrl: 'https://youtu.be/XZy-fjbEp7w?'
  } as any,
  {
    title: '花火-崩壊:スターレイル イラストメイキング',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Process',
    videoUrl: 'https://youtu.be/hsmEB5VMJlI'
  } as any,
  {
    title: 'Art Tutorial : How I PAINT!',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Process',
    videoUrl: 'https://youtu.be/b_B-JA8Rwyk'
  } as any,
  {
    title: 'Clorinde Genshin Impact Speedpaint',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Process',
    videoUrl: 'https://youtu.be/fRxS5EU9O4c'
  } as any,

// --- Live Stream ---
  {
    title: 'ちょこっと作業',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Live Stream',
    videoUrl: 'https://youtu.be/K-C8qApsQ5s'
  } as any,
  {
    title: '01.02.26',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Live Stream',
    videoUrl: 'https://youtu.be/WG544_TOqak'
  } as any,
  {
    title: '251127',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Live Stream',
    videoUrl: 'https://youtu.be/Sgx_ZT_ZLXQ'
  } as any,
  {
    title: '고요함',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Live Stream',
    videoUrl: 'https://youtu.be/WoXRts9harM'
  } as any,
  {
    title: 'OC \'ao\' brush up (no mic)',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Live Stream',
    videoUrl: 'https://youtu.be/c77wm5EGM0Y'
  } as any,
  {
    title: '適当に落書き_20251123',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Live Stream',
    videoUrl: 'https://youtu.be/nOhSnXxJXlQ'
  } as any,
  {
    title: '25.12.15',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Live Stream',
    videoUrl: 'https://youtu.be/YENqvBuJ1gg'
  } as any,
  {
    title: '20250327',
    description: '',
    coverImage: '',
    type: ContentType.VIDEO,
    category: 'Live Stream',
    videoUrl: 'https://youtu.be/jg2eeqk0Bj0'
  } as any,
];
