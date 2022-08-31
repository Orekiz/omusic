<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let seconds = ref(5);

const router = useRouter()

let timer: NodeJS.Timer

onMounted(() => {
  timer = setInterval(() => {
    seconds.value > 1 ? seconds.value-- : router.push('/')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

</script>

<template>
  <div class="not-found">
    <p>404 NOT FOUND</p>
    <p>{{ seconds }}秒后返回首页</p>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  padding-top: 40px;
  p {
    font-weight: 800;
    font-size: 30px;
    margin-top: 20px;
  }
}
</style>
