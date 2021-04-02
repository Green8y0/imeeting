<template>
  <div>
    <div v-if="showLogin">
      <LoginWindow @changeShow="getModel(arguments)"></LoginWindow>
    </div>
    <div>
      <div class="page">
        <div class="page-wrap">
          <img class="logo" src="../../../static/images/meeting.jpg">

          <div class="btn">
            <button @click="showMeeting()">
              <img src="../../../static/images/local.png">会议室预定
            </button>
          </div>
          <!-- <div class="btn">
            <button @click="showTrip()">
              <img src="../../../static/images/date.png">我的空闲时间
            </button>
          </div> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import LoginWindow from '@/components/LoginWindow'
export default {
  components: {
    LoginWindow
  },
  data () {
    return {
      mark: 0,
      userinfo: {},
      showLogin: false
    }
  },
  methods: {
    getModel (val) {
      this.showLogin = val[0]
      this.userinfo = val[1]
    },
    showMeeting () {
      wx.navigateTo({
        url: '/pages/meeting/main'
      })
    },
    showTrip () {
      wx.navigateTo({
        url: '/pages/mytrip/main'
      })
    }
  },
  mounted () {
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo.openId) {
      this.userinfo = userinfo
      console.log('用户信息:', this.userinfo)
    } else {
      wx.hideTabBar()
      this.showLogin = true
    }
  },
  onShareAppMessage () {
    return {
      title: 'i会议空闲会议室预订小程序',
      path: '/pages/index/main'
    }
  }
}
</script>

<style lang="scss">
.page {
  text-align: center;
  height: 100%;
  width:100%;
}
.page-wrap {
  position: relative;
  padding-top: 120rpx;
}
.btn button{
  width: 65%;
  margin-bottom: 40rpx;
  background:#ffd191;
}
.btn image {
  width: 60rpx;
  height: 60rpx;
  display: inline-block;
  vertical-align: middle;
  margin-right: 40rpx;
}
.logo {
    width: 80%;
    height: 500rpx;
    display: inline-block;
    margin-bottom: 150rpx;
}

</style>
