import { ContentType, Post } from '../types';

// Library Page Items (id는 constants/index.ts에서 자동으로 생성됨)
export const LIBRARY_ITEMS: Omit<Post, 'id'>[] = [
// Illustrator ------
  {
    title: 'ASK',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/F7MdgZ-bQAA3sC-?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/askziye/media'
  },
  {
    title: 'Higashikure',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G-7_AMlWQAAUdzx?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/HgHgure/media'
  },
  {
    title: 'Ashima',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GiILMNVaQAAkb0y?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/roro046/media'
  },
  {
    title: 'Sjoop',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GmUET3UaEAARK7l?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/shycocoa/media'
  },
  {
    title: 'Bushiyulu',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GhlYGQ2bMAAkb6u?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/Bushiyulu/media'
  },
  {
    title: 'alzimi',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/Gn1jT43XAAAc7Hm?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/ALumizky/media'
  },
  {
    title: 'LM7',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/Gy3VtY6aUAAAgYm?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/__LM7__/media'
  },
  {
    title: 'Mokun',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/HMbfzaEaAAAW_yb?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/jeonghee1414'
  },
  {
    title: 'Asahikawa',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/HBBrGAua4AAtWH-?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/asahikawa33/media'
  },
  {
    title: 'liduke',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/ETKf0mQU0AAVRtI?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/lidukelaya/media'
  },
  {
    title: 'Yuukihagure',
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
    title: 'Fuzichoco',
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
    title: 'Bibisuka',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/HDIHMOcbAAAGgH_?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/Bibi_suka/media'
  },
  {
    title: 'Usu',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G_O7RoUaIAADBHv?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/9619Usu/media'
  },
  {
    title: 'Ogipote',
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
    title: 'Bukurote',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/Gz6ej7jbIAE1we0?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/niiiitoooon/media'
  },
  {
    title: 'Maziro',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G8xPh_rbYAAM3OW?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/mazirori/media'
  },
  {
    title: 'Misyune',
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
  {
    title: 'Ryuzakiichi',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/Gbc8gM3bEAAG7Pj?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/ryuzakiichi/media'
  },
  {
    title: 'DONG_ji',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GgH-z4nbYAMqtY5?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/Dongji97/media'
  },
  {
    title:'Komiya',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GuMwuyQagAYMJAQ?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/komiya_latte/media'
  },
  {
    title:'Kutata',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/HB5_x6db0AAu6XI?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/kutataSR/media'
  },
  {
    title:'Hesun',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/HPB8H35akAA6gXt?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/umberwig/media'
  },
  {
    title:'Bita',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/HDTVOC6aoAAzarY?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/Marghe_Bita/media'
  },
  {
    title:'Sylvia',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GFRYOu1bsAAI7CW?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/Marghe_Bita/media'
  },
  {
    title:'Pisuke',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/HLVoLxlbcAA74j4?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/pisuke_wan/media'
  },
  {
    title:'ShotaImai',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/HOjAEwmbwAA5a05?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/envanishmentor/media'
  },
  {
    title:'IXY',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/HL-zu86aQAAemeQ?format=jpg&name=900x900',
    type: ContentType.IMAGE,
    category: 'Illustrator',
    externalLink: 'https://x.com/Ixy/media'
  },
  
// Cosplpayer ------
  {
    title: 'Dolly',
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
    title: 'Guaxichan',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/Gkf0H4uWYAA9BRd?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/guaxichan/media'
  },
  {
    title: 'Usadango',
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
    title: 'Sherryken',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GMa8grEa8AAeeO-?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/sherryken777/media'
  },
  {
    title: 'Tiebanonini',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/FxRPyU5aMAAoQBO?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/tiebanonini/media'
  },
  {
    title: 'Futidori',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/Gv-R0KdXgAAK967?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/Futidori_came/media'
  },
  {
    title: 'Jiuqim',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G7UZt-PaAAAjKaV?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/jiuqiqiqiqim/media'
  },
  {
    title: 'Etsuko',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G8LTa4fbYAAnP-q?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/Etsuko827/media'
  },
  {
    title: 'Xier',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G5H8oicX0AAjKNC?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/xier33/media'
  },
  {
    title: 'Gekkaitsukune',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G4gEexPaMAAgYmi?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/XaiabP/media'
  },
  {
    title: 'Ren',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G7a8b8Wb0AIBDMv?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/ren_neco222/media'
  },
  {
    title: 'Sukki',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GfYIZ2hbMAAJiI0?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/suxizzz233/media'
  },
  {
    title: 'Neki',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/HOsPnnvboAAdREc?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/Nekinow/media'
  },
  {
    title: 'Usadongo',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/HL0ymFzaYAAlNv6?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Cosplayer',
    externalLink: 'https://x.com/usadango27/media'
  },

// Mangaka ------
  {
    title: 'Miyajimareiji',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/GGai0n4asAAFpYj?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Mangaka',
    externalLink: 'https://x.com/Miyajimareiji/media'
  },
  {
    title: 'Kunikune',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/G7z6pt7a4AAd6AI?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Mangaka',
    externalLink: 'https://x.com/kunikune/media'
  },
  {
    title: 'KitaharaTomoe',
    description: '',
    coverImage: 'https://pbs.twimg.com/media/HLvzEWebEAETjMF?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Mangaka',
    externalLink: 'https://x.com/KitaharaTomoe/media'
  },

// Concept Artist ------
  {
    title: 'Duoer',
    description: 'Girls Frontline',
    coverImage: 'https://pbs.twimg.com/media/GclGRl_bkAAuNqy?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Concept Artist',
    externalLink: 'https://x.com/dlgeria/media'
  },
  {
    title: 'Onsen-uri',
    description: 'Arknights',
    coverImage: 'https://pbs.twimg.com/media/G-oNaqIa4AEgXjd?format=jpg&name=4096x4096',
    type: ContentType.IMAGE,
    category: 'Concept Artist',
    externalLink: 'https://x.com/sg080915/media'
  },
  {
    title: 'Coneyrivard',
    description: 'Arknights',
    coverImage: 'https://pbs.twimg.com/media/EZbIPqiU8AERkDC?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Concept Artist',
    externalLink: 'https://x.com/coneyrivard/media'
  },

// Designer ------
  {
    title: 'Ordinary Folk',
    description: 'Motion Graphics',
    coverImage: 'https://pbs.twimg.com/profile_banners/3092213516/1677611320/1500x500',
    type: ContentType.IMAGE,
    category: 'Designer',
    externalLink: 'https://x.com/ordinaryfolkco/media'
  },
  {
    title: 'Tamaken',
    description: 'Typography',
    coverImage: 'https://pbs.twimg.com/media/G5Yy3D0bcAAsnNi?format=jpg&name=large',
    type: ContentType.IMAGE,
    category: 'Designer',
    externalLink: 'https://x.com/DesignSpot_Jap/media'
  },
  {
    title: 'Good Free Fonts',
    description: 'Typography',
    coverImage: 'https://pbs.twimg.com/media/G20CKf6aAAIG6Kb?format=jpg&name=medium',
    type: ContentType.IMAGE,
    category: 'Designer',
    externalLink: 'https://x.com/goodfreefonts/media'
  },
  
];
