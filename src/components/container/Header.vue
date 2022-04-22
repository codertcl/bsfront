<template>
    <el-header>
        <div class="header-content">
            <img class="header-logo" src="../../assets/images/logo.gif" alt="">
            <span class="action">
                <el-tooltip placement="top" content="个人资料">
                    <!-- 不添加/ 路径前面才会嵌套/home -->
                    <img :src="avatar" class="avatar" @click="$router.push('profile')" alt="个人头像">
                </el-tooltip>
                <el-tooltip placement="top" content="刷新">
                    <i class="el-icon-refresh refresh" @click="refreshArticleInfo"></i>
                </el-tooltip>
                <el-tooltip placement="top" content="退出">
                    <i class="iconfont bs-tuichu" @click="logOut"></i>
                </el-tooltip>
            </span>
        </div>
    </el-header>
</template>

<script>
    import {getItem} from "../../utils/storage";
    import {eventBus} from '../../utils/event-bus'
    import lodash from 'lodash'

    export default {
        name: "Header",
        data() {
            return {
                avatar: null,
            }
        },
        created() {
            this.avatar = getItem('user').avatar_url
        },
        methods: {
            refreshArticleInfo:
                lodash.throttle(function () {
                    if (this.$route.name === 'article') {
                        eventBus.$emit('refreshArticleInfo')
                    } else if (this.$route.name === 'report') {
                        eventBus.$emit('refreshReportInfo')
                    } else {
                        eventBus.$emit('refreshResumeInfo')
                    }
                }, 5000),
            logOut() {
                this.$store.commit('removeToken')
                this.$store.commit('removeUser')
                this.$router.replace('/login')
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-header {
        width: 100%;
        height: 60px;
        padding: 0;
        background-color: #ffffff;
        overflow: hidden;

        .header-content {
            position: relative;

            .header-logo {
                position: absolute;
                left: 30px;
                height: 60px;
            }

            .action {
                position: absolute;
                right: 30px;
                height: 60px;
                line-height: 60px;
                font-size: 30px;

                .avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 15px;

                    &:hover {
                        opacity: 0.8;
                    }
                }

                .el-icon-edit {
                    margin-left: 40px;
                    background-color: orangered;
                    color: white;
                    border-radius: 15px;

                    &:hover {
                        background-color: rgb(170, 58, 20);
                    }
                }


                .bs-tuichu {
                    font-size: 30px !important;
                    margin-left: 40px;
                    border-radius: 15px;
                    background-color: rgba(229, 230, 235, 0.32);

                    &:hover {
                        background-color: rgb(211, 211, 213);
                    }
                }

                .refresh {
                    font-size: 30px !important;
                    margin-left: 40px;
                    border-radius: 15px;
                    background-color: rgba(229, 230, 235, 0.32);

                    &:hover {
                        background-color: rgb(211, 211, 213);
                    }
                }
            }
        }
    }
</style>
