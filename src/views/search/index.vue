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
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"/>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-history v-else :search-histories="searchHistories" @search="onSearch" @update-histories="searchHistories = $event"/>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { getItem, setItem } from '@/utils/storage'
import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
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
      searchHistories: getItem('serach-histories') || []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistories () {
      setItem('serach-histories', this.searchHistories)
    }
  },
  created () {
    this.loadSearchHistories()
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

      // 同步到本地存储
      // setItem('serach-histories', this.searchHistories)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      console.log('取消')
    },
    async loadSearchHistories () {
      let localHistories = getItem('serach-histories') || []
      if (this.user) {
        const { data } = await getSearchHistories()
        localHistories = [...new Set([
          ...localHistories,
          ...data.data.keywords
        ])]
      }
      this.searchHistories = localHistories
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
