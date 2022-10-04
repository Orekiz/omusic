<script setup lang="ts">
</script>

<template>
<main>
  <router-view v-slot="{ Component }">
    <!-- 只缓存HomeView -->
    <keep-alive :include="['HomeView', 'Explore']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</main>
</template>

<style lang="scss" scoped>
main {
  margin-top: calc(64px + 20px);
  padding: 0 10% 200px;
}
</style>
