<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import { Lock, Phone, Message } from '@element-plus/icons-vue'
import { loginHooks } from '@/api'
import { clearMusicA, setQrLogined } from '@/utils'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
const router = useRouter()
const userStore = useUserStore()

const loginMethod = ref('qrcode')
const phone = ref('')
const phonePassword = ref('')
const isCaptcha = ref(false)
const phoneCaptcha = ref('')
const loginPhoneBtnLoading = ref(false)

const email = ref('')
const emailPassword = ref('')
const qrImg = ref('')

const toggleIsCaptcha = () => {
  isCaptcha.value = !isCaptcha.value
  phonePassword.value = ''
  phoneCaptcha.value = ''
}
const { loginPhone, sentCaptcha, qrKey, qrCreate, qrCheck } = loginHooks()
const useLoginEmail = () => {
  loginMethod.value = 'email'
  clearInterval(checkLoginQrTimer)
  loginQrFlag.value = false
}
const useLoginPhone = () => {
  loginMethod.value = 'phone'
  clearInterval(checkLoginQrTimer)
  loginQrFlag.value = false
}
const useLoginQrcode = () => {
  loginMethod.value = 'qrcode'
  loginQr()
}

const loginSuccess = () => {
  clearMusicA()
  userStore.setLogined()
  ElMessage.success('登陆成功，即将跳转至首页')
  const goIndexTimer = setTimeout(() => {
    router.push('/')
    clearTimeout(goIndexTimer)
  }, 1500)
}

onMounted(() => {
  loginQr()
  ElNotification({
    title: '提示',
    message: '由于网易的原因：手机号和邮箱登录暂时大概率无法使用，建议使用扫描二维码登录'
  })
})

onBeforeUnmount(() => {
  clearInterval(checkLoginQrTimer)
})

let checkLoginQrTimer: any

const loginQrFlag = ref(false)
const loginQr = async () => {
  if (!loginQrFlag.value) {
    loginQrFlag.value = true
    qrImg.value = 'https://cdn.dribbble.com/users/924068/screenshots/3757746/media/efe4827f5165339fbbfdcdc7f9918314.gif'
    const { data: { unikey: key } } = await qrKey()
    const { data: { qrimg } } = await qrCreate(key)
    qrImg.value = qrimg
    checkLoginQrTimer = setInterval(() => {
      qrCheck(key).catch(res => {
        // code800 二维码过期
        // code801 等待扫码
        // code802 授权中……
        // code803 登陆成功
        switch (res.code) {
          case 800:
            clearInterval(checkLoginQrTimer)
            loginQrFlag.value = false
            useLoginQrcode()
            ElMessage.warning('二维码已过期 正在刷新二维码……')
            break
          case 803:
            clearInterval(checkLoginQrTimer)
            loginSuccess()
            // 由于扫码登录后传给前台的cookie 'MUSIC_U' 带有属性httponly 无法被js查询到，所以需要额外添加一个cookie
            setQrLogined()
            break
        }
      })
    }, 1500)
  }
}
// login
const loginPhoneHandler = () => {
  let data = { phone: phone.value.trim(), password: phonePassword.value.trim(), captcha: phoneCaptcha.value.trim() }
  // validate
  if (!((data.phone && data.password) || (data.phone && data.captcha))) {
    ElMessage.error('手机号或密码（验证码）为空')
    return false
  }
  if (data.phone.length !== 11 || isNaN(Number(data.phone))) {
    ElMessage.error('请输入正确的手机号')
    return false
  }
  if (isNaN(Number(data.captcha))) {
    ElMessage.error('验证码格式不正确')
    return false
  }
  // debounce
  loginPhoneBtnLoading.value = true
  // login fetch
  loginPhone(data).then(res => {
    loginSuccess()
  }).catch(err => {
    ElMessage.error(err.msg ?? err.message ?? '登录失败请重试')
    loginPhoneBtnLoading.value = false
  })
}

// login captcha
const captchaBtnLoading = ref(false)
const captchaBtnDisabled = ref(false)
const _captchaBtnTimer = ref(30)
const captchaBtnTimer = computed(() => {
  return captchaBtnDisabled.value ? _captchaBtnTimer.value + ' ' : ''
})
const sentCaptchaHandler = () => {
  if (!phone.value || phone.value.length !== 11) {
    ElMessage.error('请输入正确的手机号')
    return false
  }
  captchaBtnLoading.value = true
  captchaBtnDisabled.value = true
  // debounce
  let timer = setInterval(() => {
    _captchaBtnTimer.value--
    if (_captchaBtnTimer.value === 0) {
      captchaBtnDisabled.value = false
      _captchaBtnTimer.value = 30
      clearInterval(timer)
    }
  }, 1000)
  // api fetch
  sentCaptcha(phone.value).then(res => {
    ElMessage.success('验证码发送成功！')
    captchaBtnLoading.value = false
  }).catch(err => {
    ElMessage(err.msg ?? err.message ?? '发送验证码失败请稍后重试')
    captchaBtnLoading.value = false
  })
}
</script>

<template>
  <section class="login-wrap">
    <div class="login-container">
      <h2>登录网易云音乐账号</h2>
      <section v-show="loginMethod === 'phone'">
        <div class="input-field">
          <el-input v-model="phone" size="large" placeholder="手机号" :prefix-icon="Phone">
            <template #prepend>+86</template>
          </el-input>
        </div>
        <div v-if="!isCaptcha" class="input-field">
          <el-input v-model="phonePassword" type="password" size="large" placeholder="密码" :prefix-icon="Lock" />
        </div>
        <div v-else class="input-field captcha">
          <el-input v-model="phoneCaptcha" type="text" size="large" placeholder="验证码" :prefix-icon="Lock" />
          <el-button
            size="large"
            @click="sentCaptchaHandler"
            :disabled="captchaBtnDisabled"
            :loading="captchaBtnLoading">
              {{ captchaBtnTimer }}发送验证码
          </el-button>
        </div>
        <section class="input-field">
          <el-button v-if="!isCaptcha" @click="toggleIsCaptcha">
            使用验证码登录
          </el-button>
          <el-button v-else @click="toggleIsCaptcha">
            使用密码登录
          </el-button>
        </section>
        <div class="input-field">
          <el-button type="primary" size="large" @click="loginPhoneHandler" :loading="loginPhoneBtnLoading">登录
          </el-button>
        </div>
        <section class="other-login">
          <el-button type="primary" text @click="useLoginQrcode">二维码登录</el-button>
          |
          <i></i>
          <el-button type="primary" text @click="useLoginEmail">&nbsp; 邮箱登录 &nbsp;</el-button>
        </section>
      </section>
      <section v-show="loginMethod === 'email'">
        <div class="input-field">
          <el-input v-model="email" size="large" placeholder="网易邮箱" :prefix-icon="Message" />
        </div>
        <div class="input-field">
          <el-input v-model="emailPassword" type="password" size="large" placeholder="密码" :prefix-icon="Lock" />
        </div>
        <div class="input-field">
          <el-button type="primary" size="large">登录</el-button>
        </div>
        <section class="other-login">
          <el-button type="primary" text @click="useLoginQrcode">二维码登录</el-button>
          |
          <i> </i>
          <el-button type="primary" text @click="useLoginPhone">手机号登陆</el-button>
        </section>
      </section>
      <section v-show="loginMethod === 'qrcode'">
        <div class="qr-field">
          <img style="width:180px;height:180px" :src="qrImg" alt="">
        </div>
        <div class="tip-field">
          <span>TIP: 请使用手机版网易云音乐APP扫码登录</span>
        </div>
        <section class="other-login">
          <el-button type="primary" text @click="useLoginPhone">手机号登录</el-button>
          |
          <i> </i>
          <el-button type="primary" text @click="useLoginEmail">&nbsp; 邮箱登录 &nbsp;</el-button>
        </section>
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@media screen {
  .login-wrap {
    width: 100%;
    height: 100%;

    .login-container {
      width: 350px;
      margin: 200px auto;
      text-align: center;

      h2 {
        margin-bottom: 30px;
      }

      .input-field {
        margin-top: 20px;
        text-align: left;

        button.el-button {
          width: 100%;
        }

        &.captcha {
          display: flex;

          button.el-button {
            width: auto;
            margin-left: 5px;
          }
        }
      }

      .qr-field {
        width: 180px;
        height: 180px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: var(--el-border-radius-base);
        overflow: hidden;
      }

      .other-login {
        margin-top: 20px;
      }

      .tip-field {
        margin-top: 20px;
        font-size: 12px;
        color: var(--el-color-info);
      }
    }
  }

  // 移动端
  @media (max-width: 768px) {
    .login-wrap {
      .login-container {
        max-width: 100%;
        margin: 10vw auto;
      }
    }
  }
}
</style>