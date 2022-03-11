<template>
    <el-form :model="educationForm" ref="educationForm" :rules="educationFormRules"
             class="form">
        <el-form-item prop="self_introduction"
                      class="self-introduction"
                      label="个人简介">
            <el-input
                    type="textarea"
                    :rows="2"
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
        <el-form-item prop="academic-duties"
                      class="academic-duties"
                      label="学术兼职">
            <el-input
                    type="textarea"
                    :rows="4"
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
                    :rows="4"
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
                        placeholder="请选择学位信息">
                    <el-option
                            v-for="item in type"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
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
                type: [{
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
                ]
            }
        },
        props: {
            profileForm: {
                type: Object,
                default: () => ({})
            }
        },
        created() {
            this.profileForm.research_fields = this.profileForm.research_fields.split(',')
            this.educationForm = this.profileForm
            this.educationForm.education_experience = [
                {
                    school: '中国地质大学(武汉)',
                    time: [this.dayjs('2002-09').format('YYYY-MM'), this.dayjs('2006-06').format('YYYY-MM')],
                    major: '计算机科学与技术',
                    type: '学士',
                    icon: 'el-icon-school'
                },
                {
                    school: '日本会津大学',
                    timeStart: '2006',
                    timeEnd: '2009',
                    major: '计算机科学与技术',
                    type: '硕士',
                    icon: 'el-icon-school'
                },
                {
                    school: '日本会津大学',
                    timeStart: '2009',
                    timeEnd: '2013',
                    major: '计算机科学与技术',
                    type: '博士',
                    icon: 'el-icon-school'
                },
            ]
        },
        methods: {
            handleClose(tag) {
                this.profileForm.research_fields.splice(this.profileForm.research_fields.indexOf(tag), 1);
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
                    this.profileForm.research_fields.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
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
        }
    }

</style>
