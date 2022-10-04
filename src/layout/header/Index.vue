<script setup lang="ts">
import { isDark } from '../../utils';
import Profile from '@/components/Profile.vue'
import HeaderRouter from '@/components/HeaderRouter.vue'
import { Moon, Sunny } from '@element-plus/icons-vue';
const navLinks = [
  { to: '/', content: '首页' },
  { to: '/explore', content: '发现' },
  { to: '/mine', content: '我的' },
]
</script>

<template>
<header>
  <div class="left flexitem">
    <router-link class="logo" to="/">OMusic</router-link>
    <HeaderRouter />
  </div>
  <div class="mid flexitem">
    <router-link v-for="(item, index) of navLinks" :key="index" :to="item.to">{{ item.content }}</router-link>
  </div>
  <div class="right flexitem">
    <el-switch
      v-model="isDark"
      inline-prompt
      :active-icon="Moon"
      :inactive-icon="Sunny"
      ></el-switch>
    <Profile />
  </div>
</header>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 0 10vw;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  // background-image: radial-gradient(transparent 1px, var(--el-bg-color) 1px);
  // background-size: 4px 4px;
  // backdrop-filter: saturate(50%) blur(4px);
  transition: background-color var(--el-transition-duration-fast);
  z-index: 999;

  .flexitem {
    flex: 1;
  }

  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .logo {
      display: inline-block;
      padding: 10px 10px 10px 0;
      // margin-right: 20px;
      font-size: 24px;
      font-weight: 1000;
      text-decoration: none;
      color: var(--el-text-color-primary);
      transition: var(--el-transition-color);
  
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
  .mid {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: inline-flex;
      justify-content: center;
      align-content: center;
      padding: 10px 19px;
      font-size: 18px;
      font-weight: bold;
      color: var(--el-text-color-primary);
      text-decoration: none;
      transition: .3s var(--el-transition-function-fast-bezier);
      border-radius: var(--el-border-radius-base);
      transform: translateY(2px);
      &+ a {
        margin-left: 12px;
      }
      &:hover {
        background-color: var(--el-fill-color-light);
      }
      &.router-link-active.router-link-exact-active {
        color: var(--el-color-primary);
      }

      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }
  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .el-switch {
      margin-right: 20px;
    }
  }
}

html {
  header {
    background-color: rgba(255, 255, 255, .72);
  }
}
html.dark {
  header {
    background-color: rgba(20, 20, 20, .7); 
  }
}
</style>
