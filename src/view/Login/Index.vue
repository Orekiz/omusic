<script lang="ts" setup>
import { ref } from 'vue'
import { Lock, Phone, Message } from '@element-plus/icons-vue'
import { loginHooks } from '@/api'
import { clearMusicA } from '@/utils'
const loginMethod = ref('phone')
const phone = ref('')
const phonePassword = ref('')
const phoneCaptcha = ref('')
const email = ref('')
const emailPassword = ref('')
const isCaptcha = ref(false)
const toggleIsCaptcha = () => {
    isCaptcha.value = !isCaptcha.value
}
const useLoginEmail = () => {
    loginMethod.value = 'email'
}
const useLoginPhone = () => {
    loginMethod.value = 'phone'
}
const useLoginQrcode = () => {
    loginMethod.value = 'qrcode'
}
// login
const { loginPhone } = loginHooks()
const loginPhoneHandler = () => {
    let data = { phone: phone.value, password: phonePassword.value }
    loginPhone(data).then(res => {
        console.log(res)
        clearMusicA()
    })
}
</script>

<template>
    <section class="login-wrap">
        <div class="login-container">
            <h2>登录网易云音乐账号</h2>
            <section v-show="loginMethod === 'phone'">
                <div class="input-field">
                    <el-input
                    v-model="phone"
                    size="large"
                    placeholder="手机号"
                    :prefix-icon="Phone">    
                            <template #prepend>+86</template>
                    </el-input>
                </div>
                <div v-if="!isCaptcha" class="input-field">
                    <el-input
                    v-model="phonePassword"
                    type="password"
                    size="large"
                    placeholder="密码"
                    :prefix-icon="Lock" />
                </div>
                <div v-else class="input-field captcha">
                    <el-input
                    v-model="phoneCaptcha"
                    type="password"
                    size="large"
                    placeholder="验证码"
                    :prefix-icon="Lock" />
                    <el-button size="large">发送验证码</el-button>
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
                    <el-button type="primary" size="large" @click="loginPhoneHandler">登录</el-button>
                </div>
                <section class="other-login">
                    <el-button type="primary" text @click="useLoginQrcode">二维码登录</el-button>
                    |
                    <i> </i>
                    <el-button type="primary" text @click="useLoginEmail">&nbsp; 邮箱登录 &nbsp;</el-button>
                </section>
            </section>
            <section v-show="loginMethod === 'email'">
                <div class="input-field">
                    <el-input
                    v-model="email"
                    size="large"
                    placeholder="网易邮箱"
                    :prefix-icon="Message" />
                </div>
                <div class="input-field">
                    <el-input
                    v-model="emailPassword"
                    type="password"
                    size="large"
                    placeholder="密码"
                    :prefix-icon="Lock" />
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
                <div class="input-field">
                    <el-button type="primary" size="large">登录</el-button>
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

            .other-login {
                margin-top: 20px;
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