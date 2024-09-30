//引入全局组件
import SvgIcon from './SvgIcon.vue';
import type { App, Component } from 'vue';
//全局对象
const components: { [name: string]: Component } = { SvgIcon };
//对外暴露插件对象
export default {
  //insatll方法
  install(app: App) {
    //注册项目为全局组件(可注册多个)
    Object.keys(components).forEach((key: string) => {
      //注册全局组件
      app.component(key, components[key]);
    });
  },
};
