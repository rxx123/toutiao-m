<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索历史记录 -->
    <search-result v-if="isResultShow" :q="searchText"/>
    <!-- /搜索历史记录 -->

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText"/>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-history v-else/>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: []
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val

      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)

      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      console.log('取消')
    }
  }
}
</script>

<style scoped lang="less">
  .search-container {
    .van-search__action {
      /*color: #fff;*/
    }
  }
</style>
