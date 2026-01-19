export enum ContentType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  REF = 'REF',
  GAME = 'GAME'
}

export interface LocalizedString {
  en: string;
  ko: string;
}

export interface GameLink {
  label: string;
  url: string;
}

export interface Post {
  id: string;
  title: string | LocalizedString;
  description: string | LocalizedString;
  coverImage: string;
  type: ContentType;
  category?: string;
  
  tags?: string[]; 
  
  videoUrl?: string; 
  externalLink?: string; 
  gameLinks?: GameLink[]; 
  
  imageIndex?: number;
  
  thumbnail?: string;
}

export interface CarouselItem {
  id: string;
  image: string;
  title: string | LocalizedString;
  link: string;
}

export interface HotContentItem {
  id: string;
  title: string | LocalizedString;
  category: string | LocalizedString;
  image: string;
}

export interface ExternalLinkItem {
  id: string;
  image: string;
  url: string;
  title: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}