import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from "vue-query";

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';
import router from './router';

import './assets/styles/index.scss';
import 'element-plus/dist/index.css';
import 'devextreme/dist/css/dx.light.css';
import ElementPlus from 'element-plus';


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(VueQueryPlugin);

app.mount('#app')
