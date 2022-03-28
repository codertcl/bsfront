<template>
    <h2>论文成就</h2>
</template>

<script>
    import {getItem} from "../../utils/storage";

    export default {
        name: "Article",
        data() {
            return {
                profileForm: {},
            }
        },
        created() {
            this.profileForm = getItem('user') || this.$store.state.user
            this.getArticleInfo(this.profileForm.username)
        },
        methods: {
            async getArticleInfo(username) {
                const res = await this.$http.get(`${username}/getArticleInfo`)
                console.log(res)
            }
        }
    }
</script>

<style scoped lang="less">

</style>
