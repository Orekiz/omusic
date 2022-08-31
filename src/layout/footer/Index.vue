<script setup lang="ts">
import MobileNav from '@/components/MobileNav.vue'
import AudioControl from '@/components/AudioControl.vue'
</script>

<template>
<footer>
  <AudioControl />
  <MobileNav />
</footer>
</template>

<style lang="scss" scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding: 0 10vw;
}
</style>
