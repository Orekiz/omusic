<!-- keep-alive 需要的组件name -->
<script lang="ts">
  export default {
    name: 'HomeView'
  }
</script>
<script setup lang="ts">
  import DailyRecRes from './DailyRecRes.vue'
</script>

<template>
  <daily-rec-res />
</template>

<style lang="scss" scoped></style>
