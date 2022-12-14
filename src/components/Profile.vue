<script setup lang="ts">
import { onMounted, ref, toRef, watch, computed } from 'vue'
import { UserFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
import { loginHooks, userHooks } from '@/api'
import { ElMessage } from 'element-plus'
import { removeQrLogined } from '@/utils'
const userStore = useUserStore()
const router = useRouter()

const isLogined = toRef(userStore, 'isLogined')
const { logout, loginGuest } = loginHooks()
const { userAccount } = userHooks()

onMounted(() => {
  watch(
    () => userStore.isLogined,
    (isLogined, preIsLogined) => {
      if (isLogined === true && preIsLogined === false) {
        userAccount().then(res => {
          const { userId, nickname, signature, avatarUrl } = res.profile
          userStore.setUserProfile({ userId, nickname, signature, avatarUrl })
        }).catch(err => {
          console.log(err)
        })
      }
    }
  )
})

const signature = computed(() => {
  return isLogined.value ? userStore.signature : '当前是游客登录'
})
const avatar = computed(() => {
  return isLogined.value ? `${userStore.avatarUrl}` : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
})
const goLogin = () => {
  router.push('/login')
}
const logoutBtnLoading = ref(false)
const logoutHandler = async () => {
  logoutBtnLoading.value = true
  await logout()
  // 删除二维码登录的cookie
  removeQrLogined()
  ElMessage.success('登出成功，跳转至登录页面')
  // 游客登录，以防首页推荐出现问题
  loginGuest().then(() => {
    userStore.isLogined = false
    userStore.setUserProfile({})
  })
  router.push('/login')
  logoutBtnLoading.value = false
}
</script>

<template>
<div class="profile">
  <el-popover
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
  >
    <template #reference>
      <el-avatar class="avatar" :icon="UserFilled" :src="avatar" />
    </template>
    <template #default>
      <div class="profile-show">
        <div class="avatar-container">
          <el-avatar class="avatar" size="large" :icon="UserFilled" :src="avatar" />
        </div>
        <div class="profile-main">
          <p class="name">{{ userStore.nickname }}</p>
          <p class="signature">{{ signature }}</p>
          <section v-if="isLogined" class="button-group-logined">
            <el-button type="primary" @click="logoutHandler" :loading="logoutBtnLoading">退出登录</el-button>
          </section>
          <section v-else class="button-group-unlogin">
            <el-button type="primary" @click="goLogin">登录</el-button>
          </section>
        </div>
      </div>
    </template>
  </el-popover>
</div>
</template>

<style lang="scss" scoped>
.avatar {
  // border: 1px solid rgba(0, 0, 0, .1);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);
}
.profile-show {
  .profile-main {
    margin-top: 7px;
    .name {
      font-weight: bold;
      font-size: 18px;
    }

    .signature {
      margin-top: 5px;
    }

    .button-group-logined,.button-group-unlogin {
      margin-top: 10px;
    }
  }
}
</style>
