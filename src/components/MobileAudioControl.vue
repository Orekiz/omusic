<script lang="ts" setup>

</script>

<template>
  <section class="mobile-audio-control">
    MobileAudioControl
  </section>
</template>

<style lang="scss" scoped>
@media screen {
  .mobile-audio-control {
    display: none;
  }
  @media (max-width: 768px) {
    .mobile-audio-control {
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>