import { ContentType, Post } from '../types';

// Reference Page Items
export const REF_ITEMS: Omit<Post, 'id'>[] = [

// --- Social ---
  {
    title: 'X',
    subtitle: 'Twitter',
    description: '실시간 소식과 다양한 분야의 이야기를 확인하고, 관심 있는 계정을 팔로우하며 의견을 나눌 수 있는 소셜 플랫폼입니다.',
    coverImage: 'ref/x.webp',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://x.com/'
  } as any,
  {
    title: 'DeviantArt',
    subtitle: '데비안아트',
    description: '일러스트와 사진, 공예 등 다양한 창작 작품을 게시하고 작가와 작품을 발견할 수 있는 온라인 아트 커뮤니티입니다.',
    coverImage: 'ref/devianart.webp',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://www.deviantart.com/'
  } as any,
  {
    title: 'ArtStation',
    subtitle: '아트스테이션',
    description: '게임·영화·엔터테인먼트 분야의 콘셉트 아트와 포트폴리오를 감상하고 공유하는 창작자 플랫폼입니다.',
    coverImage: 'ref/artstation.webp',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://www.artstation.com/'
  } as any,
  {
    title: 'Pixiv',
    subtitle: '픽시브',
    description: '일러스트와 만화, 소설을 올리고 다른 창작자의 작품을 감상할 수 있는 일본의 창작 커뮤니티입니다.',
    coverImage: 'ref/pixiv.webp',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://www.pixiv.net/'
  } as any,
  {
    title: 'Bluesky',
    subtitle: '블루스카이',
    description: '관심사에 따라 사람들과 소통하고 게시물을 공유할 수 있으며, 사용자 맞춤 피드도 이용할 수 있는 소셜 네트워크입니다.',
    coverImage: 'ref/bluesky.webp',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://bsky.app/'
  } as any,
  {
    title: 'Behance',
    subtitle: '비핸스',
    description: '디자인과 사진, 일러스트 등 창작 프로젝트를 포트폴리오로 선보이고 전 세계 창작자와 교류할 수 있는 플랫폼입니다.',
    coverImage: 'ref/behance.webp',
    type: ContentType.REF,
    category: 'Social',
    externalLink: 'https://www.behance.net/'
  } as any,

// --- Image ---
  {
    title: 'Cosmos',
    subtitle: '코스모스',
    description: '이미지와 디자인 자료를 수집하고 보드로 정리해, 영감이 되는 시각 자료를 쉽게 찾아볼 수 있는 라이브러리입니다.',
    coverImage: 'ref/cosmos.webp',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://www.cosmos.so/'
  } as any,
  {
    title: 'FilmGrab',
    subtitle: '필름그랩',
    description: '영화 장면 스틸 이미지를 모아 둔 아카이브로, 영화별 화면 구성과 색감, 조명 연출을 참고할 수 있습니다.',
    coverImage: 'ref/filmgrab.webp',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://film-grab.com/'
  } as any,
  {
    title: 'PhotoBash',
    subtitle: '포토배시',
    description: '작가와 디자이너를 위한 고화질 사진 및 배경이 제거된 이미지 자료를 제공하는 사이트입니다.',
    coverImage: 'ref/photobash.webp',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://www.photobash.org/'
  } as any,
  {
    title: 'Pinterest',
    subtitle: '핀터레스트',
    description: '관심 있는 이미지와 아이디어를 핀으로 저장하고 보드와 콜라주로 정리해 시각 자료를 모을 수 있습니다.',
    coverImage: 'ref/pinterest.webp',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://kr.pinterest.com/'
  } as any,
  {
    title: 'Pixabay',
    subtitle: '픽사베이',
    description: '사진과 일러스트, 영상 등 다양한 무료 스톡 콘텐츠를 검색하고 내려받을 수 있는 사이트입니다.',
    coverImage: 'ref/pixabay.webp',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://pixabay.com/'
  } as any,
  {
    title: 'Unsplash',
    subtitle: '언스플래시',
    description: '다양한 작가가 촬영한 고품질 사진을 찾아보고 프로젝트의 시각 자료로 활용할 수 있는 사진 플랫폼입니다.',
    coverImage: 'ref/unsplash.webp',
    type: ContentType.REF,
    category: 'Image',
    externalLink: 'https://unsplash.com/'
  } as any,

// --- Pose ---
  {
    title: 'Pose Maniacs',
    subtitle: '포즈 매니악스',
    description: '인체의 근육과 관절이 드러나는 3D 모델을 돌려 보며 포즈와 신체 구조를 관찰할 수 있는 크로키 참고 사이트입니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://www.posemaniacs.com/'
  } as any,
  {
    title: 'Attorial',
    subtitle: '아또리얼',
    description: '게임 및 웹툰에서 주로 사용되는 만화 및 일러스트 작법 강의를 전문으로 하는 온라인 학원입니다. 크로키 자료 및 일러스트 강의를 제공하여 그림을 그리는 데 도움을 줍니다.',
    coverImage: 'ref/attorial.webp',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://attorial.com/croquis'
  } as any,
  {
    title: 'Magic Poser',
    subtitle: '매직 포저',
    description: '3D 인체 모델의 자세와 관절을 조정해 원하는 포즈를 만들고, 구도와 인체 표현을 참고할 수 있는 도구입니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://webapp.magicposer.com/'
  } as any,
  {
    title: 'Lineo Action',
    subtitle: '',
    description: '다양한 인물 사진을 보며 시간 제한 크로키를 연습하고, 몸짓과 동작을 빠르게 관찰할 수 있는 드로잉 연습 사이트입니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://line-of-action.com/'
  } as any,
  {
    title: 'Sixiang',
    subtitle: '',
    description: '인물 사진을 중심으로 크로키와 포즈 드로잉에 참고할 수 있는 자료를 모아 둔 페이지입니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Pose',
    externalLink: 'https://amlyu.com/category/sixiang/'
  } as any,

// --- Color ---
  {
    title: 'OKLCH',
    subtitle: '',
    description: 'OKLCH 색상 공간을 이용해 색상과 밝기, 채도를 조절하고 웹 색상 코드를 확인할 수 있는 컬러 피커입니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Color',
    externalLink: 'https://oklch.com/#0.7,0.1,249,100'
  } as any,
  {
    title: 'CCS Color',
    subtitle: '',
    description: 'CSS 색상 값과 Oklab·OKLCH 색상 공간의 문법 및 브라우저 사용법을 설명하는 MDN 문서입니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Color',
    externalLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklab'
  } as any,
  {
    title: 'Kor Tone',
    subtitle: '',
    description: '한국 전통색의 유래와 색 조화를 살펴보고, 전통색을 바탕으로 색상 팔레트를 만들어 볼 수 있는 자료입니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Color',
    externalLink: 'https://gomchiiii.github.io/KORtone_feel-the-ttaekkal-of-Korea/'
  } as any,

// --- Design ---
  {
    title: 'Design Spiration',
    subtitle: '',
    description: '다양한 디자인 이미지를 탐색하고 저장해 그래픽·브랜딩·일러스트 작업의 시각적 영감을 얻을 수 있는 사이트입니다.',
    coverImage: 'ref/designspiration.webp',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://www.designspiration.com/'
  } as any,
  {
    title: 'Design Boom',
    subtitle: '',
    description: '건축과 디자인, 예술 분야의 프로젝트와 최신 소식을 소개하는 온라인 매거진입니다.',
    coverImage: 'ref/designboom.webp',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://www.designboom.com/'
  } as any,
  {
    title: 'Dribbble',
    subtitle: '',
    description: '디자이너와 창작자가 UI, 그래픽, 일러스트 등 작업물을 선보이고 서로 피드백을 나누는 커뮤니티입니다.',
    coverImage: 'ref/dribbble.webp',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://dribbble.com/'
  } as any,
  {
    title: 'Envato',
    subtitle: '',
    description: '그래픽 템플릿과 사진, 영상, 폰트 등 디자인 및 제작 프로젝트에 활용할 디지털 에셋을 제공하는 마켓플레이스입니다.',
    coverImage: 'ref/envato.webp',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://elements.envato.com/'
  } as any,
  {
    title: 'Fuse Kiwi',
    subtitle: '',
    description: '흥미로운 웹사이트와 온라인 프로젝트를 소개해 새로운 인터넷 콘텐츠를 발견할 수 있도록 돕는 큐레이션 사이트입니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://www.fuse.kiwi/'
  } as any,
  {
    title: 'Hvnter',
    subtitle: '',
    description: '상업 프로젝트에 활용할 수 있는 그래픽 에셋과 디자인 자료를 판매하는 크리에이티브 마켓입니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://hvnter.net/'
  } as any,
  {
    title: 'Medium Design',
    subtitle: '',
    description: '디자인 분야의 작업과 이야기를 살펴보고 시각적 영감을 얻을 수 있는 디자인 콘텐츠 사이트입니다.',
    coverImage: 'ref/mediumdesign.webp',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://medium.design/'
  } as any,
  {
    title: 'Notefolio',
    subtitle: '',
    description: '국내 창작자들이 일러스트와 디자인, 사진 등 작업물을 포트폴리오로 등록하고 소개하는 플랫폼입니다.',
    coverImage: 'ref/notefolio.webp',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://notefolio.net/'
  } as any,
  {
    title: 'Typographic Posters',
    subtitle: '',
    description: '세계 여러 디자이너의 타이포그래피 포스터를 모아 보여 주는 아카이브로, 글자와 레이아웃 디자인을 참고할 수 있습니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://www.typographicposters.com/'
  } as any,
    {
    title: 'The Inspiration Grid',
    subtitle: '',
    description: '그래픽과 일러스트, 사진, 패션 등 다양한 분야의 창작 사례를 모아 소개하는 영감 큐레이션 사이트입니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Design',
    externalLink: 'https://theinspirationgrid.com/'
  } as any,

// --- Market ---
  {
    title: 'Booth',
    subtitle: '부스',
    description: '일러스트와 모델, 의상, 디지털 자료 등 창작자가 만든 상품을 판매하고 구매할 수 있는 온라인 마켓입니다.',
    coverImage: 'ref/booth.webp',
    type: ContentType.REF,
    category: 'Market',
    externalLink: 'https://booth.pm/ja'
  } as any,
  {
    title: 'DLsite',
    subtitle: '디엘사이트',
    description: '동인지와 인디 게임, 음성·ASMR 등 다양한 창작 콘텐츠를 구매하고 내려받을 수 있는 디지털 마켓입니다.',
    coverImage: 'ref/dlsite.webp',
    type: ContentType.REF,
    category: 'Market',
    externalLink: 'https://www.dlsite.com/index.html'
  } as any,
  {
    title: 'Pixiv Fanbox',
    subtitle: '픽시브 팬박스',
    description: '창작자가 작품과 후원자 전용 콘텐츠를 공개하고, 팬으로부터 정기적인 후원을 받을 수 있는 서비스입니다.',
    coverImage: 'ref/pixivfanbox.webp',
    type: ContentType.REF,
    category: 'Market',
    externalLink: 'https://www.fanbox.cc/'
  } as any,

// --- Others ---
  {
    title: 'Character Designs',
    subtitle: '',
    description: '캐릭터 디자인 수업에서 탄생한 학생 작품과 캐릭터 콘셉트 아트를 소개하는 갤러리입니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://www.characterdesigns.com/'
  } as any,
  {
    title: 'Textures',
    subtitle: '',
    description: '사진과 3D 작업에 활용할 수 있는 텍스처 및 재질 이미지를 찾아볼 수 있는 자료 사이트입니다.',
    coverImage: 'ref/textures.webp',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://www.textures.com/'
  } as any,
  {
    title: 'Sketchfab',
    subtitle: '',
    description: '웹에서 3D 모델을 회전·확대해 살펴보고, 창작자가 공유한 다양한 모델을 탐색할 수 있는 플랫폼입니다.',
    coverImage: 'ref/sketchfab.webp',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://sketchfab.com/'
  } as any,
  {
    title: '​Game Gui',
    subtitle: '',
    description: '여러 게임의 인터페이스 화면을 모아 둔 데이터베이스로, 메뉴와 HUD 등 게임 UI 디자인을 참고할 수 있습니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://www.gameuidatabase.com/'
  } as any,
  {
    title: 'Bone Clones',
    subtitle: '',
    description: '실제 동물의 골격과 해부 구조를 본뜬 표본 및 모형을 소개하는 사이트로, 동물 뼈대 형태를 참고할 수 있습니다.',
    coverImage: 'ref/boneclones.webp',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://boneclones.com/'
  } as any,
  {
    title: 'X6ud',
    subtitle: '',
    description: '동물 사진을 검색해 볼 수 있어 동물의 형태와 자세를 그릴 때 참고 자료로 활용할 수 있는 사이트입니다.',
    coverImage: '',
    type: ContentType.REF,
    category: 'Others',
    externalLink: 'https://x6ud.github.io/#/'
  } as any,
];
