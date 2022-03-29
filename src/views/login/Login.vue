<template>
    <div class="login">
        <div class="login-container">
            <p class="login-title">登录</p>
            <el-form :model="loginForm" ref="loginForm" :rules="rules" class="form">
                <el-form-item prop="username" class="input">
                    <el-input v-model="loginForm.username" clearable
                              mminlength="2"
                              maxlength="20"
                              show-word-limit
                              prefix-icon="iconfont bs-yonghuming">
                    </el-input>
                </el-form-item>
                <el-form-item class="input" prop="password">
                    <el-input v-model="loginForm.password" clearable prefix-icon="iconfont bs-mima"
                              show-password
                              type="password"></el-input>
                </el-form-item>
                <el-form-item class="button">
                    <el-button type="primary" @click="loginSubmit">登录</el-button>
                    <el-button type="info" @click="cancel('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <p>还没有系统账号？<a :href="registerUrl">立即注册!</a></p>
        </div>
    </div>
</template>

<script>
    import lodash from 'lodash'

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 2,
                            max: 20,
                            message: '长度在 2 到 20 个字符',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        {
                            min: 2,
                            max: 10,
                            message: '长度在 2 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        computed: {
            registerUrl() {
                return window.location.href.replace('login', 'register')
            }
        },
        methods: {
            loginSubmit:
                lodash.throttle(function () {
                    this.$refs.loginForm.validate(async (valid) => {
                        if (valid) {
                            const res = await this.$http.post('/login', this.loginForm)
                            // console.log(res)
                            if (res.data.status === 200) {
                                this.$message.success('登录成功')
                                //  将登录成功的token和用户信息保存客户端的sessionStorage和vuex的State中中
                                // console.log(res.data)
                                this.$store.commit('setToken', res.data.token)
                                this.$store.commit('setUser', res.data.info)
                                await this.$router.push('/home')
                            } else {
                                this.$message.error(res.data.message || '登录失败')
                            }
                        } else {
                            this.$message.error('登录失败')
                        }
                    })
                }, 1000),
            cancel(formName) {
                this.$nextTick(() => {
                    this.$refs[formName].resetFields()
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .login {
        width: 100%;
        height: 100%;
        /*父元素app对应div高度为0 子元素login div必须脱离文档流*/
        position: absolute;
        background: url("../../assets/images/background.png") no-repeat fixed center;
        background-size: 100% 100%;

        .login-container {
            position: absolute;
            height: 60%;
            width: 500px;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            border-radius: 10px;
            box-shadow: -10px -10px 30px #ebebeb;
            background: linear-gradient(145deg, hsla(0, 0%, 100%, .6), hsla(0, 0%, 100%, .6));

            .login-title {
                font-size: 20px;
                height: 70px;
                line-height: 70px;
                text-align: center;
            }

            .el-form-item {
                margin: 30px;

                &:nth-child(1) {
                    margin-top: 0;
                }

                .el-button {
                    margin-left: 95px
                }
            }
        }

        p:nth-last-child(1) {
            font-size: 15px;
            text-align: center;

            a {
                color: #ff6600;
            }
        }
    }
</style>
