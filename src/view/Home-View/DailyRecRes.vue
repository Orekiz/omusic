<script lang="ts" setup>
import { onMounted, reactive, ref, toRef } from 'vue'
import { musicListHooks } from '@/api'
import { State } from './typings'
import { isLogined } from '@/utils'
import { loginHooks } from '@/api'
const loading = ref(true)
const { dailyRec } = musicListHooks()
const state: State = reactive({
  dailyRecommendResource: []
})
const dailyRecommendResource = toRef(state, 'dailyRecommendResource')

onMounted(async () => {
  // 请求推荐歌单前验证是否登录
  const _isLogined = isLogined()
  // 未登录自动进行游客登录
  const { loginGuest } = loginHooks()
  if (!_isLogined) {
    await loginGuest()
  }
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