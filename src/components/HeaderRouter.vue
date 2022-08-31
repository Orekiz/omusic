<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const routerBack = () => {
  router.back()
}
const routerForward = () => {
  router.forward()
}
</script>

<template>
  <el-button text :icon="ArrowLeftBold" @click="routerBack" />
  <el-button style="margin-left: 0px;" text :icon="ArrowRightBold" @click="routerForward" />
</template>

<style lang="scss" scoped>
</style>
