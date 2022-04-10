<template>
    <el-aside :width="asideWidth">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
                class="el-menu-vertical-demo"
                router
                :default-active="$route.path"
                :collapse-transition="false"
                :collapse="isCollapse"
                active-text-color="#409EFF"
                @open="handleOpen"
                @close="handleClose">
            <el-menu-item index="article">
                <i class="el-icon-edit"></i>
                <span slot="title">论文成就</span>
            </el-menu-item>
            <el-menu-item index="report">
                <i class="el-icon-menu"></i>
                <span slot="title">动态报表</span>
            </el-menu-item>
            <el-menu-item index="resume">
                <i class="el-icon-discount"></i>
                <span slot="title">主页生成</span>
            </el-menu-item>
            <el-menu-item index="profile">
                <i class="el-icon-user"></i>
                <span slot="title">个人信息</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "Aside",
        data() {
            return {
                isCollapse: false,
                asideWidth: '130px',
            };
        },
        methods: {
            toggleCollapse() {
                this.isCollapse = !this.isCollapse;
                this.asideWidth = this.isCollapse ? "64px" : "130px";
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
    }
</script>

<style lang="less" scoped>
    .el-aside {
        overflow: hidden;

        .el-menu-vertical-demo {
            margin-left: 10px;
            min-height: 600px;

            &:not(.el-menu--collapse) {
                width: 160px;
            }
        }

        .toggle-button {
            margin-top: 5px;
            background-color: rgba(49, 49, 54, 0.15);
            color: white;
            font-size: 10px;
            text-align: center;
            line-height: 24px;
            letter-spacing: 0.2em;
            cursor: pointer;
        }
    }
</style>
