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
                prop="year"
                sortable
                align="center"
                label="年份"
                column-key="year"
                :filters="yearRange"
                :filter-method="filterHandler"
                width="100">
        </el-table-column>
        <el-table-column
                prop="type"
                align="center"
                label="类型"
                width="250"
                sortable
                :filters="[{ text: 'Conference and Workshop Papers', value: 'Conference and Workshop Papers' },
                 { text: 'Journal Articles', value: 'Journal Articles' },
                 { text: 'Editorship', value: 'Editorship' },
                 { text: 'Books and Theses', value: 'Books and Theses' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag :type="scope.row.type === 'Conference and Workshop Papers' ?'primary'
                :(scope.row.type === 'Journal Articles'?'success':(scope.row.type ==='Editorship'? 'warning':'danger')) "
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
                prop="venue"
                align="center"
                label="发表位置"
                width="200">
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
        computed: {
            //论文按照年份来筛选 近十年
            yearRange() {
                let res = [], currentDate = new Date()
                for (let i = currentDate.getFullYear() - 10; i <= currentDate.getFullYear(); i++) {
                    res.push({text: i+'', value: i+''})
                }
                return res
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
            //TODO 同名作者无法获取论文数据
            //TODO 第一次调用getArticleInfo方法时无法获取到 进入其他页面再返回才行
            async getArticleInfo(username) {
                //2s内未获取到作者数据重复执行该函数
                // this.isGetArticleInfo(username)
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
            //2s内未获取到作者数据重复执行该函数
            isGetArticleInfo(username) {
                let that = this
                setTimeout(() => {
                    if (!this.articleInfo.length) {
                        that.getArticleInfo(username)
                    }
                }, 2000)
            },
            //年份筛选
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
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
