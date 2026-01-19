import { ContentType, Post } from '../types';

// Reference Page Items
export const REF_ITEMS: Omit<Post, 'id'>[] = [

// --- Social ---
  {
    title: 'X',
    description: 'From breaking news and entertainment to sports and politics, get the full story with all the live commentary.',
    coverImage: 'ref/x.png',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://x.com/'
  } as any,
  {
    title: 'DeviantArt',
    description: 'Explore our archive of past community events, celebrating the incredible projects, contests, and gatherings that have brought us together.',
    coverImage: 'ref/devianart.png',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://www.deviantart.com/'
  } as any,
  {
    title: 'ArtStation',
    description: 'Join the leading showcase platform for art and design.',
    coverImage: 'ref/artstation.png',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://www.artstation.com/'
  } as any,
  {
    title: 'Pixiv',
    description: 'A leading domestic creative communication platform where users can post and browse illustrations, manga, and novels.',
    coverImage: 'ref/pixiv.png',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://www.pixiv.net/'
  } as any,
  {
    title: 'Bluesky',
    description: 'Find your community among millions of users, unleash your creativity, and have some fun again.',
    coverImage: 'ref/bluesky.png',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://bsky.app/'
  } as any,
  {
    title: 'Behance',
    description: 'Help hirers and creators navigate the creative world from discovering inspiration, to connecting with one another · Popular Tools.',
    coverImage: 'ref/behance.png',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://www.behance.net/'
  } as any,

// --- Image ---
  {
    title: 'Cosmos',
    description: 'Resurface your elements instantly. Find anything in your library with ease.',
    coverImage: 'ref/cosmos.png',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://www.cosmos.so/'
  } as any,
  {
    title: 'FilmGrab',
    description: '',
    coverImage: 'ref/filmgrab.png',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://film-grab.com/'
  } as any,
  {
    title: 'PhotoBash',
    description: 'High Quality Reference Photos & Masked PNGs for Artists & Creatives.',
    coverImage: 'ref/photobash.png',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://www.photobash.org/'
  } as any,
  {
    title: 'Pinterest',
    description: '',
    coverImage: 'ref/pinterest.png',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://kr.pinterest.com/'
  } as any,
  {
    title: 'Pixabay',
    description: 'Stunning royalty-free images & royalty-free stock',
    coverImage: 'ref/pixabay.png',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://pixabay.com/'
  } as any,
  {
    title: 'Unsplash',
    description: '',
    coverImage: 'ref/unsplash.png',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://unsplash.com/'
  } as any,

// --- Pose ---
  {
    title: 'Pose Maniacs',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://www.posemaniacs.com/'
  } as any,
  {
    title: 'Magic Poser',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://webapp.magicposer.com/'
  } as any,
  {
    title: 'Lineo Action',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://line-of-action.com/'
  } as any,
  {
    title: 'Sixiang',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://amlyu.com/category/sixiang/'
  } as any,

// --- Color ---
  {
    title: 'OKLCH',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Color',
    externalLink: 'https://oklch.com/#0.7,0.1,249,100'
  } as any,
  {
    title: 'CCS Color',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Color',
    externalLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklab'
  } as any,
  {
    title: 'Kor Tone',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Color',
    externalLink: 'https://gomchiiii.github.io/KORtone_feel-the-ttaekkal-of-Korea/'
  } as any,

// --- Design ---
  {
    title: 'Design Spiration',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://www.designspiration.com/'
  } as any,
  {
    title: 'Design Boom',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://www.designboom.com/'
  } as any,
  {
    title: 'Dribbble',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://dribbble.com/'
  } as any,
  {
    title: 'Envato',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://elements.envato.com/'
  } as any,
  {
    title: 'Fuse Kiwi',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://www.fuse.kiwi/'
  } as any,
  {
    title: 'Hvnter',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://hvnter.net/'
  } as any,
  {
    title: 'Medium Design',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://medium.design/'
  } as any,
  {
    title: 'Notefolio',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://notefolio.net/'
  } as any,
  {
    title: 'Typographic Posters',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://www.typographicposters.com/'
  } as any,
    {
    title: 'The Inspiration Grid',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://theinspirationgrid.com/'
  } as any,

// --- Market ---
  {
    title: 'Booth',
    description: '',
    coverImage: 'ref/booth.png',
    type: ContentType.REF,
    category: 'Market',
    externalLink: 'https://booth.pm/ja'
  } as any,
  {
    title: 'DLsite',
    description: '',
    coverImage: 'ref/dlsite.png',
    type: ContentType.REF,
    category: 'Market',
    externalLink: 'https://www.dlsite.com/index.html'
  } as any,
  {
    title: 'Pixiv Fanbox',
    description: '',
    coverImage: 'ref/pixivfanbox.png',
    type: ContentType.REF,
    category: 'Market',
    externalLink: 'https://www.fanbox.cc/'
  } as any,

// --- Others ---
  {
    title: 'Character Designs',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://www.characterdesigns.com/'
  } as any,
  {
    title: 'Textures',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://www.textures.com/'
  } as any,
  {
    title: 'Sketchfab',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://sketchfab.com/'
  } as any,
  {
    title: '​Game Gui',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://www.gameuidatabase.com/'
  } as any,
  {
    title: 'Bone Clones',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://boneclones.com/'
  } as any,
  {
    title: 'X6ud',
    description: '',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://x6ud.github.io/#/'
  } as any,
];
