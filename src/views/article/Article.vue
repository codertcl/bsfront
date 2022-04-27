<template>
    <el-table
            class="table"
            ref="filterTable"
            :data="articleInfo"
            height="93%"
            stripe
            border
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(250, 250, 250, 0.8)"
            style="width: 100%">
        <el-table-column
                type="index"
                label="编号"
                align="center"
                fixed
                width="50">
        </el-table-column>
        <el-table-column
                prop="title"
                align="center"
                label="标题"
                fixed
                width="350">
        </el-table-column>
        <el-table-column
                prop="year"
                sortable
                align="center"
                label="发表时间"
                column-key="year"
                :filters="yearRange"
                :filter-method="filterHandler"
                width="130">
        </el-table-column>
        <el-table-column
                prop="authors"
                align="center"
                label="所有作者"
                width="350">
        </el-table-column>
        <el-table-column
                prop="author"
                align="center"
                label="作者"
                width="110">
        </el-table-column>
        <el-table-column
                prop="venue"
                align="center"
                label="期刊名称"
                width="350">
            <template slot-scope="scope">
                {{scope.row.name==='undefined'?scope.row.venue:scope.row.name}}
            </template>
        </el-table-column>
        <el-table-column
                prop="期刊等级"
                align="center"
                label="level"
                width="60">
            <template slot-scope="scope">
                {{scope.row.level==='undefined'?'':scope.row.level}}
            </template>
        </el-table-column>
        <el-table-column
                prop="ISSN"
                align="center"
                label="ISSN"
                width="100">
            <template slot-scope="scope">
                {{scope.row.ISSN==='undefined'?'':scope.row.ISSN}}
            </template>
        </el-table-column>
        <el-table-column
                prop="影响因子"
                align="center"
                label="IF"
                width="80">
            <template slot-scope="scope">
                {{scope.row.IF==='undefined'?'':Number(scope.row.IF).toFixed(3)}}
            </template>
        </el-table-column>
        <el-table-column
                prop="kind"
                align="center"
                label="期刊类型"
                width="100">
            <template slot-scope="scope">
                {{scope.row.kind==='undefined'?'':scope.row.kind}}
            </template>
        </el-table-column>
        <el-table-column
                prop="key"
                align="center"
                label="索引"
                width="200">
        </el-table-column>
        <el-table-column
                prop="pages"
                align="center"
                label="页号"
                width="120">
        </el-table-column>
        <el-table-column
                prop="url"
                align="center"
                label="dblp链接"
                width="200">
        </el-table-column>
        <el-table-column
                prop="ee"
                align="center"
                label="文章链接"
                width="200">
        </el-table-column>
    </el-table>
</template>

<script>
    import {getItem} from "../../utils/storage";
    import {eventBus} from "../../utils/event-bus";
    import store from "../../store";

    export default {
        name: "Article",
        data() {
            return {
                profileForm: {},//用户数据
                articleInfo: [],//论文数据
                loading: true,//是否正在加载
            }
        },
        computed: {
            //论文按照年份来筛选 近十年
            yearRange() {
                let res = [], currentDate = new Date()
                for (let i = currentDate.getFullYear() - 10; i <= currentDate.getFullYear(); i++) {
                    res.push({text: i + '', value: i + ''})
                }
                return res
            }
        },
        created() {
            eventBus.$on('refreshArticleInfo', this.updateArticleInfo)
            this.profileForm = getItem('user') || this.$store.state.user
            this.refreshArticleInfo(this.profileForm.username)
        },
        //取消事件总线监听
        beforeDestroy() {
            eventBus.$off('refreshArticleInfo')
        },
        watch: {
            articleInfo: {
                handler(val, newVal) {
                    this.loading = !this.loading
                }
            }
        },
        methods: {
            updateArticleInfo() {
                this.articleInfo = []
                this.refreshArticleInfo();
            },
            //年份筛选
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            //刷新论文信息
            async refreshArticleInfo() {
                let username = getItem('user').username || store.state.user.username
                const res = await this.$http.post(`/${username}/refreshArticleInfo`)
                if (res.data.status === 200) {
                    this.$message.success(res.data.message)
                    this.$store.commit('articleInfo', res.data.info)
                    this.articleInfo = res.data.info
                } else {
                    this.$message.error(res.data.status)
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .table {
        /*修改数据加载中文字位置居中显示*/

        /deep/ .el-loading-spinner .el-loading-text {
            text-align: center !important;
        }
    }
</style>
