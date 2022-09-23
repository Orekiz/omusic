import { createApp } from 'vue'
import './assets/css/index.scss'
import App from './App.vue'
import router from './router'

import "element-plus/theme-chalk/el-message.css"

// pinia
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')

import { isLogined } from './utils'
import { loginHooks } from './api'
// 验证是否登录
const _isLogined = isLogined()
// 未登录自动进行游客登录
const { loginGuest } = loginHooks()
if (!_isLogined) {
  loginGuest()
}
