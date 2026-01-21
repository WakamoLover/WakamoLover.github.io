import { ContentType, Post } from '../types';

// Library Page Items (id는 constants/index.ts에서 자동으로 생성됨)
export const LIBRARY_ITEMS: Omit<Post, 'id'>[] = [
// Illustrator
  {
    title: 'ASK',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/F7MdgZ-bQAA3sC-?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/askziye/media'
  },
  {
    title: '東暮',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G-7_AMlWQAAUdzx?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/HgHgure/media'
  },
  {
    title: 'アシマ',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GiILMNVaQAAkb0y?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/roro046/media'
  },
  {
    title: '𝘧𝘳𝘦𝘯𝘨',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GPdg8s6bEAAYoIm?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/frengchiano2/media'
  },
  {
    title: 'モ誰',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G9fFvA-bAAA46-Y?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/jeonghee1414'
  },
  {
    title: 'イコモチ',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G81HprhagAM2ZRZ?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/rswxx/media'
  },
  {
    title: '憂姫はぐれ',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G-iFpOvbQAMxThf?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/yuukihagure/media'
  },
  {
    title: 'Matcha',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/F4ySSvbXkAABoKW?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/matchach/media'
  },
  {
    title: '藤ちょこ',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GHA7KTrbUAAh6jp?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/fuzichoco/media'
  },
  {
    title: 'Hiten',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/Gxve3RoasAAazbt?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/HitenKei/media'
  },
  {
    title: 'びびすか',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GsHfPPVaUAE4E-L?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/Bibi_suka/media'
  },
  {
    title: '',
    description: '',
    coverImage: '',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: ''
  },
  {
    title: '荻pote',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G8XZdHEa4AAi5cH?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/ogipote/media'
  },
  {
    title: 'tokki',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G9jiBKpaMAMJZcf?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/tokki_517/media'
  },
  {
    title: 'ぶくろて',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/Gz6ej7jbIAE1we0?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/niiiitoooon/media'
  },
  {
    title: 'まじろ',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G8xPh_rbYAAM3OW?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/mazirori/media'
  },
  {
    title: 'ミシュネ',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GfaZli8bYAA7Ub-?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/misyune12/media'
  },
  {
    title: 'KUIKUI',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G-elVMHagAAHhft?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/Kuikui00Skul/media'
  },
  {
    title: 'LightRia',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G37IsJOWYAAE-YQ?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/LightRia_/media'
  },
  
// Cosplpayer
  {
    title: '封疆疆v',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GDlZN35W4AAevPn?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/Dolly48226855/media'
  },
  {
    title: 'Josette',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GL6LdoZaQAAueeC?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/josetteswan/media'
  },
  {
    title: 'taru',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GS2HinMbYAAPrf4?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/taru153/media'
  },
  {
    title: 'reng',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/Ggr4iC8bgAAs1oP?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/idtNothinglose/media'
  },
  {
    title: '瓜希酱',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/Gkf0H4uWYAA9BRd?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/guaxichan/media'
  },
  {
    title: '兎団子',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G8NDwykaYAAKoCE?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/usadango27/media'
  },
  {
    title: 'Ely',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G75hbjlaYAAkQIA?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/Ely_eee/media'
  },
  {
    title: '贤儿sherry',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GMa8grEa8AAeeO-?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/sherryken777/media'
  },
  {
    title: '铁板欧尼酱',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/FxRPyU5aMAAoQBO?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/tiebanonini/media'
  },
  {
    title: '大薯条',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G9ybzfHbgAAGQle?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/kanek1ww/media'
  },
  {
    title: 'ふちどり',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/Gv-R0KdXgAAK967?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/Futidori_came/media'
  },
  {
    title: '九柒喵aaa',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G7UZt-PaAAAjKaV?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/jiuqiqiqiqim/media'
  },
  {
    title: '纸悦',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G8LTa4fbYAAnP-q?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/Etsuko827/media'
  },
  {
    title: 'xier',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G5H8oicX0AAjKNC?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/xier33/media'
  },
  {
    title: '月海つくね',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G4gEexPaMAAgYmi?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/XaiabP/media'
  },
  {
    title: '憐',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G7a8b8Wb0AIBDMv?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/ren_neco222/media'
  },
  {
    title: 'スッキ',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GfYIZ2hbMAAJiI0?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/suxizzz233/media'
  },
  {
    title: 'かしゅーわ',
    description: 'Photographer',
    coverImage: 'https://pbs.twimg.com/media/G753UN4aUAENjRN?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/kasyuuwa/media'
  },
  {
    title: 'みやび',
    description: 'Photographer',
    coverImage: 'https://pbs.twimg.com/media/G8H4zNAaMAEvU82?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/tnsk6400/media'
  },
  {
    title: '飞鱼Fiyu',
    description: 'Photographer',
    coverImage: 'https://pbs.twimg.com/media/G8iUzlOaMAEBqEH?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/UKYEJFT/media'
  },

// Mangaka
  {
    title: '宮島礼吏',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GGai0n4asAAFpYj?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Mangaka',
    externalLink: 'https://x.com/Miyajimareiji/media'
  },
  {
    title: 'クニくん',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G7z6pt7a4AAd6AI?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Mangaka',
    externalLink: 'https://x.com/kunikune/media'
  },

// Concept Artist
  {
    title: 'Duoer',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GclGRl_bkAAuNqy?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Concept Artist',
    externalLink: 'https://x.com/dlgeria/media'
  },
  {
    title: 'yu-ri',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G8GC7rGakAAvEZ0?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Concept Artist',
    externalLink: 'https://x.com/00x0044/media'
  },

// Designer
  {
    title: 'タマケン',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G5Yy3D0bcAAsnNi?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Designer',
    externalLink: 'https://x.com/DesignSpot_Jap/media'
  },
  {
    title: 'いいフォント',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G20CKf6aAAIG6Kb?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Designer',
    externalLink: 'https://x.com/goodfreefonts/media'
  },
  
];
