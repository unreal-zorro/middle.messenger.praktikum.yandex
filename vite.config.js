import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, './src'),
  publicDir: path.resolve(__dirname, './static'),
  build: {
    outDir: path.resolve(__dirname, './dist')
  }
});
