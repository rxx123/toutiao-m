<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- /导航栏 -->
    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
      <div
        class="message-item"
        :class="{ reverse: item.userId === user.user_id }"
        v-for="(item, index) in messages"
        :key="index"
      >
        <van-image class="avatar" round fit="cover" :src="item.photo" />
        <div class="msg-wrap" style="flex: 1">
          <div class="title">{{ item.msg }}</div>
        </div>
      </div>
    </div>
    <!-- /消息列表 -->
    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field v-model="message" center clearable>
        <van-button slot="button" size="small" type="primary" @click="onSend"
          >发送</van-button
        >
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>
<script>
// import io from 'socket.io-client'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'UserChat',
  components: {},
  props: {},
  data () {
    return {
      message: '',
      socket: null,
      messages: getItem('chat-messages') || []
    }
  },
  created () {
    // this.socket = io('http://ttapi.research.itcast.cn/')
    // this.socket.on('connect', () => {
    //   console.log('连接建立成功！')
    // })
    // this.socket.on('message', data => {
    //   this.messages.push(data)
    // })
  },
  deactivated () {
    this.socket.close()
  },
  computed: {},
  watch: {
    messages () {
      setItem('chat-messages', this.messages)
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  mounted () {
    this.scrollToBottom()
  },
  methods: {
    onSend () {
      const data = {
        msg: this.value,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      this.messages.push(data)
    },
    scrollToBottom () {
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight
    }
  }
}
</script>
<style scoped lang="less">
.chat-container {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 46px 0 50px 0;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: #f5f5f6;
  .message-list {
    height: 100%;
    overflow-y: scroll;
    .message-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-start;
      padding: 10px;
      .msg-wrap {
        word-break: break-all;
        word-wrap: break-word;
      }
      .title {
        display: table;
        background: #e0effb;
        border-radius: 6px;
        font-size: 14px;
        padding: 10px 10px;
        margin-right: 45px;
      }
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 5px;
      }
    }
    .reverse {
      flex-direction: row-reverse;
      .msg-wrap {
        display: flex;
        flex-direction: row-reverse;
        .title {
          margin-right: 5px;
          margin-left: 45px;
        }
      }
    }
  }

  .send-message {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f5f5f6 !important;
  }
}
</style>
