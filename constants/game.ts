import { ContentType, Post } from '../types';

// Game Page Items
export const GAME_ITEMS: Omit<Post, 'id'>[] = [
  {
    title: 'Honkai Gakuen 2',
    subtitle: '崩坏学园2',
    description: '',
    coverImage: 'game/hg2.webp', 
    type: ContentType.GAME,
    category: 'Hoyoverse',
    gameLinks: [
      { label: 'Official Info', url: 'https://www.miyoushe.com/bh2/home/31' },
      { label: 'Official Gallery', url: 'http://www.mihoyo.co.jp/gallery/' }
    ]
  } as any,
  {
    title: 'Honkai Impact 3RD',
    subtitle: '崩坏3',
    description: '',
    coverImage: 'game/hi3.webp',
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
    title: 'Honkai: Star Rail',
    subtitle: '崩坏：星穹铁道',
    description: '',
    coverImage: 'game/hsr.webp',
    type: ContentType.GAME,
    category: 'Hoyoverse',
    gameLinks: [
      { label: 'Official Game Graphic', url: 'https://bbs.mihoyo.com/sr/wiki/channel/map/21/38?bbs_presentation_style=no_header' },
      { label: 'Official Story CG', url: 'https://bbs.mihoyo.com/sr/wiki/channel/map/21/196?bbs_presentation_style=no_header' },
      { label: 'Tumblr (Older)', url: 'https://the-astral-express-archive.tumblr.com/archive' },
      { label: 'Google Drive Archive', url: 'https://drive.google.com/drive/folders/1BIkcfgJzCWMsCP9E6qLGmgG5wrrgbK44' }
    ]
  },
  {
    title: 'Honkai: Nexus Anima',
    subtitle: '崩坏：因缘精灵',
    description: '',
    coverImage: 'game/hna.webp',
    type: ContentType.GAME,
    category: 'Hoyoverse',
    gameLinks: [
    ]
  },
  {
    title: 'Genshin Impact',
    subtitle: '原神',
    description: '',
    coverImage: 'game/gi.webp',
    type: ContentType.GAME,
    category: 'Hoyoverse',
    gameLinks: [
      { label: 'Official Cutscene', url: 'https://baike.mihoyo.com/ys/obc/channel/map/80/81?bbs_presentation_style=no_header&visit_device=pc' },
      { label: 'Tumblr (Older)', url: 'https://genshinresource.tumblr.com/archive' },
      { label: 'Tumblr (Newer)', url: 'https://genshinimpactresources.tumblr.com/archive' },
      { label: 'Fashion 3D Archive', url: 'https://gamesfashionarchive.net/viewer/Genshin_Impact' }
    ]
  },
  {
    title: 'Zenless Zone Zero',
    subtitle: '绝区零',
    description: '',
    coverImage: 'game/zzz.webp',
    type: ContentType.GAME,
    category: 'Hoyoverse',
    gameLinks: [
      { label: 'Official Wallpaper', url: 'https://baike.mihoyo.com/zzz/wiki/channel/map/13/98' }
    ]
  },
  {
    title: 'Arknights',
    subtitle: '明日方舟',
    description: '',
    coverImage: 'game/an.webp',
    type: ContentType.GAME,
    category: 'HyperGraph',
    gameLinks: [
      { label: 'Official Wallpaper', url: 'https://arknights.global/fankit?type=wallpaper' },
      { label: 'Official Music', url: 'https://monster-siren.hypergryph.com/music' },
      { label: 'Story Gallery', url: 'https://arkwaifu.cc/story/main-stories' },
      { label: 'Act Gallery', url: 'https://arkwaifu.cc/galleries' },
      { label: 'Toolbox (Older)', url: 'https://aceship.github.io/AN-EN-Tags/akgallery.html' },
      { label: 'OST Files', url: 'https://arknightsost.nbh.workers.dev/' }
    ]
  },
  {
    title: 'Arknights: Endfield',
    subtitle: '明日方舟：终末地',
    description: '',
    coverImage: 'game/anef.webp',
    type: ContentType.GAME,
    category: 'HyperGraph',
    gameLinks: [
      { label: 'Official Theme', url: 'https://endfield.gryphline.com/special/over-the-frontier' }
    ]
  },
  {
    title: 'Punishing: Gray Raven',
    subtitle: '战双帕弥什',
    description: '',
    coverImage: 'game/pgr.webp',
    type: ContentType.GAME,
    category: 'Kuro Games',
    gameLinks: [
      { label: 'Official Wallpaper', url: 'https://pgr.kurogame.net/wallpapers' }
    ]
  },
  {
    title: 'Wuthering Waves',
    subtitle: '鸣潮',
    description: '',
    coverImage: 'game/ww.webp',
    type: ContentType.GAME,
    category: 'Kuro Games',
    gameLinks: [
      { label: 'Google Drive Archive', url: 'https://drive.google.com/drive/folders/1wnxuYfMwHNC7Ln0HxODZs1jkidfapwMm' }
    ]
  },
  {
    title: 'Bleu Archive',
    subtitle: 'ブルーアーカイブ',
    description: '',
    coverImage: 'game/ba.webp',
    type: ContentType.GAME,
    category: 'Nexon',
    gameLinks: [
      { label: 'Official Wallpaper', url: 'https://bluearchive.jp/fankit' },
      { label: 'Google Drive Memorial', url: 'https://drive.google.com/drive/folders/1BULaKnOcP0u90RpWJ5QUQfpIsU89pUzc' },
      { label: 'Google Drive Spine', url: 'https://drive.google.com/drive/folders/1nlfhqo-laGOEbbPHDhG43fw8mQQZ1iHF' },
      { label: 'Viewer', url: 'https://ba.svdex.moe/' },
      { label: 'Mega Archive', url: 'https://mega.nz/folder/0Bo1ABwB#bB3lAAQ0q8CSzi20Rff_CQ' },
      { label: 'Artist Forum', url: 'https://m.gamer.com.tw/forum/C.php?bsn=38898&page=&snA=4856&last=' }
    ]
  },
  {
    title: 'Fareidolia',
    subtitle: 'ファレイドリア',
    description: '',
    coverImage: 'game/prx.webp',
    type: ContentType.GAME,
    category: 'Nexon',
    gameLinks: [
      { label: '', url: '' }
    ]
  },
  {
    title: 'Goddess of Victory: Nikke',
    subtitle: '勝利の女神',
    description: '',
    coverImage: 'game/gvnk.webp',
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
    title: 'Aether Gazer',
    subtitle: '深空之眼',
    description: '',
    coverImage: 'game/ag.webp',
    type: ContentType.GAME,
    category: 'Others',
    gameLinks: [
    { label: 'Official Wallpaper', url: 'https://www.aethergazer.com/gallery' },
      { label: 'Google Drive Archive', url: 'https://drive.google.com/drive/folders/1QGX6ISyrUHQWZHAKtyWNFU8APgRKhnEK' }
    ]
  },
  {
    title: 'Epic Seven',
    subtitle: 'エピックセブン',
    description: '',
    coverImage: 'game/es.webp',
    type: ContentType.GAME,
    category: 'Others',
    gameLinks: [
    { label: 'Official Wallpaper', url: 'https://page.onstove.com/epicseven/global/list/1214?page=1' },
      { label: 'Google Drive Archive', url: 'https://drive.google.com/drive/folders/1_I-1ek6vqmRQp-HhOOfr1F3hQcpR7ik7' }
    ]
  },
  {
    title: 'Project Sekai Colorful Stage! feat.初音ミク',
    subtitle: 'プロセカ',
    description: '',
    coverImage: 'game/pscs.webp',
    type: ContentType.GAME,
    category: 'Sega',
    gameLinks: [
      { label: 'Official Wallpaper', url: 'https://colorfulstage.com/media/wallpapers/' },
      { label: 'Official Special Download', url: 'https://pjsekai.sega.jp/special/download.html' },
      { label: 'Google Drive Archive', url: 'https://drive.google.com/drive/folders/1D2yUaYlABRNf7vtM1bYV6CPMwTJa-oR1' }
    ]
  },
  {
    title: 'BanG Dream! Girls Band Party!',
    subtitle: 'ガルパ',
    description: '',
    coverImage: 'game/bdgbp.webp',
    type: ContentType.GAME,
    category: 'Bushroad',
    gameLinks: [
      { label: 'Official Arts', url: 'https://bandori.party/assets/officialart/' },
    ]
  },
  {
    title: 'BanG Dream! Our Notes',
    subtitle: 'アワーノーツ',
    description: '',
    coverImage: 'game/bdon.webp',
    type: ContentType.GAME,
    category: 'Bushroad',
    gameLinks: [
      { label: 'Database', url: 'https://bdon.moe/' },
    ]
  },
  {
    title: 'Azur Lane',
    subtitle: '碧蓝航线',
    description: '',
    coverImage: 'game/al.webp',
    type: ContentType.GAME,
    category: 'Manjuu',
    gameLinks: [
      { label: 'Wiki Archive', url: 'https://azurlane.koumakan.jp/wiki/Loading_Screens' },
    ]
  },
  {
    title: 'Azur Promilia',
    subtitle: '蓝色星原：旅谣',
    description: '',
    coverImage: 'game/ap.webp',
    type: ContentType.GAME,
    category: 'Manjuu',
    gameLinks: [
    ]
  },
  {
    title: 'Tower of Fantasy',
    subtitle: '幻塔',
    description: '',
    coverImage: 'game/tof.webp',
    type: ContentType.GAME,
    category: 'Hotta Studio',
    gameLinks: [
    ]
  },
  {
    title: 'Neverness to Everness',
    subtitle: '异环',
    description: '',
    coverImage: 'game/nte.webp',
    type: ContentType.GAME,
    category: 'Hotta Studio',
    gameLinks: [
    ]
  },
  {
    title: 'Gakuen iDOLM@STER',
    subtitle: '学マス',
    description: '',
    coverImage: 'game/gim.webp',
    type: ContentType.GAME,
    category: 'QualiArts',
    gameLinks: [
      { label: 'Database', url: 'https://imasgk.gamedbs.jp/' },
    ]
  },
];
