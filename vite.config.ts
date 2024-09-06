import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import glsl from 'vite-plugin-glsl';
import postCssPxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), glsl()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@import "./src/assets/css/values.less";',
      },
    },
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 16,
          propList: ['*'],
        }),
        autoprefixer({
          overrideBrowserslist: ['Android >= 4.1', 'iOS >= 7.1', 'Chrome > 31', 'ff >31', 'Safari >= 9', 'IE >= 8'],
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
