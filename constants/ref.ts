import { ContentType, Post } from '../types';

// Reference Page Items
export const REF_ITEMS: Omit<Post, 'id'>[] = [

// --- Social ---
  {
    title: 'X',
    subtitle: '',
    description: 'From breaking news and entertainment to sports and politics, get the full story with all the live commentary.',
    coverImage: 'ref/x.webp',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://x.com/'
  } as any,
  {
    title: 'DeviantArt',
    subtitle: '',
    description: 'Explore our archive of past community events, celebrating the incredible projects, contests, and gatherings that have brought us together.',
    coverImage: 'ref/devianart.webp',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://www.deviantart.com/'
  } as any,
  {
    title: 'ArtStation',
    subtitle: '',
    description: 'The leading showcase platform for games, film, media & entertainment artists.',
    coverImage: 'ref/artstation.webp',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://www.artstation.com/'
  } as any,
  {
    title: 'Pixiv',
    subtitle: '',
    description: 'A leading domestic creative communication platform where users can post and browse illustrations, manga, and novels.',
    coverImage: 'ref/pixiv.webp',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://www.pixiv.net/'
  } as any,
  {
    title: 'Bluesky',
    subtitle: '',
    description: 'Find your community among millions of users, unleash your creativity, and have some fun again.',
    coverImage: 'ref/bluesky.webp',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://bsky.app/'
  } as any,
  {
    title: 'Behance',
    subtitle: '',
    description: 'Help hirers and creators navigate the creative world from discovering inspiration, to connecting with one another · Popular Tools.',
    coverImage: 'ref/behance.webp',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://www.behance.net/'
  } as any,

// --- Image ---
  {
    title: 'Cosmos',
    subtitle: '',
    description: 'Resurface your elements instantly. Find anything in your library with ease.',
    coverImage: 'ref/cosmos.webp',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://www.cosmos.so/'
  } as any,
  {
    title: 'FilmGrab',
    subtitle: '',
    description: 'The largest growing archive of stills from the best films ever.',
    coverImage: 'ref/filmgrab.webp',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://film-grab.com/'
  } as any,
  {
    title: 'PhotoBash',
    subtitle: '',
    description: 'High Quality Reference Photos & Masked webps for Artists & Creatives.',
    coverImage: 'ref/photobash.webp',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://www.photobash.org/'
  } as any,
  {
    title: 'Pinterest',
    subtitle: '',
    description: 'Create boards, save Pins and make collages of all your inspiration.',
    coverImage: 'ref/pinterest.webp',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://kr.pinterest.com/'
  } as any,
  {
    title: 'Pixabay',
    subtitle: '',
    description: 'Stunning royalty-free images & royalty-free stock',
    coverImage: 'ref/pixabay.webp',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://pixabay.com/'
  } as any,
  {
    title: 'Unsplash',
    subtitle: '',
    description: 'A website dedicated to proprietary stock photography.',
    coverImage: 'ref/unsplash.webp',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://unsplash.com/'
  } as any,

// --- Pose ---
  {
    title: 'Pose Maniacs',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://www.posemaniacs.com/'
  } as any,
  {
    title: 'Attorial',
    subtitle: '아또리얼',
    description: '게임 및 웹툰에서 주로 사용되는 만화 및 일러스트 작법 강의를 전문으로 하는 온라인 학원입니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://attorial.com/croquis'
  } as any,
  {
    title: 'Magic Poser',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://webapp.magicposer.com/'
  } as any,
  {
    title: 'Lineo Action',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://line-of-action.com/'
  } as any,
  {
    title: 'Sixiang',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://amlyu.com/category/sixiang/'
  } as any,

// --- Color ---
  {
    title: 'OKLCH',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Color',
    externalLink: 'https://oklch.com/#0.7,0.1,249,100'
  } as any,
  {
    title: 'CCS Color',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Color',
    externalLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklab'
  } as any,
  {
    title: 'Kor Tone',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Color',
    externalLink: 'https://gomchiiii.github.io/KORtone_feel-the-ttaekkal-of-Korea/'
  } as any,

// --- Design ---
  {
    title: 'Design Spiration',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://www.designspiration.com/'
  } as any,
  {
    title: 'Design Boom',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://www.designboom.com/'
  } as any,
  {
    title: 'Dribbble',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://dribbble.com/'
  } as any,
  {
    title: 'Envato',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://elements.envato.com/'
  } as any,
  {
    title: 'Fuse Kiwi',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://www.fuse.kiwi/'
  } as any,
  {
    title: 'Hvnter',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://hvnter.net/'
  } as any,
  {
    title: 'Medium Design',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://medium.design/'
  } as any,
  {
    title: 'Notefolio',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://notefolio.net/'
  } as any,
  {
    title: 'Typographic Posters',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://www.typographicposters.com/'
  } as any,
    {
    title: 'The Inspiration Grid',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://theinspirationgrid.com/'
  } as any,

// --- Market ---
  {
    title: 'Booth',
    subtitle: '',
    description: '',
    coverImage: 'ref/booth.webp',
    type: ContentType.REF,
    category: 'Market',
    externalLink: 'https://booth.pm/ja'
  } as any,
  {
    title: 'DLsite',
    subtitle: '',
    description: 'Doujinshi, doujin games, doujin audio and ASMR, updated daily and available for immediate download.',
    coverImage: 'ref/dlsite.webp',
    type: ContentType.REF,
    category: 'Market',
    externalLink: 'https://www.dlsite.com/index.html'
  } as any,
  {
    title: 'Pixiv Fanbox',
    subtitle: '',
    description: 'A community where creators can receive continuous support from their fans.',
    coverImage: 'ref/pixivfanbox.webp',
    type: ContentType.REF,
    category: 'Market',
    externalLink: 'https://www.fanbox.cc/'
  } as any,

// --- Others ---
  {
    title: 'Character Designs',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://www.characterdesigns.com/'
  } as any,
  {
    title: 'Textures',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://www.textures.com/'
  } as any,
  {
    title: 'Sketchfab',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://sketchfab.com/'
  } as any,
  {
    title: '​Game Gui',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://www.gameuidatabase.com/'
  } as any,
  {
    title: 'Bone Clones',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://boneclones.com/'
  } as any,
  {
    title: 'X6ud',
    subtitle: '',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://x6ud.github.io/#/'
  } as any,
];
