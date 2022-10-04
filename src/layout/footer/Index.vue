<script setup lang="ts">
import MobileNav from '@/components/MobileNav.vue'
import AudioControl from '@/components/AudioControl.vue'
import MobileAudioControl from '@/components/MobileAudioControl.vue';
</script>

<template>
<footer>
  <MobileAudioControl />
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
  background-color: rgba(255, 255, 255, .72);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color var(--el-transition-duration-fast);
}

html.dark {
  footer {
    background-color: rgba(20, 20, 20, .7); 
  }
}
</style>
