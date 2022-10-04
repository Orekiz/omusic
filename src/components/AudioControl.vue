<script setup lang="ts"></script>

<template>
  <audio src=""></audio>
  <section class="audio-control">
    <div class="wrapper">
      <p>AudioControl</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@media screen {
  .audio-control {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    .audio-control {
      display: none;
    }
  }
}
</style>
