import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import glsl from 'vite-plugin-glsl';
import postCssPxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import compression from 'vite-plugin-compression';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { terser } from 'rollup-plugin-terser';
import postcsspxtoviewport from 'postcss-px-to-viewport';

export default defineConfig({
  plugins: [
    vue(),
    terser(),
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
        postcsspxtoviewport({
          // 要转化的单位
          unitToConvert: 'px',
          // UI设计稿的大小
          viewportWidth: 1920,
          // 转换后的精度
          unitPrecision: 6,
          // 转换后的单位
          viewportUnit: 'vw',
          // 字体转换后的单位
          fontViewportUnit: 'vw',
          // 能转换的属性，*表示所有属性，!border表示border不转
          propList: ['*'],
          // 指定不转换为视窗单位的类名，
          selectorBlackList: ['ignore-'],
          // 最小转换的值，小于等于1不转
          minPixelValue: 1,
          // 是否在媒体查询的css代码中也进行转换，默认false
          mediaQuery: false,
          // 是否转换后直接更换属性值
          replace: true,
          // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          exclude: [],
          // 包含那些文件或者特定文件
          include: [],
          // 是否处理横屏情况
          landscape: false,
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
