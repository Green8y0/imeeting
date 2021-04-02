<template>
	<div>
		<div class="top">
			<div class="userinfo">
				<img :src="userinfo.avatarUrl">
			</div>
			<div class="name">
				<!-- <button class="btn" v-if="showLogin" @click="changeLogin">授权登录</button> -->
				<div>
					<label>{{userinfo.nickName}}</label>
					<p class="notice">{{quote}}</p>
				</div>
				
			</div>
		</div>
		<div class="contain">
			<div class="row" @click="showInstruction()">
				<label class="left">
					<img class="img" src="/static/images/homework.png">
				</label>
				<label class="name">&nbsp;&nbsp;操作指引</label>
				<label class="right">></label>
			</div>			

			<!-- <div class="row" @click="changeClear()">
				<label class="left">
					<img class="img" src="/static/images/delete.png">
				</label>
				<label class="name">&nbsp;&nbsp;清空记录</label>
				<label class="right">></label>									
			</div> -->

			<div class="row" @click="showOpinion">
				<label class="left">
					<img class="img" src="/static/images/approval.png">
				</label>
				<label class="name">&nbsp;&nbsp;意见反馈</label>
				<label class="right">></label>									
			</div>

			<!-- <div class="row" @click="showWorkgroup()">
				<label class="left">
					<img class="img" src="/static/images/workgroup.png">
				</label>
				<label class="name">&nbsp;&nbsp;工作小组</label>
				<label class="right">></label>				
			</div> -->

			
		</div>
	</div>
</template>

<script>
	import LoginWindow from '@/components/LoginWindow'
	import {showSuccess, showModel, post} from '@/util'
	export default{
	  data () {
	    return {
	      userinfo: {},
	      quote: '',
	      showLogin: true
	    }
	  },
	  methods: {
	    rankArray () {
	      // Math.random()生成0~1之间的小数，比如：0.8754645654322
	      var a = Math.random() + ''
	      var rank1 = a.charAt(5)
	      var quotes = ['不奋发，则心日颓靡；不检束，则心日恣肆', '自制是一种秩序， 一种对于快乐与欲望的控制', '哪怕一点小小的克制，也会使人变得强而有力', '做一个自律的人，像优秀的人学习，然后做好自己', '真正的自由是在所有时候都能控制自己', '每天爱自己多一点！！！', ' 每天爱自己多一点！！！', '如果连自己都不能控制，有什么资格去谈自己想要的', '登峰造极的成就源于自律', '自我控制是最强者的本能', '立志言为本，修身行乃先']
	      this.quote = quotes[rank1]
	    },
	    async clearRecords () {
	      const userinfo = wx.getStorageSync('userinfo')
	      const data = {
	      	openid: userinfo.openId
	      }
	      console.log('data.openid=', data.openid)
	      try {
	      	const res = await post('/weapp/clearrecords', data)
            console.log('从后端传过来的信息', res)
            showSuccess('清除记录成功')
	      }catch (e) {
	      	showModel('清除记录失败', '请重试哦~')
            console.log('从后端返回的执行错误的信息是:', e)
	      }
	    },
	    changeClear () {
	      var that = this
	      wx.showModal({
		  	content: '确定清空个人空闲时间记录吗？',
		  	success: function (res) {
			  if (res.confirm) {
			    that.clearRecords()
			  }
		  	}
	      })
	      console.log('this.flagClear=', this.flagClear)
	    },
	    showOpinion () {
	      wx.navigateTo({
	        url: '/pages/opinion/main'
	      })
	    },
	    showInstruction () {
		// wx.navigateTo是小程序现成的API，保留当前页面，跳转到应用内的某个页面
		  wx.navigateTo({
		    url: '/pages/instruction/main'
		  })
	    },
	    showWorkgroup () {
	      wx.navigateTo({
	    	url: '/pages/workgroup/main'
	      })
	    }
	  },
	  onShow () {
	    this.rankArray()
	  },
	  mounted () {
	    const userinfo = wx.getStorageSync('userinfo')
		    if (userinfo.openId) {
		      this.userinfo = userinfo
		      console.log('this.userinfo:', this.userinfo)
	    	}
	  }
	}
</script>

<style lang="scss">
.contain{
  margin-top: 10px;
  background:#FFFFFF;
  font-size:15px;
  .row{
    padding: 0px 18px;
    border-bottom: 1px #E8E8E8 solid;
    height: 55px;
    line-height: 55px;
    .img {
      float:left;
      width: 20px;
      height: 20px;
      padding-top:16px;
    }
    .name {
      float:left;
    }
  }
  .right {
    float: right;
    color: #C8C8C8;
    line-height:55px;
  }
  .left {
    width:80%;
  }
}  

.top{
  height: 80px;
  width: 100%;
  background:#5f9ea0;
  padding-top: 30px;
  display: block;
  .userinfo{
    padding-bottom: 5px;
    float: left;
    img{
      width: 120rpx;
      height:120rpx;
      margin: 10rpx;
      border-radius: 1px;
      border: 1px #D0D0D0 solid;
    }
  }
  .name{
    padding-top: 30px;
    padding-left: 5px;
    color: #FFFFFF;
    font-size: 16px;
    float: left;
    .underline{
      border: 1px solid #ffffff;
      border-radius:5px;
      text-align:center;
    }
    .notice{
      color: #D8D8D8;
      font-size: 12px;
    }
    .a-line{
      background:#EA5149;
      border: none;
      display: inline;
      font-size: 16px;
      color: #FFFFFF;
      text-decoration:underline;
    }
    .btn{
		font-size:16px;
		border-radius:1px;
		border:1px #D0D0D0 solid;
		width:95px;
	}
  }
}
</style>