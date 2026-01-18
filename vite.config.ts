import path from 'path';
import { defineConfig } from 'vite'; // loadEnv 삭제
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? "/WakamoLover.github.io/" : "/",

  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});