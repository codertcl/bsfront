<template>
    <el-form :model="updateProfileForm" ref="updateProfileForm" :rules="updateProfileFormRules"
             class="form">
        <el-form-item prop="password" label="请输入原密码">
            <el-input v-model="updateProfileForm.password" clearable prefix-icon="iconfont bs-mima"
                      show-password
                      placeholder="请输入原密码"
                      type="password">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" round size="medium" @click="authPassword">确定</el-button>
        </el-form-item>

        <!--密码更改 -->
        <div class="update-profile-box" :style="{display:isUpdatePasswordBoxShow?'block':'none'}">
            <el-form-item prop="password" label="请输入新密码">
                <el-input v-model="firstPassword" clearable prefix-icon="iconfont bs-mima"
                          show-password
                          placeholder="请输入新密码"
                          label="请输入新密码"
                          type="password">
                </el-input>
            </el-form-item>

            <el-form-item prop="password" label="请重输入密码">
                <el-input v-model="secondPassword" clearable prefix-icon="iconfont bs-mima"
                          show-password
                          placeholder="请重输入密码"
                          type="password">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" round size="medium" @click="updatePassword">确定</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
    import {md5password} from "../../utils/password-handle";

    export default {
        name: "UpdatePassword",
        data() {
            return {
                updateProfileForm: {
                    password: '',
                },
                updateProfileFormRules: {
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
                    ]
                },
                firstPassword: '',//用户输入的第一次输入的新密码
                secondPassword: '',//用户输入的第二次输入的新密码
                isUpdatePasswordBoxShow: false,//更改密码输入框是否展示
            }
        },
        props: {
            profileForm: {
                type: Object,
                default: () => ({})
            }
        },
        methods: {
            //验证原密码是否正确
            authPassword() {
                if (md5password(this.updateProfileForm.password) !== this.profileForm.password) {
                    return this.$message.error('密码验证错误')
                }
                this.$message.success('密码验证成功')
                this.isUpdatePasswordBoxShow = true
            },
            //更新密码事件
            async updatePassword() {
                if (this.firstPassword !== this.secondPassword) {
                    return this.$message.error('两次输入的密码不一致')
                }

                if (md5password(this.firstPassword) === this.profileForm.password) {
                    return this.$message.error('新密码不能和原密码相同')
                }

                this.$confirm('确定修改密码吗?', '修改密码', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(async () => {
                        const res = await this.$http.patch(`/${this.profileForm.id}/updatePassword`, {password: this.firstPassword})
                        console.log(res)
                        if (res.data.status === 200) {
                            this.$message.success(res.data.message)
                            //更新父组件内用户信息
                            this.$emit('update-profile-password', md5password(this.firstPassword))
                            //更新data和vuex sessionLocalstorage中的用户信息
                            this.$store.commit('setUser', this.profileForm)
                            //修改本组件内的profileForm中的密码信息
                            this.profileForm.password = md5password(this.firstPassword)
                            this.isUpdatePasswordBoxShow = false
                            this.firstPassword = ''
                            this.secondPassword = ''
                            this.updateProfileForm.password = ''
                        } else {
                            this.$message.error('密码修改失败')
                        }
                    })
                    .catch(err => {
                        this.$message({
                            type: 'info',
                            message: '取消修改密码'
                        })
                    })
            },
        }
    }
</script>

<style scoped>

</style>
