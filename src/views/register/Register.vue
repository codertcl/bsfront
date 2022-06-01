<template>
    <div class="register">
        <!--注册表单-->
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
                    <el-button type="primary" @click="isUsernameDetermined?registerSubmit():getNameInfo()">
                        {{isUsernameDetermined?'注册':'获取用户信息'}}
                    </el-button>
                    <el-button type="info" @click="cancel('registerForm')">取消</el-button>
                </el-form-item>
            </el-form>
            <p>已有账号？<a href="#" @click="$router.push('/login')">立即登录!</a></p>
        </div>

        <!--弹出对话框选择用户-->
        <el-dialog
                title="请选择您要注册的用户"
                :visible.sync="dialogVisible"
                width="50%"
                center>
            <el-select v-model="selectValue" placeholder="请选择">
                <el-option
                        v-for="item in userInfo"
                        :key="item['@id']"
                        :label="item.info.author"
                        :value="item.info.author">
                    <p>{{ item.info.author }}</p>
                    <div class="user-select" v-if="item.info.notes">
                        <p class="tip" v-if="item.info.notes.note" v-for="(ite,index) in item.info.notes.note"
                           :key="ite.text">
                            {{ ite.text }}</p>
                    </div>
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false,isUsernameDetermined=true">确 定</el-button>
            </span>
        </el-dialog>
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
                userInfo: [],//查询到该名字的用户信息
                dialogVisible: false,//用户选择框可见性
                selectValue: '',//下拉框选择结果
                isUsernameDetermined: false,//注册的用户名是否已经确定,更新按钮内容(获取用户信息还是注册)
            }
        },
        watch: {
            //监听下拉选择器的结果，时刻更新注册表单的用户名
            selectValue: {
                handler(val) {
                    this.registerForm.username = val
                }
            },
        },
        methods: {
            //在dblp网站中查询该name的用户信息,手动选择(优化重名情况)
            getNameInfo: lodash.throttle(function () {
                this.$refs['registerForm'].validate(async (valid) => {
                    if (valid) {
                        const res = await this.$http.get('/getNameInfo', {params: this.registerForm})
                        console.log(res)
                        if (res.data.status === 200) {
                            this.userInfo = JSON.parse(res.data.info).result.hits.hit
                            //去除不完全匹配的结果
                            this.userInfo = this.userInfo.filter(item => {
                                return item.info.author.toLowerCase().includes(this.registerForm.username.toLowerCase())
                            })
                            this.dialogVisible = true
                        } else {
                            this.$message.error(res.data.message || '获取用户信息失败')
                        }
                    } else {
                        this.$message.error('请正确填写注册信息')
                    }
                })
            }, 1000),
            //注册用户
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

    /*设置用户提示信息的样式*/
    .el-select-dropdown {
        .el-select-dropdown__list {
            .el-select-dropdown__item {
                /*不设置li高度,让元素撑开*/
                height: unset;

                .user-select {
                    text-indent: 1em;
                    color: #8492a6;
                    font-size: 13px;

                    .tip{
                        height: 34px;
                    }
                }
            }
        }
    }

</style>
