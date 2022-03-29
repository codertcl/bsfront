<template>
    <div class="register">
        <div class="register-container">
            <p class="register-title">注册</p>
            <el-form :model="registerForm" ref="registerForm" :rules="rules" class="form">
                <el-form-item prop="username" class="input">
                    <el-input v-model="registerForm.username"
                              clearable
                              mminlength="2"
                              maxlength="20"
                              show-word-limit
                              prefix-icon="iconfont bs-yonghuming">
                    </el-input>
                </el-form-item>
                <el-form-item class="input" prop="password">
                    <el-input v-model="registerForm.password" clearable prefix-icon="iconfont bs-mima"
                              show-password
                              type="password"></el-input>
                </el-form-item>
                <el-form-item class="button">
                    <el-button type="primary" @click="registerSubmit">注册</el-button>
                    <el-button type="info" @click="cancel('registerForm')">取消</el-button>
                </el-form-item>
            </el-form>
            <p>已有账号？<a :href="loginUrl">立即登录!</a></p>
        </div>
    </div>
</template>

<script>
    import lodash from "lodash";

    export default {
        name: "Register",
        data() {
            return {
                registerForm: {
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
                },
            }
        },
        computed: {
            loginUrl() {
                return window.location.href.replace('register', 'login')
            },
        },
        methods: {
            registerSubmit:
                lodash.throttle(async function () {
                    this.$refs['registerForm'].validate(async (valid) => {
                        if (valid) {
                            const res = await this.$http.post('/register', this.registerForm)
                            if (res.data.status === 200) {
                                this.$message.success(res.data.message)
                                await this.$router.push('/login')
                            } else {
                                this.$message.error(res.data.message || '注册失败')
                            }
                        } else {
                            this.$message.error('注册失败')
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
    .register {
        width: 100%;
        height: 100%;
        /*父元素app对应div高度为0 子元素register div必须脱离文档流*/
        position: absolute;
        background: url("../../assets/images/background.png") no-repeat fixed center;
        background-size: 100% 100%;

        .register-container {
            position: absolute;
            height: 95%;
            width: 500px;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            border-radius: 10px;
            box-shadow: -10px -10px 30px #ebebeb;
            background: linear-gradient(145deg, hsla(0, 0%, 100%, .6), hsla(0, 0%, 100%, .6));

            .register-title {
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

            p:nth-last-child(1) {
                font-size: 15px;
                text-align: center;

                a {
                    color: #ff6600;
                }
            }
        }
    }
</style>
