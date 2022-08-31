<script setup lang="ts">
import { onMounted } from 'vue'
import request from '@/utils/request'

onMounted(() => {
  request.get({url: '/banner'})
    .then(res => {
      console.log(res)
    })
})
</script>

<template>
  home
</template>

<style lang="scss" scoped></style>
