<template>
    <div style="height: 90%">
        <el-table
                class="table"
                ref="filterTable"
                :data="articleInfo"
                height="93%"
                stripe
                border
                :id="tableID"
                v-loading="loading"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(250, 250, 250, 0.8)"
                style="width: 100%">
            <el-table-column
                    type="index"
                    align="center"
                    label="编号"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="title"
                    align="center"
                    label="论文名称"
                    width="350">
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
                    prop="order"
                    align="center"
                    label="本人排名"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="year"
                    sortable
                    align="center"
                    label="年(期)页码"
                    column-key="year"
                    :filters="yearRange"
                    :filter-method="filterHandler"
                    width="200">
                <template slot-scope="scope">
                    {{scope.row.year}}
                    ({{scope.row.number}})
                    {{scope.row.pages}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="key"
                    align="center"
                    label="发表刊物(检索号,刊号,影响因子)"
                    width="480">
                <template slot-scope="scope">
                    {{scope.row.name==='undefined'?scope.row.venue:scope.row.name}}
                    ({{scope.row.key}},{{scope.row.ISSN}},
                    {{+scope.row.IF}})
                </template>
            </el-table-column>
            <el-table-column
                    prop="level"
                    align="center"
                    label="论文级别"
                    width="100">
            </el-table-column>
        </el-table>
        <el-button type="primary"
                   :loading="downloadExcelLoading"
                   icon="el-icon-top-right"
                   size="small"
                   @click="exportFile('xls')">
            导出Excel
        </el-button>
    </div>
</template>

<script>
    import {getItem} from "../../utils/storage";
    import store from "../../store";
    import {eventBus} from "../../utils/event-bus";

    export default {
        name: "Article",
        data() {
            return {
                profileForm: {},//用户数据
                articleInfo: [],//论文数据
                loading: true,//是否正在加载
                tableID: 'report-table',//el-table的ID
                downloadExcelLoading: false,//是否为正在导出excel中
                downloadPdfLoading: false,//是否为正在导出pdf中
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
            eventBus.$on('refreshReportInfo', this.updateReportInfo)
            this.profileForm = getItem('user') || this.$store.state.user
            //每次刷新一次，已经使用了keep-alive进行缓存
            this.refreshReportInfo()
        },
        //取消事件总线监听
        beforeDestroy() {
            eventBus.$off('refreshReportInfo')
        },
        watch: {
            articleInfo: {
                handler(val, newVal) {
                    this.loading = !this.loading
                }
            }
        },
        methods: {
            updateReportInfo() {
                this.articleInfo = []
                this.refreshReportInfo();
            },
            //年份筛选
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            //导出excel
            exportFile(ext) {
                this.downloadExcelLoading = true
                var uri = "data:application/vnd.ms-excel;base64,",
                    template =
                        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                    base64 = function (s) {
                        return window.btoa(unescape(encodeURIComponent(s)));
                    },
                    format = function (s, c) {
                        return s.replace(/{(\w+)}/g, function (m, p) {
                            return c[p];
                        });
                    };

                var table = document.getElementById(this.tableID);

                //console打印出table.innerHTML出则是table的页面代码
                //根据正则表达式，把style='mso-number-format:"\@"' 塞入td中,将数据转成String
                table.innerHTML = table.innerHTML.replace(
                    /<td/g,
                    "<td STYLE='MSO-NUMBER-FORMAT:\\@'"
                );

                var ctx = {
                    worksheet: this.profileForm.username || "Worksheet",
                    table: table.innerHTML,
                }; //此时的innerHTML数据可以自己自定义 比如json转化 只要值要数据符合即可
                var link = document.createElement("A");
                link.href = uri + base64(format(template, ctx));
                link.download = this.profileForm.username + "." + ext;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                this.downloadExcelLoading = false
            },
            refreshReportInfo() {
                let username = getItem('user').username || store.state.user.username
                this.$http.post(`/${username}/refreshArticleInfo`).then(res => {
                    if (res.data.status === 200) {
                        this.articleInfo = res.data.info
                        //筛选出数据汇总的期刊('Journal Articles')
                        this.articleInfo = this.articleInfo.filter(item => item.type === 'Journal Articles')
                        //添加用户的论文属性排序
                        this.articleInfo.forEach(item => {
                            let authors = item.authors.toLocaleLowerCase().replaceAll(' ', '').split(','),
                                author = item.author.toLocaleLowerCase().replaceAll(' ', '')
                            item['order'] = authors.indexOf(author) + 1
                        })
                        this.$message.success(res.data.message)
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch(err => {
                    console.log(err)
                    this.$message.error(err)
                })
            }
        },
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
