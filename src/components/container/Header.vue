<template>
    <el-header>
        <div class="header-content">
            <img class="header-logo" src="../../assets/images/logo.png" alt="share你的生活">
            <span class="action">
                <el-tooltip placement="top" content="个人资料">
                    <!-- 不添加/ 路径前面才会嵌套/home -->
                    <img :src="avatar" class="avatar" @click="$router.push('profile')">
                </el-tooltip>
                <el-tooltip placement="top" content="发表动态">
                    <i class="el-icon-edit" @click="$router.push('write')"></i>
                </el-tooltip>
                <el-tooltip placement="top" content="退出">
                    <i class="iconfont share-tuichu" @click="logOut"></i>
                </el-tooltip>
            </span>
        </div>
    </el-header>
</template>

<script>
    import {getItem} from "../../utils/storage";

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


                .share-tuichu {
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
