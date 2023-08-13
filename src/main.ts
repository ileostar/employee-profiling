import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import router from '@/router';
import App from './App.vue';
import '@/util/iconfont.js';
import * as echarts from 'echarts';   //引入echarts

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import svgIcon from '@/components/svgIcon/svgIcon.vue'
import 'virtual:svg-icons-register'

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.config.globalProperties.$echarts = echarts;   //全局使用
app.use(ElementPlus, { locale: zhCn });
app.use(pinia);
app.use(router);
app.component('svg-icon', svgIcon);

app.mount('#app');