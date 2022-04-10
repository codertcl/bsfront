<template>
    <div class="resume">
        <simple-resume-export :info="profileForm"></simple-resume-export>
    </div>
</template>

<script>
    import SimpleResumeExport from './SimpleResumeExport'
    import {getItem} from "../../utils/storage";

    export default {
        name: "Resume",
        data() {
            return {
                profileForm: null,
                articleInfo: null,
            }
        },
        components: {
            SimpleResumeExport
        },
        created() {
            this.profileForm = getItem('user') || this.$store.state.user
            this.getArticleInfo(this.profileForm.username)
        },
        methods: {
            async getArticleInfo(username) {
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
                    //该方式添加属性，对象的原型上没有该属性的get和set方式
                    // this.profileForm['article'] = this.articleInfo
                    this.$set(this.profileForm, 'article', this.articleInfo)
                    this.$message.success(res.data.message)
                } else {
                    this.$message.error(res.data.message)
                }
            },
        }
    }
</script>

<style scoped lang="less">

</style>
