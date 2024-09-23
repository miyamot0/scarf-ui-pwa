import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

import base_manifest from './public/manifest.json';

const screenshots = base_manifest.screenshots as {
  src: string;
  sizes: string;
  label?: string;
  platform?:
    | 'android'
    | 'ios'
    | 'kaios'
    | 'macos'
    | 'windows'
    | 'windows10x'
    | 'chrome_web_store'
    | 'play'
    | 'itunes'
    | 'microsoft-inbox'
    | 'microsoft-store'
    | string;
  form_factor?: 'narrow' | 'wide';
  type?: string;
}[];

const { icons, name, short_name, description } = base_manifest;

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*'],
        cleanupOutdatedCaches: true,
        sourcemap: false,
      },
      manifest: {
        theme_color: '#F5F5F5',
        background_color: '#F5F5F5',
        icons,
        orientation: 'any',
        dir: 'ltr',
        lang: 'en-US',
        name,
        short_name,
        description,
        scope: '/',
        display: 'standalone',
        start_url: '/',
        id: '/',
        screenshots,
      },
    }),
  ],
  build: {
    manifest: true,
  },
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
