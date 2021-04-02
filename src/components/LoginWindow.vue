<template>
	<div>
		<div class="modal-mask"></div>
	    <div class="modal-dialog">
	      <div class="modal-content">
	        <img class="img" src="../../static/images/littleTip-huang.jpg">
	        <div class="content-tip">
	          <p class="key-bold">i会议是一款预订空闲会议室的小程序。</p>
	          <p class="key-bold">本程序面向新思路实验室的成员</p>
            <p class="key-bold">这是以小组为单位预订的空闲会议室</p>
	          <p class="little-tip">举个例子：</p>
	          <p class="little-content">已知用户小组为"i会议"</p>
	          <p class="little-content">预订会议时间为9点~10点</p>
            <p class="little-content">会议预订成功信息将会显示在小组页面</p>
	        </div>
	      </div>
	      <div class="modal-footer">
	        <button open-type="getUserInfo" lang="zh_CN" class="btn" @getuserinfo="login">
	          授权登录
	        </button>
	      </div>
	    </div>
	</div>
</template>

<script>
	import config from '@/config'
	import qcloud from 'wafer2-client-sdk'
import {showSuccess, showModel} from '@/util'
	export default{
	  methods: {
	    login () {
        wx.showToast({
          title:'登录中',
          icon:'loading'
        })
		    qcloud.setLoginUrl(config.loginUrl)// 通过SDK插件请求config.js配置中登录的路由
	      qcloud.login({
		      success: userInfo => {
		        console.log('登录成功', userInfo)
	          this.loginSuccess(userInfo)
            this.$emit('changeShow', false, userInfo)
            wx.showTabBar()
            showSuccess('登录成功')
		      },
		      fail: err => {
		        console.log('登录失败', err)
            showModel('登录失败',err)
	        }
		    })
	    },
		  loginSuccess (userInfo) {
		    wx.setStorageSync('userinfo', userInfo)
		  }
	  }
	}
</script>

<style lang="scss">
	.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}
.modal-dialog {
  box-sizing: border-box;
  width: 560rpx;
  overflow: hidden;
  position: fixed;
  top: 30%;
  left: 0;
  z-index: 9999;
  background: #fff;
  margin: -150rpx 95rpx;
  border-radius: 16rpx;
}
.modal-content {
  box-sizing: border-box;
  display: flex;
  padding: 0rpx 53rpx 50rpx 53rpx;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.content-tip {
  text-align: center;
  font-size: 36rpx;
  color: #333333;
}
.content-text {
  height:130px;
  padding:10px 0px 50px 0px;
  font-size:14px;
}
.modal-footer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #e5e5e5;
  font-size: 16px;
  font-weight:bold;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background:#feb600;
}
button {
  width: 100%;
  background:#feb600;
  color:#FFFFFF;
  font-weight:bold;
}
.img {
  width: 280px;
  height:90px;
}
.little-tip {
  padding-top:15px;
  padding-bottom:3px;
  font-size: 14px;
  font-weight:bold;
  color: #feb600;
}
.little-content {
  padding-top:5px;
  font-size: 13px;
  color:#606060;
}
.key-bold {
  padding-top:5px;
  font-size: 14px;
  font-weight:bold;
}
</style>