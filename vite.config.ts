import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import glsl from 'vite-plugin-glsl';
import postCssPxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import compression from 'vite-plugin-compression';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    glsl(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240, //压缩阈值，小于这个值的不会被压缩，单位是字节
      algorithm: 'gzip', //压缩算法
      ext: 'gz', //压缩文件的后缀
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
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
