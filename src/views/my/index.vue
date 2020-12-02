<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell center class="base-info" :border="false">
        <van-image class="avatar" slot="icon" round fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="name" slot="title">昵称</div>
        <van-button class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item"><div slot="text" class="text-wrap"><div class="count">123</div><div class="text">头条</div></div></van-grid-item>
        <van-grid-item class="data-info-item"><div slot="text" class="text-wrap"><div class="count">123</div><div class="text">关注</div></div></van-grid-item>
        <van-grid-item class="data-info-item"><div slot="text" class="text-wrap"><div class="count">123</div><div class="text">粉丝</div></div></van-grid-item>
        <van-grid-item class="data-info-item"><div slot="text" class="text-wrap"><div class="count">123</div><div class="text">获赞</div></div></van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else class="not-login">
      <div @click="$router.push('/login')">
        <img src="./mobile.png" class="mobile">
      </div>
      <div class="text">登录/注册</div>
    </div>
    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item class="nav-grid-item" icon="shoucang" icon-prefix="toutiao" text="收藏" />
      <van-grid-item class="nav-grid-item" icon="lishi" icon-prefix="toutiao" text="历史" />
    </van-grid>

    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" class="mb-4" is-link to="/" />
    <van-cell v-if="user" title="退出登录" class="logout-cell" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 11px;
        }
      }
    }
    /deep/.van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login{
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
  /deep/.nav-grid {
    .nav-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
