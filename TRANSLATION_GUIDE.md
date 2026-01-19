# Translation Guide for WakaMoe Website

This guide explains how to add and manage translations for content on the WakaMoe website.

## Overview

The website now supports both English (en) and Korean (ko) languages. Content can be translated for:
- Carousel slide titles
- Official Notices titles and categories
- Post titles and descriptions
- UI elements (menus, buttons, etc.)

## How to Add Translations

### 1. UI Elements Translation

UI elements like menus, buttons, and labels are translated in `constants/translations.ts`:

```typescript
export const translations: Record<Language, Translations> = {
  en: {
    home: 'Home',
    game: 'Game',
    // ... more translations
  },
  ko: {
    home: '홈',
    game: '게임',
    // ... more translations
  }
};
```

### 2. Carousel Slides Translation

Edit `constants/index.ts` for carousel translations:

```typescript
export const MOCK_CAROUSEL: CarouselItem[] = [
  {
    id: '1',
    image: 'hero1.png',
    title: {
      en: 'ARKNIGHT: END FIELD',
      ko: '명일방주: 엔드필드'
    },
    link: 'https://...'
  }
];
```

### 3. Official Notices Translation

Edit `constants/index.ts` for notice translations:

```typescript
export const OFFICIAL_NOTICES: HotContentItem[] = [
  { 
    id: 'n1', 
    title: {
      en: 'Make Artist Great Again.',
      ko: '아티스트를 다시 위대하게.'
    }, 
    category: {
      en: 'Notice',
      ko: '공지'
    }, 
    image: '' 
  }
];
```

### 4. Post Translations

Posts are stored in different files based on their type:
- `constants/game.ts` - Game-related posts
- `constants/ref.ts` - Reference materials
- `constants/video.ts` - Video content
- `constants/library.ts` - Library items

Example from `constants/game.ts`:

```typescript
{
  title: {
    en: 'HONKAI GAKUEN 2',
    ko: '붕괴학원 2'
  },
  description: {
    en: '',
    ko: ''
  },
  coverImage: 'game/hg2.png', 
  type: ContentType.GAME,
  category: 'Hoyoverse',
  gameLinks: [
    { label: 'Official Info', url: 'https://...' }
  ]
}
```

Example from `constants/ref.ts`:

```typescript
{
  title: {
    en: 'X',
    ko: 'X'
  },
  description: {
    en: 'From breaking news and entertainment...',
    ko: '속보부터 엔터테인먼트...'
  },
  coverImage: 'ref/x.png',
  type: ContentType.REF,
  category: 'Social',
  externalLink: 'https://x.com/'
}
```

## Supported Translation Formats

### Simple String (backward compatible)
```typescript
title: 'Simple Title'
```

### Multi-language Object
```typescript
title: {
  en: 'English Title',
  ko: '한국어 제목'
}
```

Both formats work! If you use a simple string, it will display in both languages.

## Category Translation

Categories are automatically translated using the translation system. Available categories and their Korean translations:

### Game Categories
- Hoyoverse → 호요버스
- HyperGraph → 하이퍼그리프
- Nexon → 넥슨
- Kuro Games → 쿠로 게임즈
- Shift Up → 시프트업
- Yostar → 요스타
- Manjuu → 만쥬
- Sega → 세가
- Others → 기타

### Library Categories
- Illustrator → 일러스트레이터
- Cosplayer → 코스플레이어
- Mangaka → 만화가
- Concept Artist → 컨셉 아티스트
- Designer → 디자이너

### Reference Categories
- Social → 소셜
- Image → 이미지
- Pose → 포즈
- Color → 색상
- Design → 디자인
- Market → 마켓

### Video Categories
- Game Trailer → 트레일러
- How to → 방법
- Process → 과정
- Live Stream → 스트리밍

## Testing Translations

1. Run the development server:
```bash
npm run dev
```

2. Open the website in your browser

3. Click the language button (EN/KR) in the system settings to switch languages

4. Verify that:
   - Carousel titles change language
   - Official notices change language
   - Post titles and descriptions change language
   - Categories change language
   - Footer text changes language

## Building for Production

After adding translations, build the project:

```bash
npm run build
```

Make sure there are no errors before deploying.

## Tips for Administrators

1. **Consistency**: Keep the same tone and style across translations
2. **Length**: Try to keep Korean translations similar in length to English for better UI display
3. **Categories**: Always use the English category names in the data files - they will be automatically translated in the UI
4. **Testing**: Always test both languages after adding new content
5. **Empty Descriptions**: If a post doesn't need a description, you can leave it empty: `description: { en: '', ko: '' }`

## Troubleshooting

### Issue: Text not translating
- Check that you used the `{ en: '...', ko: '...' }` format
- Verify the component passes the `language` prop correctly
- Check browser console for errors

### Issue: Build fails
- Make sure all translation objects have both `en` and `ko` properties
- Check for syntax errors (missing commas, quotes, etc.)
- Run `npm run build` to see specific error messages

### Issue: Categories not translating
- Categories should be in English in the data files
- The translation happens automatically in the UI
- Check that the category name matches one of the supported categories listed above

## Contact

If you need help with translations or encounter issues, please consult the development team.
