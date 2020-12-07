<template>
  <div class="search-suggestion">
    <van-cell :title="suggestion" icon="search" v-for="(suggestion, index) in suggestions" :key="index"></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    // searchText () {
    //   console.log(this.searchText)
    // }

    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
