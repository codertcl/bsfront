<template>
    <div class="resume">
        <simple-template :info="profileForm"></simple-template>
    </div>
</template>

<script>
    import SimpleTemplate from './SimpleTemplate'
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
            SimpleTemplate
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
                    this.profileForm['article'] = this.articleInfo
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
