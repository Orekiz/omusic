import { createApp } from 'vue'
import './assets/css/index.scss'
import App from './App.vue'
import router from './router'

import "element-plus/theme-chalk/el-message.css"

// pinia
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')

import { isLogined } from './utils'
import { loginHooks, musicListHooks } from './api'
// 验证是否登录
const _isLogined = isLogined()
// 未登录自动进行游客登录
const _loginHooks = loginHooks()
if (!_isLogined) {
  _loginHooks.guestLogin()
  .then(res => {
    console.log(res)
    // 测试登录
    const _musicListHoos = musicListHooks()
    _musicListHoos.dailyRec()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  })
}
