import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteJustZip from 'vite-just-zip';

export default defineConfig({
  plugins: [
    vue(),
    viteJustZip({
      outDir: 'dist',
      zipPath: './dist',
      appCode: 'myapp',
      enabled: true
    })
  ],
  build: {
    outDir: 'dist'
  }
});
