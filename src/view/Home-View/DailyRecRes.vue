<script lang="ts" setup>
import { onMounted, reactive, ref, toRef, watch } from 'vue'
import { loginHooks, musicListHooks } from '@/api'
import { State } from './typings'
import { isLogined, isGuestLogined } from '@/utils'
import { ElNotification } from 'element-plus'
import { useUserStore } from '@/store'
const userStore = useUserStore()

const loading = ref(true)
const { dailyRec } = musicListHooks()
const state: State = reactive({
  dailyRecommendResource: []
})
const dailyRecommendResource = toRef(state, 'dailyRecommendResource')

const getDailyRecommendResource = () => {
  dailyRec().then(res => {
    dailyRecommendResource.value = res.recommend
    loading.value = false
  }).catch(err => {
    console.log(err)
  })
}

// #TODO: 验证是否登录可以写在父组件HomeView里，通过props传进来，写在这里有些繁琐
onMounted(async () => {
  // 请求推荐歌单前验证是否登录
  const _isLogined = isLogined()
  // 是否用户已经是游客登陆状态
  const _isGuestLogined = isGuestLogined()
  // 未登录自动进行游客登录
  const { loginGuest } = loginHooks()
  if (!_isLogined) {
    ElNotification({
      title: '提示',
      message: '当前为游客登录，有需要请进行登录'
    })
    // 监听store的登录状态，如果登录了就再次请求推荐歌单
    watch(
      () => userStore.isLogined,
      () => {
        getDailyRecommendResource()
      }
    )
    if(!_isGuestLogined) {
      await loginGuest()
    }
  }
  getDailyRecommendResource()
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