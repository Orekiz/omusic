<script lang="ts" setup>
import { onMounted, reactive, ref, toRef } from 'vue'
import { musicListHooks } from '@/api'
import { State } from './typings'
const loading = ref(true)
const { dailyRec } = musicListHooks()
const state: State = reactive({
  dailyRecommendResource: []
})
const dailyRecommendResource = toRef(state, 'dailyRecommendResource')
onMounted(() => {
  dailyRec().then(res => {
    state.dailyRecommendResource = res.recommend
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
        <section class="content">
          <p v-for="(item, index) of dailyRecommendResource" :key="index">
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
      margin-bottom: 20px;
      h2 {
        font-size: 26px;
      }
      span {
        font-size: 12px;
      }
    }

    .content {
      width: 100%;
    }
  }
</style>