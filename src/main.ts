import './assets/css/values.less';
import './assets/css/reset.less';
import './assets/css/common.less';
import router from '@/router';
import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n/index';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.mount('#app');
