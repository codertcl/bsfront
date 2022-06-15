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
                v-loading="!articleInfo.length"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(250, 250, 250, 0.8)"
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="title"
                    align="center"
                    label="论文名称(文本)"
                    width="350">
            </el-table-column>
            <el-table-column
                    prop="venue"
                    align="center"
                    label="刊物名称(文本)"
                    width="350">
                <template slot-scope="scope">
                    {{scope.row.name==='undefined'?scope.row.venue:scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="year"
                    sortable
                    align="center"
                    label="发表日期"
                    width="200">
                <template slot-scope="scope">
                    {{scope.row.year+'.'+Math.floor(Math.random() * 12 + 1).toString().padStart(2,
                    '0')+'.'+Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="level"
                    align="center"
                    label="论文级别(文本)"
                    width="70">
                <template slot-scope="scope">
                    {{scope.row.level==='undefined'?'online':scope.row.level}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="authors"
                    align="center"
                    label="作者"
                    width="450">
            </el-table-column>
            <el-table-column
                    prop="index"
                    align="center"
                    label="排名(文本)"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop=""
                    align="center"
                    label="是否通讯作者(文本)"
                    width="60">
            </el-table-column>
            <el-table-column
                    prop=""
                    align="center"
                    label="备注(文本)"
                    width="60">
            </el-table-column>
            <!--            <el-table-column-->
            <!--                    prop="year"-->
            <!--                    sortable-->
            <!--                    align="center"-->
            <!--                    label="发表年(卷)期"-->
            <!--                    column-key="year"-->
            <!--                    :filters="yearRange"-->
            <!--                    :filter-method="filterHandler"-->
            <!--                    width="200">-->
            <!--                <template slot-scope="scope">-->
            <!--                    {{scope.row.year}}-->
            <!--                    ({{scope.row.volume==='undefined'?'online':scope.row.volume}})-->
            <!--                    {{scope.row.number==="undefined"?'online':scope.row.number}}-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--                    prop="year"-->
            <!--                    sortable-->
            <!--                    align="center"-->
            <!--                    label="年(期)页码"-->
            <!--                    column-key="year"-->
            <!--                    :filters="yearRange"-->
            <!--                    :filter-method="filterHandler"-->
            <!--                    width="200">-->
            <!--                <template slot-scope="scope">-->
            <!--                    {{scope.row.year}}-->
            <!--                    ({{scope.row.number==='undefined'?'online':scope.row.number}})-->
            <!--                    {{scope.row.pages==='undefined'?'online':scope.row.pages}}-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--                    prop="volume"-->
            <!--                    align="center"-->
            <!--                    label="卷号"-->
            <!--                    width="60">-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--                    prop="期刊等级"-->
            <!--                    align="center"-->
            <!--                    label="level"-->
            <!--                    width="70">-->
            <!--                <template slot-scope="scope">-->
            <!--                    {{scope.row.level==='undefined'?'online':scope.row.level}}-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--                    prop="ISSN"-->
            <!--                    align="center"-->
            <!--                    label="ISSN"-->
            <!--                    width="100">-->
            <!--                <template slot-scope="scope">-->
            <!--                    {{scope.row.ISSN==='undefined'?'online':scope.row.ISSN}}-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--                    prop="影响因子"-->
            <!--                    align="center"-->
            <!--                    label="IF"-->
            <!--                    width="80">-->
            <!--                <template slot-scope="scope">-->
            <!--                    {{scope.row.IF==='undefined'?'online':Number(scope.row.IF).toFixed(3)}}-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--                    prop="key"-->
            <!--                    align="center"-->
            <!--                    label="发表刊物(检索号,刊号,影响因子)"-->
            <!--                    width="480">-->
            <!--                <template slot-scope="scope">-->
            <!--                    {{scope.row.name==='undefined'?scope.row.venue:scope.row.name}}-->
            <!--                    ({{scope.row.key}},{{scope.row.ISSN==='undefined'?'online':scope.row.ISSN}},-->
            <!--                    {{scope.row.IF==='undefined'?'online':Number(scope.row.IF).toFixed(3)}})-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--                    prop="kind"-->
            <!--                    align="center"-->
            <!--                    label="期刊类型"-->
            <!--                    width="100">-->
            <!--                <template slot-scope="scope">-->
            <!--                    {{scope.row.kind==='undefined'?'online':scope.row.kind}}-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--                    prop="key"-->
            <!--                    align="center"-->
            <!--                    label="索引"-->
            <!--                    width="200">-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--                    prop="pages"-->
            <!--                    align="center"-->
            <!--                    label="页号"-->
            <!--                    width="120">-->
            <!--                <template slot-scope="scope">-->
            <!--                    {{ scope.row.pages==='undefined'?'online':scope.row.pages}}-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--                    prop="url"-->
            <!--                    align="center"-->
            <!--                    label="dblp链接"-->
            <!--                    width="200">-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--                    prop="ee"-->
            <!--                    align="center"-->
            <!--                    label="文章链接"-->
            <!--                    width="200">-->
            <!--            </el-table-column>-->
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
            this.articleInfo = getItem('articleInfo') || this.$store.state.articleInfo
            //对论文信息进行预处理
            this.handleArticleInfo();
        },
        //取消事件总线监听
        beforeDestroy() {
            eventBus.$off('refreshReportInfo')
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
            handleArticleInfo() {
                //筛选出数据汇总的期刊('Journal Articles')
                this.articleInfo = this.articleInfo.filter(item => item.type === 'Journal Articles')
                //添加用户的论文属性排序
                this.articleInfo.forEach(item => {
                    let authors = item.authors.toLocaleLowerCase().replaceAll(' ', '').split(','),
                        author = item.author.toLocaleLowerCase().replaceAll(' ', '')
                    item['order'] = authors.indexOf(author) + 1
                })
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
                        //对论文信息进行预处理
                        this.handleArticleInfo();
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

    .el-button {
        position: absolute;
        right: 50px;
        margin-top: 10px !important;
    }
</style>
