<template>
    <el-form :model="educationForm" ref="educationForm" :rules="educationFormRules"
             class="form">
        <el-form-item prop="self_introduction"
                      class="self-introduction"
                      label="个人简介">
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10}"
                    maxlength="1000"
                    show-word-limit
                    clearable
                    v-model="educationForm.self_introduction"
                    placeholder="请输入个人简介">
            </el-input>
        </el-form-item>
        <el-form-item prop="research_fields"
                      class="research-tag"
                      label="研究领域">
            <el-tag
                    v-for="tag in educationForm.research_fields"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                {{tag}}
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item prop="academic_duties"
                      class="academic-duties"
                      label="学术兼职">
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10}"
                    maxlength="1000"
                    show-word-limit
                    clearable
                    v-model="educationForm.academic_duties"
                    placeholder="请输入学术兼职信息">
            </el-input>
        </el-form-item>
        <el-form-item prop="prize"
                      class="prize"
                      label="获奖信息">
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10}"
                    maxlength="1000"
                    show-word-limit
                    clearable
                    v-model="educationForm.prize"
                    placeholder="请输入获奖信息">
            </el-input>
        </el-form-item>

        <el-form-item prop="education_experience"
                      class="education-experience"
                      label="教育经历">
            <div class="education-experience-item"
                 v-for="(item,index) in educationForm.education_experience">
                <el-date-picker
                        class="education-time"
                        v-model="item.time"
                        type="monthrange"
                        range-separator="至"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份">
                </el-date-picker>
                <el-input
                        placeholder="请输入内容"
                        prefix-icon="iconfont bs-school"
                        v-model="item.school"
                        class="school">
                </el-input>
                <el-input
                        placeholder="请输入内容"
                        prefix-icon="iconfont bs-major"
                        v-model="item.major"
                        class="major">
                </el-input>

                <el-select
                        v-model="item.type"
                        class="type"
                        clearable
                        placeholder="请选择教育信息">
                    <el-option
                            v-for="item in type"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="warning" size="small" @click="del_education_experience(index)">删除</el-button>
            </div>
        </el-form-item>
        <el-button type="primary" size="small" @click="add_education_experience">添加教育信息</el-button>
        <el-form-item>
            <el-button type="primary" size="medium" @click="updateEducationInfo('educationForm')">确定</el-button>
        </el-form-item>
    </el-form>
</template>


<script>
    export default {
        name: "EducationInfo",
        data() {
            return {
                educationForm: {},
                educationFormRules: {},
                inputVisible: false,
                inputValue: '',
                type: [
                    {
                        value: '学士',
                        label: '学士'
                    },
                    {
                        value: '硕士',
                        label: '硕士'
                    },
                    {
                        value: '博士',
                        label: '博士'
                    },
                    {
                        value: '博士后',
                        label: '博士后'
                    },
                    {
                        value: '访问学者',
                        label: '访问学者'
                    },
                ],
            }
        },
        props: {
            profileForm: {
                type: Object,
                default: () => ({})
            }
        },

        /** TODO
         * 教育经历为空时，没有出现组件以填写教育信息
         * */

        // TODO 离开本页面后 修改后未保存的数据 没有恢复为修改前的状态
        created() {
            this.educationForm = this.profileForm
            this.educationForm.education_experience = eval("(" + this.educationForm.education_experience + ")");
            this.educationForm.research_fields = eval("(" + this.educationForm.research_fields + ")");
            //为空则置为空数组
            if (this.educationForm.research_fields == null) {
                this.educationForm.research_fields = []
            }
            if (this.educationForm.education_experience == null) {
                this.educationForm.education_experience = []
            }
        },
        methods: {
            //更新教育信息
            updateEducationInfo(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await this.$http.patch(`/${this.educationForm.id}/updateProfileEducation`, this.educationForm)
                        if (res.data.status !== 200) {
                            return this.$message.error(res.data.message)
                        }
                        this.profileForm = this.educationForm
                        //更新vuex和sessionStorage中的用户信息
                        this.$store.commit('setUser', this.profileForm)
                        this.$emit('update-profile-education', this.profileForm)
                        this.$message.success('用户教育信息更新成功')
                    } else {
                        this.$message.error('更新失败,请检查修改的信息');
                        return false;
                    }
                });
            },
            handleClose(tag) {
                this.educationForm.research_fields.splice(this.educationForm.research_fields.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.educationForm.research_fields.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            //添加教育经历输入框
            add_education_experience() {
                this.educationForm.education_experience.push(
                    {
                        school: "中国地质大学(武汉)",
                        time: ["1970-11-30T16:00:00.000Z", "1971-07-31T16:00:00.000Z"],
                        major: "计算机科学与技术",
                        type: "学士",
                        icon: "el-icon-school"
                    })
            },
            //删除一个教育信息输入框
            del_education_experience(index) {
                this.educationForm.education_experience.splice(index,1)
            }
        }
    }
</script>

<style scoped lang="less">
    .form {
        .el-textarea {
            width: 50%;
        }

        /deep/ .self_introduction {

        }

        /deep/ .research-tag {
            .el-tag + .el-tag {
                margin-left: 10px;
            }

            .button-new-tag {
                margin-left: 10px;
                height: 32px;
                line-height: 30px;
                padding-top: 0;
                padding-bottom: 0;
            }

            .input-new-tag {
                width: 90px;
                margin-left: 10px;
                vertical-align: bottom;
            }
        }

        /deep/ .education-experience {
            .el-form-item__label {
                text-align: left;
                //加下面两条就行
                float: none; // 取消浮动
                word-break: break-word; // 支持单词截断换行
            }

            &-item {
                margin-bottom: 10px;

                .school, .type, .major {
                    width: 200px;
                    margin-left: 20px;
                }

                .type .el-input {
                    width: 100px
                }
            }

            .el-select{
                width: 120px!important;
            }
        }
    }

</style>
