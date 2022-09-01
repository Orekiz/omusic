<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const isLogined = userStore.isLogined
const nickname = userStore.nickname
</script>

<template>
<div class="profile">
  <el-popover
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
  >
    <template #reference>
      <el-avatar class="avatar" :icon="UserFilled" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </template>
    <template #default>
      <div class="profile-show">
        <div class="avatar-container">
          <el-avatar class="avatar" size="large" :icon="UserFilled" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </div>
        <div class="profile-main">
          <p class="name">{{ nickname }}</p>
          <p v-if="isLogined" class="signature">signature</p>
          <section v-if="isLogined" class="button-group-logined">
            <button>退出登录</button>
          </section>
          <section v-else class="button-group-unlogin">
            <button>登录</button>
          </section>
        </div>
      </div>
    </template>
  </el-popover>
</div>
</template>

<style lang="scss" scoped>
.avatar {
  border: 1px solid rgba(0, 0, 0, .1);
}
.profile-show {
  .profile-main {
    margin-top: 7px;
    .name {
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
