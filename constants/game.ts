import { ContentType, Post } from '../types';

// Game Page Items (id는 constants/index.ts에서 자동으로 생성됨)
export const GAME_ITEMS: Omit<Post, 'id'>[] = [
  {
    title: 'HONKAI GAKUEN 2',
    description: '',
    coverImage: 'game/hg2.png', 
    type: ContentType.GAME,
    category: 'Hoyoverse',
    gameLinks: [
      { label: 'Official Info', url: 'https://www.miyoushe.com/bh2/home/31' },
      { label: 'Official Gallery', url: 'http://www.mihoyo.co.jp/gallery/' }
    ]
  } as any,
  {
    title: 'HONKAI IMPACT 3RD',
    description: '',
    coverImage: 'game/hi3.png',
    type: ContentType.GAME,
    category: 'Hoyoverse',
    gameLinks: [
      { label: 'Official Media Hub', url: 'https://honkaiimpact3.hoyoverse.com/global/en-us/home' },
      { label: 'Official Wallpaper', url: 'https://baike.mihoyo.com/bh3/wiki/channel/map/24/37?bbs_presentation_style=no_header' },
      { label: 'Official Character Design', url: 'https://baike.mihoyo.com/bh3/wiki/channel/map/24/57?bbs_presentation_style=no_header' },
      { label: 'Official Manga', url: 'https://baike.mihoyo.com/bh3/wiki/channel/map/24/234?bbs_presentation_style=no_header' },
      { label: 'Hoyolab Wallpaper', url: 'https://www.hoyolab.com/creatorCollection/528134?utm_source=hoyolab&utm_medium=tools&lang=en-us&bbs_theme=light&bbs_theme_device=0' }
    ]
  } as any,
  {
    title: 'HONKAI: STAR RAIL',
    description: '',
    coverImage: 'game/hsr.png',
    type: ContentType.GAME,
    category: 'Hoyoverse',
    gameLinks: [
      { label: 'Official Game Graphic', url: 'https://bbs.mihoyo.com/sr/wiki/channel/map/21/38?bbs_presentation_style=no_header' },
      { label: 'Official Story CG', url: 'https://bbs.mihoyo.com/sr/wiki/channel/map/21/196?bbs_presentation_style=no_header' },
      { label: 'Tumblr Archive (Older)', url: 'https://the-astral-express-archive.tumblr.com/archive' },
      { label: 'Google Drive Archive', url: 'https://drive.google.com/drive/folders/1BIkcfgJzCWMsCP9E6qLGmgG5wrrgbK44' }
    ]
  },
  {
    id: 'g4',
    title: 'HONKAI: NEXUS ANIMA',
    description: '',
    coverImage: 'game/hna.png',
    type: ContentType.GAME,
    category: 'Hoyoverse',
    gameLinks: [
      { label: '', url: '' }
    ]
  },
  {
    id: 'g5',
    title: 'GENSHIN IMPACT',
    description: '',
    coverImage: 'game/gi.png',
    type: ContentType.GAME,
    category: 'Hoyoverse',
    gameLinks: [
      { label: 'Offical Cutscene', url: 'https://baike.mihoyo.com/ys/obc/channel/map/80/81?bbs_presentation_style=no_header&visit_device=pc' },
      { label: 'Tumblr Archive (Older)', url: 'https://genshinresource.tumblr.com/archive' },
      { label: 'Tumblr Archive (Newer)', url: 'https://genshinimpactresources.tumblr.com/archive' },
      { label: 'Fashion 3D Archive', url: 'https://gamesfashionarchive.net/viewer/Genshin_Impact' }
    ]
  },
  {
    id: 'g6',
    title: 'ZENLESS ZONE ZERO',
    description: '',
    coverImage: 'game/zzz.png',
    type: ContentType.GAME,
    category: 'Hoyoverse',
    gameLinks: [
      { label: 'Offcial Wallpaper', url: 'https://baike.mihoyo.com/zzz/wiki/channel/map/13/98' }
    ]
  },
  {
    id: 'g7',
    title: 'ARKNIGHTS',
    description: '',
    coverImage: 'game/an.png',
    type: ContentType.GAME,
    category: 'HyperGraph',
    gameLinks: [
      { label: 'Official Wallpaper', url: 'https://arknights.global/fankit?type=wallpaper' },
      { label: 'Official Music', url: 'https://monster-siren.hypergryph.com/music' },
      { label: 'Story Gallery', url: 'https://arkwaifu.cc/story/main-stories' },
      { label: 'Act Gallery', url: 'https://arkwaifu.cc/galleries' },
      { label: 'Toolbox Archive (Order)', url: 'https://aceship.github.io/AN-EN-Tags/akgallery.html' },
      { label: 'OST Files', url: 'https://arknightsost.nbh.workers.dev/' }
    ]
  },
  {
    id: 'g8',
    title: 'ARKNIGHTS: END FIELD',
    description: '',
    coverImage: 'game/anef.png',
    type: ContentType.GAME,
    category: 'HyperGraph',
    gameLinks: [
      { label: '', url: '' }
    ]
  },
  {
    id: 'g9',
    title: 'PUNISHING: GRAY RAVEN',
    description: '',
    coverImage: 'game/pgr.png',
    type: ContentType.GAME,
    category: 'Kuro Games',
    gameLinks: [
      { label: 'Official Wallpaper', url: 'https://pgr.kurogame.net/wallpapers' }
    ]
  },
  {
    id: 'g10',
    title: 'WHUTHERING WAVES',
    description: '',
    coverImage: 'game/ww.png',
    type: ContentType.GAME,
    category: 'Kuro Games',
    gameLinks: [
      { label: 'Google Drive Archive', url: 'https://drive.google.com/drive/folders/1wnxuYfMwHNC7Ln0HxODZs1jkidfapwMm' }
    ]
  },
  {
    id: 'g11',
    title: 'BLUE ARCHIVE',
    description: '',
    coverImage: 'game/ba.png',
    type: ContentType.GAME,
    category: 'Nexon',
    gameLinks: [
      { label: 'Official Wallpaper', url: 'https://bluearchive.jp/fankit' },
      { label: 'Google Drive Memorial', url: 'https://drive.google.com/drive/folders/1BULaKnOcP0u90RpWJ5QUQfpIsU89pUzc' },
      { label: 'Google Drive Spine', url: 'https://drive.google.com/drive/folders/1nlfhqo-laGOEbbPHDhG43fw8mQQZ1iHF' },
      { label: 'Mega Archive', url: 'https://mega.nz/folder/0Bo1ABwB#bB3lAAQ0q8CSzi20Rff_CQ' },
      { label: 'Artist Forum', url: 'https://m.gamer.com.tw/forum/C.php?bsn=38898&page=&snA=4856&last=' }
    ]
  },
  {
    id: 'g12',
    title: 'PROJECT RX',
    description: '',
    coverImage: 'game/prx.png',
    type: ContentType.GAME,
    category: 'Nexon',
    gameLinks: [
      { label: '', url: '' }
    ]
  },
  {
    id: 'g13',
    title: 'GODDESS OF VICTORY: NIKKE',
    description: '',
    coverImage: 'game/gvnk.png',
    type: ContentType.GAME,
    category: 'Shift Up',
    gameLinks: [
      { label: 'Official Wallpaper', url: 'https://nikke-en.com/art.html' },
      { label: 'DB Spine', url: 'https://nikke-db.pages.dev/visualiser' },
      { label: 'DB Chibi', url: 'https://nikke-db.pages.dev/chibi' },
      { label: 'DB Gallery', url: 'https://nikke-db.pages.dev/gallery' }
    ]
  },
  {
    id: 'g14',
    title: 'AETHER GAZER',
    description: '',
    coverImage: 'game/ag.png',
    type: ContentType.GAME,
    category: 'Others',
    gameLinks: [
    { label: 'Official Wallpaper', url: 'https://www.aethergazer.com/gallery' },
      { label: 'Google Drive Archive', url: 'https://drive.google.com/drive/folders/1QGX6ISyrUHQWZHAKtyWNFU8APgRKhnEK' }
    ]
  },
  {
    id: 'g15',
    title: 'EPIC SEVEN',
    description: '',
    coverImage: 'game/es.png',
    type: ContentType.GAME,
    category: 'Others',
    gameLinks: [
    { label: 'Official Wallpaper', url: 'https://page.onstove.com/epicseven/global/list/1214?page=1' },
      { label: 'Google Drive Archive', url: 'https://drive.google.com/drive/folders/1_I-1ek6vqmRQp-HhOOfr1F3hQcpR7ik7' }
    ]
  },
  {
    id: 'g16',
    title: 'PROJECT SEKAI COLORFUL STAGE! FEAT. HATSUNE MIKU',
    description: '',
    coverImage: 'game/pscs.png',
    type: ContentType.GAME,
    category: 'Sega',
    gameLinks: [
      { label: 'Official Wallpaper', url: 'https://colorfulstage.com/media/wallpapers/' },
      { label: 'Official Special Download', url: 'https://pjsekai.sega.jp/special/download.html' },
      { label: 'Google Drive Archive', url: 'https://drive.google.com/drive/folders/1D2yUaYlABRNf7vtM1bYV6CPMwTJa-oR1' }
    ]
  },
];
