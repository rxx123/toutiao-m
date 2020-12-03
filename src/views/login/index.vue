<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <van-form
      @submit="onLogin"
      :show-error="false"
      :show-error-message="false"
      @failed="onFailed"
      validate-first
      ref="login-form"
    >
      <van-field
        v-model="user.mobile"
        required
        clearable
        center
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRoules.mobile"
      />
      <van-field
        v-model="user.code"
        type="number"
        clearable
        center
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        :rules="formRoules.code"
      >
        <template #button>
          <van-count-down
          :time="1000 * 6"
          format="ss s"
          v-if="isCountDownShow"
          @finish="isCountDownShow = false"
           />
          <van-button
            class="send-btn"
            size="mini"
            round
            @click.prevent="onSendSms"
            v-else
            :loading="isSendSmsLoading"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
      <van-button class="login-btn" type="info" block>登录</van-button>
    </div>
    </van-form>
    <div><span class="hint">手机号：17090086870 验证码：246810</span></div>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '17090086870', // 手机号
        code: '' // 验证码
      },
      formRoules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        const res = await login(this.user)
        // console.log('登录成功', res)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', res.data.data)
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          // console.log('登录失败', err)
          this.$toast.fail('登录失败，手机号或验证码错误')
        }
      }
    },
    onFailed (error) {
      console.log(error)
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        this.isSendSmsLoading = true
        await sendSms(this.user.mobile)
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁了，请销后重试！'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '发送失败，请销后重试！'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style scoped lang="less">
  .login-container {
    .send-btn {
      width: 76px;
      height: 23px;
      background-color: #ededed;
      .van-button__text {
        font-size: 11px;
        color: #666666;
      }
    }
    .login-btn-wrap {
      padding: 26px 16px;
      .login-btn {
        background-color: #6db4fb;
        border: none;
        .van-button__text {
          font-size: 15px;
        }
      }
    }
  }
  .hint {
    font-size: 16px;
    color: gray;
    margin-left: 20px;
  }
</style>
