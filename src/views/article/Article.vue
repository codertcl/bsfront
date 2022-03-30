<template>
    <el-table
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
                width="280">
        </el-table-column>
        <el-table-column
                prop="authors"
                align="center"
                label="所有作者"
                width="280">
        </el-table-column>
        <el-table-column
                prop="author"
                align="center"
                label="作者"
                width="110">
        </el-table-column>
        <el-table-column
                prop="type"
                align="center"
                label="类型"
                width="250"
                sortable
                :filters="[{ text: '会议', value: 'Conference and Workshop Papers' },
                 { text: '期刊', value: 'Journal Articles' },
                 { text: '书籍', value: 'Books and Theses' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag :type="scope.row.type === 'Conference and Workshop Papers' ?'primary'
                :(scope.row.type === 'Journal Articles'?'success':'warning') "
                        disable-transitions>{{scope.row.type}}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column
                prop="key"
                align="center"
                label="索引"
                width="200">
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
        <el-table-column
                prop="year"
                sortable
                align="center"
                label="年份"
                width="80">
        </el-table-column>
        <el-table-column
                prop="venue"
                align="center"
                label="发表位置"
                width="100">
        </el-table-column>
        <el-table-column
                prop="volume"
                align="center"
                label="卷号"
                width="50">
        </el-table-column>
        <el-table-column
                prop="pages"
                align="center"
                label="页号"
                width="80">
        </el-table-column>
    </el-table>
</template>

<script>
    import {getItem} from "../../utils/storage";

    export default {
        name: "Article",
        data() {
            return {
                profileForm: {},//用户数据
                articleInfo: [],//论文数据
                loading: true,//是否正在加载
            }
        },
        created() {
            this.profileForm = getItem('user') || this.$store.state.user
            this.getArticleInfo(this.profileForm.username)
        },
        watch: {
            articleInfo: {
                handler(val, newVal) {
                    this.loading = !this.loading
                }
            }
        },
        methods: {
            async getArticleInfo(username) {
                const res = await this.$http.get(`${username}/getArticleInfo`)
                if (res.data.status === 200) {
                    this.articleInfo = res.data.info
                } else {
                    this.$message.error(res.data.message)
                }
                console.log(res)
            },
            filterTag(value, row) {
                return row.type === value;
            },
        }
    }
</script>

<style scoped lang="less">
    .el-main {
        /deep/ .el-table {
        }
    }
</style>
