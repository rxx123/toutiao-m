<template>
  <div class="home-container">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar">
      <van-button slot="title" icon="search" type="info" round size="small" class="search-btn">搜索</van-button>
    </van-nav-bar>
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab :title="channel.name" v-for="(channel) in channels" :key="channel.id">
      <articleList :channel='channel'></articleList>
      </van-tab>
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div slot="nav-right" @click="isChannelEditShow = true" class="wap-nav-wrap">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup
        v-model="isChannelEditShow"
        position="bottom"
        class="channel-edit-popup"
        closeable
        close-icon-position="top-left"
        get-container="body"
        style="height: 100%"
      >
      <channel-edit />
      </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 2,
      channels: [],
      isChannelEditShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
  .home-container {
    /deep/.van-nav-bar__title {
      max-width: none;
    }
    .search-btn {
      width: 277px;
      height: 32px;
      background: #5babfb;
      border: none;
      .van-icon {
        font-size: 16px;
      }
      .van-button__text {
        font-size: 14px;
      }
    }
    .channel-tabs {
      /deep/ .van-tab {
        border-right: 1px solid #edeff3;
        border-bottom: 1px solid #edeff3;
      }
      /deep/ .van-tabs__line {
        bottom: 20px;
        width: 15px !important;
        height: 3px;
        background: #3296fa;
      }
    }
    .wap-nav-wrap {
      position: fixed;
      right: 0;
      height: 43px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: .9;
      width: 33px;
      .van-icon {
        font-size: 22px;
      }
      &:before {
        content: '';
        width: 1px;
        height: 43px;
        background: url() no-repeat;
        background-size: contain;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .wap-nav-placeholder {
      width:33px;
      flex-shrink:0;
    }
  }
</style>
