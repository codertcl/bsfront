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
                profileForm: {},
                articleInfo: [],
            }
        },
        components: {
            SimpleResumeExport
        },
        created() {
            this.profileForm = getItem('user') || this.$store.state.user
            this.articleInfo = getItem('articleInfo') || this.$store.state.articleInfo
            this.handleArticleInfo()
        },
        methods: {
            handleArticleInfo() {
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
            },
        }
    }
</script>
