<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      left-arrow
      title="文章详情"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

     <!-- 文章标题 -->
    <h1 class="article-title">{{article.title}}</h1>
    <!-- /文章标题 -->
    <van-cell center class="user-info">
        <div slot="title" class="name">{{article.aut_name}}</div>
        <van-image slot="icon" class="avatar" round fit="cover" :src="article.aut_photo"></van-image>
        <div slot="label" class="pubdate">{{article.pubdate | relativeTime}}</div>
        <van-button :type="article.is_followed ? 'default':'info'" :icon="article.is_followed ? '':'plus'" class="follow-btn" round size="small">{{article.is_followed ? '已关注':'关注'}}</van-button>
    </van-cell>
    <div class="markdown-body" v-html="article.content">
    </div>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      const { data } = await getArticleById(this.articleId)
      this.article = data.data
    }
  }
}
</script>

<style scoped lang="less">
.article-title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
}
.user-info {
    .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
    }
    .name {
        font-size: 12px;
        color: #333333;
    }
    .pubdate {
        font-size: 11px;
        color: #b4b4b4;
    }
    .follow-btn {
        width: 85px;
        height: 29px;
    }
}
.markdown-body {
    padding: 14px;
}
</style>
