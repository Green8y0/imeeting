<template>
	<div class="all">
    <!-- 上拉菜单 -->
		<van-action-sheet :show="showSelect" :actions="choices"
		@close="changeAdmin" @select="onSelect" description="增加管理员"/>

    <!-- 分割线 -->
		<van-divider contentPosition="center" customStyle="color: #1989fa; border-color: #1989fa; font-size: 18px;">
			小组成员
		</van-divider>
		<div class="user-div">
			<div v-for="(member,index) in members" :key="index" class="userinfo">
				<div class="img-div">
					<img :src="member.avatarUrl" class="user-img">
				</div>

				<div class="user-detail">
					<div class="user-nickname">{{ member.nickName }}</div>
					<div class="user-identity" v-if="member.leader==1">管理员</div>
					<div class="user-identity" v-else>小组成员</div>
				</div>

				<div v-if="member.leader">
					<img src="/static/images/editgroup.png" @click="changeAdmin" class="edit-img">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {showModel, showSuccess, get, post} from '@/util'
	export default{
		data () {
			return {
				groupid: '',
				groups: [],
				members: [],
				choices: [],
				showSelect: false,
				newAdmin: {}
			}
		},
		methods: {
			changeAdmin () {
				this.choices = []
        		for (let member of this.members) {
          			if (member.leader != 1) {
            			this.choices.push({
              				openId: member.openId,
              				name: member.nickName
            			})
          			}
        		}
				console.log('choices=',this.choices)
				this.showSelect = !this.showSelect
			},
			onSelect (e) {
        		this.newAdmin = {
          			openid: e.mp.detail.openId,
          			nickName: e.mp.detail.name
        		}
				if (this.newAdmin.openid) {
					let that = this
					wx.showModal({
						content: "确定新增管理员吗？",
						success: function (res) {
						  if (res.confirm) {
						    that.setAdmin()
						  }
				  		}
					})
				}
			},
			async setAdmin () {
			  // 新增新的管理员
				try{
					const data = {
						openid: this.newAdmin.openid
					}
					const res = await post('/weapp/setleader', data)
					console.log('从后端/weapp/setleader传过来的信息:', res)
					showSuccess('新增成功')
					setTimeout(function(){
            			wx.reLaunch({
              				url: '/pages/workgroup/main'
            			})
          			},1000)
				}catch (e) {
					console.log("从/weapp/getmembers后端传过来的错误信息:", e)
          			showModel('新增管理员失败', '请重试哦~')
				}
			},
			async getMembers () {
			  // 查找同组的成员信息
				try{
					const data = {
            			group_id: this.groupid
          			}
          			// 查询group_id相同的成员
          			const res = await get('/weapp/getmembers', data)
          			console.log('从后端/weapp/getmembers传过来的信息:', res.records)
          			this.groups = res.records
          			// 获取同组成员的更多信息
          			await this.getUserinfo()
				}catch (e) {
					console.log("从/weapp/getmembers后端传过来的错误信息:", e)
          			showModel('获取小组成员openid失败', '请重试哦~')
				}
			},
			async getUserinfo () {
				try{
				  // 遍历同组成员列表,追加同组成员的详细信息
					for (let group of this.groups) {
						const data = {
							open_id: group.openid
						}
						const res = await get('/weapp/getuserinfo', data)
						console.log('从后端/weapp/getuserinfo传过来的信息:', res.records)
            			let member = JSON.parse(res.records[0].user_info)

            			// 设置同组成员的详细信息
            			let temp = {
						  	openId: member.openId,
              				nickName: member.nickName,
              				avatarUrl: member.avatarUrl,
              				leader: group.leader
            			}
						this.members.push(temp)
					}
				}catch (e) {
					console.log("从/weapp/getuserinfo后端传过来的错误信息:", e)
          			showModel('获取用户信息失败', '请重试哦~')
				}
			}
		},
		onLoad (e) {
			this.groupid = e.group_id
			this.members = []
			this.getMembers()
		}
	}
</script>

<style lang="scss">
.all {
	width: 100%;
	height: 100%;
}
.user-div {

}
.userinfo {
	height: 150rpx;
	width: 100%;
	color: #00000090;
	border-top: 1px #1998fb solid;
}
.img-div {
	width: 20%;
	float: left;
}
.user-img {
	width: 120rpx;
  height: 120rpx;
  padding-left: 25rpx;
  padding-top: 20rpx;
}
.user-detail {
	float: left;
  width: 65%;
  padding-left: 20rpx;
  padding-top: 20rpx;
}
.user-identity {
	font-size:40rpx;
  color:black;
  padding-bottom: 5rpx;
}
.user-nickname {
	font-size:40rpx;
  color:black;
}
.edit-img {
	width:50rpx;
  height:50rpx;
  float:right;
  margin: 10rpx 10rpx 0rpx 0rpx;
}
</style>
