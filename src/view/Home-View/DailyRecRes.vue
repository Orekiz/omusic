<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { musicListHooks } from '@/api'
import { State } from './typings'
const loading = ref(true)
const _musicListHooks = musicListHooks()
const state: State = reactive({
  dailyRecommendRescourse: []
})
onMounted(() => {
  _musicListHooks.dailyRec()
  .then(res => {
    state.dailyRecommendRescourse = res.recommend
    console.log(res.recommend)
    loading.value = false
  })
})
</script>

<template>
  <section class="daily-rec">
    <section class="title">
      <h2>每日推荐歌单</h2>
      <span>Daily Recommend Rescource</span>
    </section>
    <el-skeleton :loading="loading" animated>
      <template #default>
        <section>
          <p v-for="(item, index) of state.dailyRecommendRescourse" :key="index">
            {{ item.name }}
          </p>
        </section>
      </template>
    </el-skeleton>
  </section>
</template>

<style lang="scss" scoped>
  .daily-rec {
    .title {
      h2 {
        font-size: 26px;
      }
      span {
        font-size: 12px;
      }
    }
  }
</style>