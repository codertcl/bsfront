<template>
    <div class="resume-export">
        <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="true"
                :preview-modal="false"
                :filename="info.username"
                :pdf-quality="2"
                :paginate-elements-by-height="3000"
                :manual-pagination="true"
                pdf-format="a4"
                :pdf-margin="10"
                pdf-orientation="portrait"
                pdf-content-width="800px"
                @progress="onProgress($event)"
                ref="html2Pdf"
        >
            <SimpleResume slot="pdf-content" :info="info"></SimpleResume>
        </vue-html2pdf>
        <SimpleResume :info="info"></SimpleResume>
        <el-button type="primary"
                   icon="el-icon-top-right"
                   size="small"
                   @click="exportPdf">
            导出Pdf
        </el-button>
    </div>
</template>

<script>
    import VueHtml2pdf from 'vue-html2pdf'
    import SimpleResume from "./SimpleResume";

    export default {
        name: "ResumeTemplate",
        data() {
            return {
                // info:
            }
        },
        props: {
            info: {
                type: Object,
                default: () => ({})
            }
        },
        created() {
            this.init()
        },
        components: {
            VueHtml2pdf,
            SimpleResume
        },
        methods: {
            init() {
                if (!Array.isArray(this.info.research_fields)) {
                    this.info.research_fields = JSON.parse(this.info.research_fields)
                }
                if (!Array.isArray(this.info.education_experience)) {
                    this.info.education_experience = JSON.parse(this.info.education_experience)
                }
                // //将article转换为数组,并只显示作者中的前三个
                console.log(this.info);
                console.log(this.info.article);
                console.log(Array.isArray(this.info.article))
                // this.info.article = this.info.article.map(item => {
                //     item.authors = item.authors.split(',')
                //     if (item.authors.length > 3) {
                //         item.authors = item.authors.slice(0, 3).join(',') + ' and so on'
                //     } else {
                //         item.authors = item.authors.join(',')
                //     }
                //     return item
                // })
            },
            onProgress(event) {
                console.log(`Processed: ${event} / 100`);
            },
            hasGenerated() {
                alert("PDF generated successfully!");
            },
            generatePDF() {
                this.$refs.html2Pdf.generatePdf();
            },
            //导出PDF 无法显示下拉内容
            exportPdf(domName, title) {
                this.$refs.html2Pdf.generatePdf();
            }
        }
    }
</script>

<style scoped lang="less">
    body {
        font-size: 16px;
        font-family: 'Times New Roman', 'Microsoft YaHei', serif;
        word-break: break-all;
        background: #525659;

        .resume-export {
            .el-button {
                position: absolute;
                top: 30px;
                right: 40px;
            }
        }

        .clear-fix {
            clear: both;
        }
    }
</style>
