<template>
    <div class="home">
        <el-container>
            <Header></Header>
            <el-container class="content-container">
                <Aside></Aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Header from '../../components/container/Header'
    import Main from '../../components/container/Main'
    import Aside from '../../components/container/Aside'
    // import WriteMoment from "../../components/moment/WriteMoment";

    export default {
        name: 'Home',
        data() {
            return {};
        },
        components: {
            Header,
            Main,
            Aside,
            // WriteMoment
        },
        methods: {},
    }
</script>

<style lang="less" scoped>
    .home {
        background-color: rgb(245, 245, 245);
        height: 100%;
        width: 100%;
        position: fixed;

        .content-container {
            width: 100%;
            position: fixed;
            margin-top: 60px;
            height: 100%;//内容完全显示
        }

        /deep/ .el-aside .el-menu-vertical-demo {
            margin-left: 0;
        }

        /deep/ .el-main{
            overflow: scroll!important;
            padding: 5px;
        }
    }
</style>
