export enum ContentType {
  PAGE1 = 'GAME',
  PAGE2 = 'CREATOR',
  PAGE3 = 'MEDIA',
  PAGE4 = 'REF',
}

export enum PageId {
  PAGE1 = 'page1',
  PAGE2 = 'page2',
  PAGE3 = 'page3',
  PAGE4 = 'page4',
}

export interface GameLink {
  label: string;
  url: string;
}

export interface Post {
  id: string;
  sourceKey?: string;
  title: string;
  subtitle?: string;
  description: string;
  coverImage: string;
  iconImage?: string;
  type: ContentType;
  category?: string | string[];
  
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