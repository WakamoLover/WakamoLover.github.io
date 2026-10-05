export enum ContentType {
  CREATOR = 'CREATOR',
  MEDIA = 'MEDIA',
  REF = 'REF',
  GAME = 'GAME'
}

export interface GameLink {
  label: string;
  url: string;
}

export interface Post {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  coverImage: string;
  iconImage?: string;
  type: ContentType;
  category?: string;
  
  tags?: string[]; 
  
  videoUrl?: string;
  channelUrl?: string;
  externalLink?: string; 
  gameLinks?: GameLink[]; 
  
  imageIndex?: number;
  
  thumbnail?: string;

  sliderImages?: string[];
}

export interface CarouselItem {
  id: string;
  image: string;
  title: string;
  link: string;
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