import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { ContentType, type GameLink } from '../types';

export type CardRow = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  cover_image: string;
  icon_image: string | null;
  type: string;
  category: string | null;
  tags: string[];
  video_url: string | null;
  channel_url: string | null;
  external_link: string | null;
  game_links: GameLink[];
  image_index: number | null;
  slider_images: string[];
}

type CardInsert = Omit<CardRow, 'id'> & { id?: string };

type Database = {
  public: {
    Tables: {
      cards: {
        Row: CardRow;
        Insert: CardInsert;
        Update: Partial<CardRow>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}

const env = import.meta.env;
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const adminEmail = (env.NEXT_PUBLIC_SUPABASE_ADMIN_EMAIL || env.VITE_SUPABASE_ADMIN_EMAIL || '').trim();

export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl!, supabaseAnonKey!)
  : null;

export const requireSupabase = (): SupabaseClient<Database> => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Set the Supabase URL and anon key in .env.local.');
  }
  return supabase;
};

export const isCardType = (value: string): value is ContentType =>
  Object.values(ContentType).some((type) => type === value);
