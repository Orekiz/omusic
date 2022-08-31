<script setup lang="ts">
const navLinks = [
  { to: '/', content: '首页' },
  { to: '/explore', content: '发现' },
  { to: '/mine', content: '我的' },
]
</script>

<template>
  <nav class="mobileNav">
    <router-link v-for="(item, index) of navLinks" :key="index" :to="item.to">{{ item.content }}</router-link>
  </nav>
</template>

<style lang="scss" scoped>
@media screen {
  nav.mobileNav {
    height: 64px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    a {
      display: inline-flex;
      justify-content: center;
      align-content: center;
      padding: 10px 19px;
      font-size: 14px;
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
    }
  }

  @media (min-width: 768px) {
    nav.mobileNav {
      display: none;
    }
  }
}
</style>
