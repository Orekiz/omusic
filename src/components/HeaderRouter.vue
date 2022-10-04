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
  <section class="router">
    <el-button text :icon="ArrowLeftBold" @click="routerBack" />
    <el-button style="margin-left: 0px;" text :icon="ArrowRightBold" @click="routerForward" />
  </section>
</template>

<style lang="scss" scoped>
  @media screen {
    .router {
      display: flex;
    }

    @media (max-width: 768px) {
      .router {
        display: none;
      }
    }
  }
</style>
