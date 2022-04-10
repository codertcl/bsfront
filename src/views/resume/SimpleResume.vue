<template>
    <div class="wrapper">
        <div class="header">
            <div class="header-title">
                <p class="title">个人主页</p>
            </div>
            <div class="header-list">
                <div class="separate">
                    <span class="icon"></span>
                    <span class="subtitle">基本信息</span>
                    <span class="long-line"></span>
                </div>
                <div class="header-left">
                    <ul>
                        <li>姓名: {{info.name}}</li>
                        <li>联系方式: {{info.phone}}</li>
                        <li>邮箱:<a href="info.email">{{info.email}}</a></li>
                    </ul>
                </div>
                <div class="header-avatar">
                    <el-avatar shape="square" :size="100" fit="fit" :src="info.avatar_url"></el-avatar>
                </div>
                <div class="header-right">
                    <ul>
                        <li>年龄: {{info.age}}</li>
                        <li>职称: {{info.professor}}</li>
                        <li>邮编: {{info.zip_code}}</li>
                    </ul>
                </div>
                <div class="clear-fix"></div>
            </div>
        </div>

        <div class="education-info">
            <div class="separate">
                <span class="icon"></span>
                <span class="subtitle">学术信息</span>
                <span class="long-line"></span>
            </div>
            <div class="education-list">
                <label class="self-introduction">简介: <span
                        class="self-introduction-detail">{{info.self_introduction}}</span>
                </label>
                <label class="research">研究领域:
                    <el-tag class="research-tag" v-for="item in info.research_fields">
                        {{item}}
                    </el-tag>
                </label>
                <label class="academic-duties">学术兼职:
                    <p class="academic-duties-detail">{{info.academic_duties}}</p>
                </label>
                <label class="prize">获奖信息 :
                    <p class="prize-detail">{{info.prize}}</p>
                </label>
                <label class="education-experience">教育经历 :
                    <div class="education-experience-detail"
                         v-for="item in info.education_experience">
                        <span class="time">{{dayjs(item.time[0]).format('YYYY-MM-DD')}}至{{dayjs(item.time[1]).format('YYYY-MM-DD')}}</span>
                        <span class="school">{{item.school}}</span>
                        <span class="major">{{item.major}}</span>
                        <span class="professor">{{item.type}}</span>
                    </div>
                </label>
            </div>
        </div>

        <div class="article-info">
            <div class="separate">
                <span class="icon"></span>
                <span class="subtitle">论文信息</span>
                <span class="long-line"></span>
            </div>
            <div class="article-info-detail">
                <div class="article" v-for="(item,index) in info.article">
                    <span class="index">[{{index+1}}] </span>
                    <span>{{item.authors}}. </span>
                    <span>{{item.title}}[{{item.key}}]. </span>
                    <span>{{item.name==='undefined'?item.venue:item.name}}, </span>
                    <span>{{item.year}}, </span>
                    <span>{{item.number}}: </span>
                    <span>{{item.pages}}.</span>
                </div>
            </div>
        </div>
        <hr>
    </div>
</template>

<script>
    export default {
        name: "SimpleResume",
        props: {
            info: {
                type: Object,
                default: () => ({})
            }
        },
        created() {
            this.init()
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
                // console.log(this.info);
                // console.log(this.info.article);
                // console.log(Array.isArray(this.info.article))
                // this.info.article = this.info.article.map(item => {
                //     item.authors = item.authors.split(',')
                //     if (item.authors.length > 3) {
                //         item.authors = item.authors.slice(0, 3).join(',') + ' and so on'
                //     } else {
                //         item.authors = item.authors.join(',')
                //     }
                //     return item
                // })
            }
        },
    }
</script>

<style scoped lang="less">
    body {
        font-size: 16px;
        font-family: 'Times New Roman', 'Microsoft YaHei', serif;
        word-break: break-all;
        background: #525659;

        .wrapper {
            width: 800px;
            min-height: 500px;
            margin: 0 auto 20px;
            background-color: #bfeff0;

            .long-line {
                position: relative;
                display: block;
                width: 690px;
                height: 2px;
                top: 32px;
                left: 58px;
                background: #1A73E8;
            }

            .icon {
                width: 35px;
                height: 35px;
                display: inline-block;
                position: absolute;
                left: 22px;
            }

            .subtitle {
                position: absolute;
                left: 62px;
                font-size: 19px;
                color: #1A73E8;
                font-weight: 600;
                top: 2px;
            }

            .header, .education-info, .article-info {
                position: relative;
                width: 800px;
                margin: 10px auto;
            }

            .header {
                .header-list {
                    position: relative;
                    margin-top: 10px;

                    .separate {
                        position: relative;
                        height: 35px;

                        .icon {
                            background: url('../../assets/icon/person_info_icon.png') no-repeat;
                        }
                    }


                    .header-left {
                        float: left;
                        margin: 10px;
                        /*position: relative;*/
                        /*top: 10px;*/
                        /*left: 10px;*/
                    }

                    .header-avatar {
                        float: left;
                        margin: 10px 0 10px 140px;

                        .el-avatar {
                            /deep/ img {
                                width: 100%;
                            }
                        }
                    }

                    .header-right {
                        float: left;
                        margin: 10px 0 10px 150px;
                    }

                    .header-left, .header-right {
                        ul {
                            li {
                                color: #333333;
                                font-size: 16px;
                                margin: 15px;

                                a {
                                    color: #333333;
                                    font-size: 16px;
                                }
                            }
                        }
                    }
                }

                .header-title {
                    position: relative;
                    padding-top: 20px;

                    .title {
                        text-align: center;
                        font-size: 30px;
                    }
                }
            }

            .education-info {
                .separate {
                    position: relative;
                    height: 35px;

                    .icon {
                        background: url("../../assets/icon/open_source_icon.png");
                    }
                }

                .education-list {
                    position: relative;
                    margin: 10px 25px;

                    .self-introduction, .research, .academic-duties, .prize, .education-experience {
                        display: inline-block;
                        font-size: 16px;
                        color: #333333;
                        margin: 5px 0;

                        &-detail {
                            font-size: 13px;
                            color: #000;
                        }
                    }

                    .research {
                        &-tag {
                            margin: 0 3px;
                        }
                    }

                    .education-experience {
                        &-detail {
                            .time, .professor, .major, .school {
                                margin: 5px;
                            }
                        }
                    }
                }

            }

            .article-info {
                .separate {
                    height: 35px;

                    .icon {
                        background: url("../../assets/icon/honor_reward_icon.png") no-repeat;
                    }
                }

                &-detail {
                    .article {
                        font-size: 12px;
                        color: #000;
                        margin: 25px;

                        .index {
                            font-size: 14px;
                        }

                        span {
                            margin: 3px;
                        }
                    }
                }


            }
        }

        .clear-fix {
            clear: both;
        }
    }
</style>
