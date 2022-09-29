import { createApp } from 'vue'
import './assets/css/index.scss'
import App from './App.vue'
import router from './router'

import "element-plus/theme-chalk/el-message.css"
import "element-plus/theme-chalk/el-notification.css"

// pinia
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')
