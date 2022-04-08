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
                    width="280">
                <template slot-scope="scope">
                    {{scope.row.title}} ({{scope.row.year}})
                </template>
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
                    prop="order"
                    align="center"
                    label="排名"
                    width="50">
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
                    label="期刊名称"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="number"
                    align="center"
                    label="期数"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="pages"
                    align="center"
                    label="页号"
                    width="80">
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
    import html2canvas from "html2canvas"
    import JSPDF from "jspdf"

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
            //TODO 第一次调用getArticleInfo方法时无法获取到 进入其他页面再返回才行
            async getArticleInfo(username) {
                //2s内未获取到作者数据重复执行该函数
                // this.isGetArticleInfo(username)
                const res = await this.$http.get(`${username}/getArticleInfo`)
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
                console.log(res)
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
            //导出PDF 无法显示下拉内容
            exportPdf() {
                this.downloadPdfLoading = true
                let that = this
                var element = document.getElementById(this.tableID)
                html2canvas(element, {
                    logging: false
                }).then(function (canvas) {
                    var pdf = new JSPDF("p", "mm", "a4") // A4纸，纵向
                    var ctx = canvas.getContext("2d")
                    var a4w = 170;
                    var a4h = 257 // A4大小，210mm x 297mm，四边各保留20mm的边距，显示区域170x257
                    var imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
                    var renderedHeight = 0

                    while (renderedHeight < canvas.height) {
                        var page = document.createElement("canvas")
                        page.width = canvas.width
                        page.height = Math.min(imgHeight, canvas.height - renderedHeight)// 可能内容不足一页

                        // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
                        page.getContext("2d").putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
                        pdf.addImage(page.toDataURL("image/jpeg", 1.0), "JPEG", 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距

                        renderedHeight += imgHeight
                        if (renderedHeight < canvas.height) {
                            pdf.addPage()
                        }// 如果后面还有内容，添加一个空页
                        // delete page;
                    }
                    pdf.save(that.profileForm.username)
                })
                this.downloadPdfLoading = false
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
