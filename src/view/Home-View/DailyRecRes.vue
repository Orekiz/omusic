<script lang="ts" setup>
import { onMounted, reactive, ref, toRef, watch } from 'vue'
import { loginHooks, musicListHooks } from '@/api'
import { State } from './typings'
import { isGuestLogined } from '@/utils'
import { ElNotification } from 'element-plus'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()

const loading = ref(true)
const { dailyRec } = musicListHooks()
const state: State = reactive({
  dailyRecommendResource: []
})
const dailyRecommendResource = toRef(state, 'dailyRecommendResource')

const getDailyRecommendResource = () => {
  dailyRec().then(res => {
    if (res.recommend.length > 5) {
      dailyRecommendResource.value = res.recommend.slice(0, 5)
    } else {
      dailyRecommendResource.value = res.recommend.slice(0, 10)
    }
    loading.value = false
  }).catch(err => {
    console.log(err)
  })
}

onMounted(async () => {
  // 请求推荐歌单前验证是否登录
  const _isLogined = userStore.isLogined
  // 是否用户已经是游客登陆状态
  const _isGuestLogined = isGuestLogined()
  // 未登录自动进行游客登录
  const { loginGuest } = loginHooks()
  if (!_isLogined) {
    ElNotification({
      title: '提示',
      message: '当前为游客登录，有需要请进行登录'
    })
    if (!_isGuestLogined) {
      await loginGuest()
    }
  }
  getDailyRecommendResource()
  // 监听store的登录状态，如果登录了就再次请求推荐歌单
  watch(
    () => userStore.isLogined,
    () => {
      loading.value = true
      getDailyRecommendResource();
    }
  )
})

const goMusiclist = (id: number) => {
  router.push({ name: 'musiclist', params: { id } })
}
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
          <div class="item" v-for="item of dailyRecommendResource" :key="item.id" @click="goMusiclist(item.id)">
            <div class="pic">
              <img loading="lazy" :src="item.picUrl" :alt="item.name">
            </div>
            <div class="shadow">
              <img :src="item.picUrl + '?imageView&blur=50x50'" alt="">
            </div>
            <p>{{ item.name }}</p>
          </div>
        </section>
      </template>
    </el-skeleton>
  </section>
</template>

<style lang="scss" scoped>
@media screen {
  .daily-rec {
    .title {
      h2 {
        font-size: 26px;
      }

      span {
        font-size: 12px;
      }
    }

    .content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .item {
        position: relative;
        width: calc(((100vw - 20vw) / 5) - 30px);
        margin-top: 20px;
        // background-color: var(--el-mask-color);
        cursor: pointer;
        border-radius: 10px;

        &:hover {
          .pic {
            img {
              transform: scale(1.01);
            }
          }

          .shadow {
            opacity: .5;
          }
        }

        .pic {
          width: 100%;
          border-radius: 10px;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
            transition: var(--el-transition-all);
          }
        }

        .shadow {
          position: absolute;
          top: 5%;
          left: 0;
          z-index: -1;
          opacity: 0;
          transition: var(--el-transition-fade);

          img {
            display: block;
            width: 100%;
            filter: blur(20px);
          }
        }

        p {
          margin-top: 10px;
          font-weight: bold;
          padding: 0 5%;
        }
      }
    }
  }

  html.dark {
    .daily-rec {
      .content {
        .item {
          &:hover {
            .shadow {
              opacity: .7;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .daily-rec {
      .content {
        .item {
          width: calc(50% - 10px);
        }
      }
    }
  }
}
</style>