import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './modules/i18n';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/normalize.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueLazyLoad from 'vue3-lazyload'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(store)
app.use(i18n)
app.use(ElementPlus)
app.use(VueLazyLoad,{
    loading: '',
    error: '',
})
app.mount('#app')
