<template>
	<div>
		<div class="the_show">
  	  <div class="show_where">
  	  	工作小组:{{group.group_id}}
        <img class="show_img" :src="src" @click="changeShowSelect"/>
  	  </div>
  	  <div class="show_last">
  	  	<div class="show_detail">
  	  	  <div class="show_time">
  	  	  	会议时间:{{group.pre_time}}
  	  	  </div>
  	  	  <div class="show_number">
            会议地点:{{group.location}}
          </div>
  	  	</div>
  	  </div>
  	</div>
  	<van-action-sheet :show="showSelect" :actions="choices" @close="changeShowSelect" @select="onSelect"/>
	</div>
</template>

<script>
	import {formatDate} from '../utils/index.js'
	import {showModel, showSuccess, get, post} from '@/util'
	export default{
		props: ['group'],
		data () {
			return {
      	src: "/static/images/editgroup.png",
      	showSelect: false,
      	choice: '',
      	choices:[{
      		name: '修改管理员'
      	},
      	{
      		name: '删除小组'
      	}]
			}
		},
		methods: {
			onSelect (e) {
        this.choice = e.mp.detail.name
        console.log("showSelectgroup中的this.choice=",this.choice)
        if (this.choice == '删除小组') {
        	var that = this
		      wx.showModal({
				  	content: '确定删除该小组吗？',
				  	success: function (res) {
						  if (res.confirm) {
						    that.deleteGroup()
						  }
				  	}
		      })
        }else if (this.choice == '修改管理员') {
        	try{
        		wx.navigateTo({
	        		url: '/pages/editadmin/main?group_id=' + this.group.group_id
	        	})
        	}catch (e) {
        		showModel('跳转失败','请重试')
          	console.log('从后端返回的执行错误的信息是:', e)
        	}
        }
      },
      changeShowSelect () {
      	if (this.group.leader == 1) {
      		this.showSelect = !this.showSelect
				}else{
					showModel('当前用户非管理员','不可修改小组设置!')
				}
      },
      async deleteGroup() {
      	try {
          const data = {
            group_id: this.group.group_id
          }
          const res = await post('/weapp/deletegroup', data)
          console.log('从后端/weapp/deletegroup返回的信息是:', res)
          showSuccess('删除成功')
          setTimeout(function(){
            wx.reLaunch({
              url: '/pages/workgroup/main'
            })
          },1000)
        }catch (e) {
          showModel('删除失败', '请重新操作')
          console.log('从后端/weapp/deletegroup返回的信息是:', e)
        }
      }
		}
	}
</script>

<style>
.the_show {
  background-color: #f2f2f2;
  border-bottom: 20rpx solid #ffffff;
  padding-left: 30rpx;
}
.show_where {
  font-size:43rpx;
  color:black;
  margin-bottom: 20rpx;
}
.show_img {
  width:50rpx;
  height:50rpx;
  float:right;
  margin: 10rpx 10rpx 0rpx 0rpx;
}
.show_time {
  font-size:32rpx;
  margin-bottom:12rpx;
  color:#5a5858
}
.show_number {
  font-size:32rpx;
  margin-bottom:8rpx;
  color:#6f6666;
}
.show_detail {
  display:inline-block;
}
</style>
