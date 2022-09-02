<script setup lang="ts"></script>

<template>
  <audio src=""></audio>
  <div class="audio-control">
    <div class="wrapper">
      <p>AudioControl</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen {
  .audio-control {
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid black;
  }

  @media (min-width: 768px) {
    nav.mobileNav {
      display: none;
    }
  }
}
</style>
