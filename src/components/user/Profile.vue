<template>
    <div class="Profile">
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 基本信息</span>
                <el-form :model="profileForm" ref="profileForm"
                         label-width="80px"
                         :rules="rules" class="form">
                    <el-form-item prop="username" class="input" label="用户名">
                        <el-input v-model="profileForm.username"
                                  clearable
                                  mminlength="2"
                                  maxlength="10"
                                  show-word-limit
                                  prefix-icon="iconfont bs-yonghuming">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="name" class="input" label="中文名">
                        <el-input v-model="profileForm.name"
                                  clearable
                                  minlength="2"
                                  maxlength="5"
                                  show-word-limit
                                  prefix-icon="iconfont bs-zhongwenmingcheng">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="phone" class="input" label="电话">
                        <el-input v-model="profileForm.phone"
                                  clearable
                                  minlength="5"
                                  maxlength="11"
                                  show-word-limit
                                  prefix-icon="iconfont bs-dianhua">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="email" class="input" label="邮箱">
                        <el-input v-model="profileForm.email"
                                  clearable
                                  minlength="5"
                                  maxlength=19
                                  show-word-limit
                                  prefix-icon="iconfont bs-youxiang">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="age" label="年龄">
                        <el-input v-model="profileForm.age"
                                  prefix-icon="iconfont bs-nianling"
                                  min="20"
                                  max="100"
                                  type="number">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="professor" label="职称">
                        <el-select v-model="profileForm.professor" prefix-icon="iconfont bs-youbian" clearable
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in professorOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="age" label="邮编">
                        <el-input v-model="profileForm.zip_code" prefix-icon="iconfont bs-youbian" type="text">
                        </el-input>
                    </el-form-item>
                    <el-form-item class="button action-button">
                        <el-button type="primary" @click="updateProfile('profileForm')">提交</el-button>
                        <el-button type="info" @click="cancel('profileForm')">取消</el-button>
                    </el-form-item>
                </el-form>
                <div class="user-avatar">
                    <img alt="用户头像" :src="profileForm.avatar_url || DEFAULT_AVATAR">
                    <input type="file" @change="fileChanged" ref="file"
                           accept="image/jpg,image/jpeg,image/png,image/bmp">
                    <div class="operation-box">
                        <button @click="add">选择图片</button>
                    </div>
                </div>

            </el-tab-pane>
            <el-tab-pane label="密码管理">
                <span slot="label"><i class="iconfont bs-mima"></i>密码管理</span>
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
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {getItem} from "../../utils/storage";
    import {getClient} from "../../utils/alioss";
    import {DEFAULT_AVATAR} from '../../utils/const'
    import {md5password} from '../../utils/password-handle'

    export default {
        name: "Profile",
        data() {
            return {
                profileForm: null,
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
                rules: {
                    // name: [
                    //     {required: true, message: '请输入用户名', trigger: 'blur'},
                    //     {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                    // ],
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
                    // birthday: [
                    //     {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    // ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                },
                avatar_file: null,
                avatar_file64: null,
                client: null,
                isAvatarChange: false,
                DEFAULT_AVATAR: DEFAULT_AVATAR,
                firstPassword: '',//用户输入的第一次输入的新密码
                secondPassword: '',//用户输入的第二次输入的新密码
                isUpdatePasswordBoxShow: false,//更改密码输入框是否展示
                professorOptions: [{
                    value: '教授',
                    label: '教授'
                }, {
                    value: '副教授',
                    label: '副教授'
                }, {
                    value: '讲师',
                    label: '讲师'
                }],
            };
        },
        created() {
            this.profileForm = getItem('user') || this.$store.state.user
            this.client = getClient()
        },
        methods: {
            updateProfile(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.isAvatarChange) {
                            await this.updateAvatar()
                        }
                        const res = await this.$http.post(`/${this.profileForm.id}/updateUserInfo`, this.profileForm)
                        if (res.data.status !== 200) {
                            return this.$message.error(res.data.message)
                        }
                        //更新vuex和sessionStorage中的用户信息
                        this.$store.commit('setUser', this.profileForm)
                        this.$message.success('用户信息更新成功')
                    } else {
                        this.$message.error('请检查修改的信息');
                        return false;
                    }
                    this.isAvatarChange = false
                });
            },
            add() {
                //调用上传文件框的点击事件 打开文件夹选择图片
                this.$refs.file.click()
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //判断是否是图片且大小不超过10MB
            fileChanged() {
                this.isAvatarChange = true
                this.avatar_file = this.$refs.file.files[0]
                this.avatar_file64 = {
                    name: this.avatar_file.name,
                    size: this.avatar_file.size,
                    file: this.avatar_file
                }
                const isLt10M = this.avatar_file.size / 1024 / 1024 < 10;
                if (!isLt10M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                    return isLt10M
                }
                this.html5Reader()
                this.$refs.file.value = ''
                return isLt10M;
            },
            //上传图片到阿里云OSS
            async updateAvatar() {
                const filepath = `bs/avatar/${this.profileForm.id}/${this.avatar_file.name}`  //图片存储路径
                await this.client.multipartUpload(filepath, this.avatar_file64.file)
                this.profileForm.avatar_url = `http://serverresource.oss-cn-hangzhou.aliyuncs.com/${filepath}`
                this.$store.commit('setUser', this.profileForm)
            },
            // 将图片文件转成BASE64格式
            html5Reader() {
                const reader = new FileReader()
                reader.onload = (e) => {
                    //为当前选择的图片item 添加src属性 值为BASE64格式
                    this.$set(this.avatar_file64, 'src', e.target.result)
                }
                //readAsDataURL 方法会读取指定的 Blob 或 File 对象。读取操作完成的时候
                // readyState 会变成已完成DONE，并触发 loadend事件
                // 同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。
                reader.readAsDataURL(this.avatar_file)
            },
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
                            //更新data和vuex sessionLocalstorage中的用户信息
                            this.profileForm.password = md5password(this.firstPassword)
                            this.$store.commit('setUser', this.profileForm)
                            this.isUpdatePasswordBoxShow = false
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
                this.firstPassword = ''
                this.secondPassword = ''
                this.updateProfileForm.password = ''
            },
            //获取用户信息
            // async getProfile() {
            //     const res = await this.$http.get(`/api/${this.profileForm.id}/userInfo`)
            //     this.profileForm = res.data.info[0]
            //     console.log( this.profileForm)
            //     let that=this
            //     setTimeout(function () {
            //         // that.profileForm.avatar_url = `http://serverresource.oss-cn-hangzhou.aliyuncs.com/share/images/avatar/${that.profileForm.id}/${that.avatar_file.name}`
            //         that.$store.commit('setUser', that.profileForm)
            //         that.$store.state.user = that.profileForm
            //     },100)
            //     console.log(this.profileForm)
            // }
        }
    }
</script>

<style lang="less" scoped>
    /deep/ .el-icon-date:before {
        margin-left: -3px;
    }

    .bs-tongxingbie:before {
        margin: 0 7px;
        color: #cdcdcd;
    }

    /deep/ .el-input {
        width: 300px !important;
    }

    .el-tabs {
        .el-tabs__content {
            width: 830px;

            .el-tab-pane /deep/ .el-form-item {
                margin-bottom: 18px;
            }

            .action-button {
                margin-left: 55px;
            }

            .user-avatar {
                position: absolute;
                top: 125px;
                left: 450px;
                width: 150px;
                height: 175px;
                border-radius: 10%;
                background-color: rgb(245, 245, 245);

                img {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    margin-left: 10px;
                    margin-top: 10px;
                }

                /deep/ .el-button {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: 125px;
                }

                .operation-box {
                    position: absolute;
                    top: 135px;
                    left: 30px;

                    button {
                        width: 80px;
                        height: 30px;
                        padding: 4px 12px;
                        color: #fff;
                        background: #007ACC;
                        border: none;
                        border-radius: 2px;
                        cursor: pointer;
                    }
                }

                input[type="file"] {
                    display: none;
                }
            }


            .first-password, .second-password {
                width: 400px;

                .title {
                    font-size: 14px;
                    color: #606266;
                    /*line-height: 40px;*/
                }
            }
        }
    }


</style>
