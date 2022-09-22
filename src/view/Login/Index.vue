<script lang="ts" setup>
import { Lock, Phone, Message } from '@element-plus/icons-vue'
import { ref } from 'vue'
const loginMethod = ref('phone')
const phone = ref('')
const password = ref('')
const goLoginEmail = () => {
    loginMethod.value = 'email'
}
const goLoginPhone = () => {
    loginMethod.value = 'phone'
}
const goLoginQrcode = () => {
    loginMethod.value = 'qrcode'
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
                <div class="input-field">
                    <el-input
                    v-model="password"
                    type="password"
                    size="large"
                    placeholder="密码"
                    :prefix-icon="Lock" />
                </div>
                <section class="input-field use-code">
                    <el-button>
                        发送验证码登录
                    </el-button>
                </section>
                <div class="input-field">
                    <el-button type="primary" size="large">登录</el-button>
                </div>
                <section class="other-login">
                    <el-button type="primary" text @click="goLoginQrcode">二维码登录</el-button>
                    |
                    <i> </i>
                    <el-button type="primary" text @click="goLoginEmail">&nbsp; 邮箱登录 &nbsp;</el-button>
                </section>
            </section>
            <section v-show="loginMethod === 'email'">
                <div class="input-field">
                    <el-input
                    v-model="phone"
                    size="large"
                    placeholder="邮箱"
                    :prefix-icon="Message" />
                </div>
                <div class="input-field">
                    <el-input
                    v-model="password"
                    type="password"
                    size="large"
                    placeholder="密码"
                    :prefix-icon="Lock" />
                </div>
                <div class="input-field">
                    <el-button type="primary" size="large">登录</el-button>
                </div>
                <section class="other-login">
                    <el-button type="primary" text @click="goLoginQrcode">二维码登录</el-button>
                    |
                    <i> </i>
                    <el-button type="primary" text @click="goLoginPhone">手机号登陆</el-button>
                </section>
            </section>
            <section v-show="loginMethod === 'qrcode'">
                <div class="input-field">
                    <el-button type="primary" size="large">登录</el-button>
                </div>
                <section class="other-login">
                    <el-button type="primary" text @click="goLoginPhone">手机号登录</el-button>
                    |
                    <i> </i>
                    <el-button type="primary" text @click="goLoginEmail">&nbsp; 邮箱登录 &nbsp;</el-button>
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
            }

            .use-code {

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