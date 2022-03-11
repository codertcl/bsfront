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
                 v-for="item in educationForm.education_experience">
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

        <el-form-item prop="articles"
                      class="articles"
                      label="发表论文">

            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        label="日期"
                        width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="姓名"
                        width="180">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>姓名: {{ scope.row.name }}</p>
                            <p>住址: {{ scope.row.address }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.name }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" round size="medium" @click="updateEducationInfo('educationForm')">确定</el-button>
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
                ],
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }],
                articles: [
                    {},
                ]
            }
        },
        props: {
            profileForm: {
                type: Object,
                default: () => ({})
            }
        },
        // TODO

        /** TODO */

        /**
         * TODO
         */
        // TODO 离开本页面后 修改后未保存的数据 没有恢复为修改前的状态
        created() {
            this.educationForm = this.profileForm
            this.educationForm.education_experience = eval("(" + this.educationForm.education_experience + ")");
            this.educationForm.research_fields = eval("(" + this.educationForm.research_fields + ")");
        },
        methods: {
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
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
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
