<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const musiclistId = route.params.id
</script>

<template>
  歌单 MusicList {{ musiclistId }}
</template>

<style lang="scss" scoped>

</style>