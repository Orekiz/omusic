import { createApp } from 'vue'
import './assets/css/index.scss'
import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'

import 'https://at.alicdn.com/t/c/font_3666081_h4dzbu0xdcm.js'

// pinia
import { createPinia } from 'pinia'

// 检测登录状态
import { isLogined } from './utils'
import { useUserStore } from './store'

createApp(App).use(router).use(createPinia()).mount('#app')

// 将检测的登录状态存入store
const userStore = useUserStore()
if (isLogined()) {
    userStore.setLogined()
}
