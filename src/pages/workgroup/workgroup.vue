<template>
  <div class="instruction">
    <!-- 搜索框 -->
  	<van-search :value="groupid" placeholder="查找的小组id" show-action @search="OnSearch" @cancel="onCancel"/>
    <div class="contain">
      <!-- 创建工作小组行 -->
      <!-- <div class="row" @click="changeBuild">
        <label class="left">
          <img class="img" src="/static/images/buildgroup.png">
        </label>
        <label class="name">&nbsp;&nbsp;创建工作小组</label>
        <label class="right2">></label>
      </div>

      <div>
        <van-popup :show="showBuild" @close="changeBuild" custom-style="height:38%;" position="top">
          <van-divider contentPosition="center" customStyle="color: #1989fa; border-color: #1989fa; font-size: 18px;">
            新建小组
          </van-divider>
          <van-cell-group>
            <van-field :value="groupid" placeholder="请输入小组名称..."
            border="false" @change="onChange" required="true" error-message="小组名称需>=1个字符"/>
          </van-cell-group>
          <div>
            <van-button type="info" size="large" @click="submmit">提交信息</van-button>
          </div>
        </van-popup>
      </div> -->

      <!-- 加入工作小组行 -->
      <div class="row" @click="showAddgroup()">
        <label class="left">
          <img class="img" src="/static/images/addgroup.png">
        </label>
        <label class="name">&nbsp;&nbsp;加入工作小组</label>
        <label class="right2">></label>
      </div>
    </div>

  	<div class="all">
      <GroupList v-for="(group,index) in groups" :key="index" :group="group"></GroupList>
  	</div>
  </div>
</template>

<script>
  import {showModel, showSuccess, get, post} from '@/util'
  import {formatDate} from '../../utils/index.js'
  import GroupList from '@/components/GroupList'
  export default{
    components: {
      GroupList
    },
  	data () {
  	  return {
    		groups: [],               // 显示的小组(用户已加入的小组 | 查找已加入返回的小组)
        allGroups: [],            // 已存在的所有小组
        reservations: [],         // 存储预订会议信息
        groupid: '',              // 查找的小组id | 新建的小组id
        temp: [],                 // 查找小组辅助数组
        showBuild: false,
        addgroup: false,
        leader: 1
  	  }
  	},
  	methods: {
      // 查找某一已加入小组
  	  OnSearch (e) {
  	  	this.groupid = e.mp.detail
        // temp = 用户已加入的小组
        this.temp = this.groups
        this.groups = []
        for (let i of this.temp) {
          if (i.group_id == this.groupid){
            this.groups = this.groups.concat(i)
          }
        }
  	  },
      // 取消查找
  	  onCancel (e) {
  	  	this.groupid = ''
        this.groups = this.temp
  	  },
      onChange (e) {
        this.groupid = e.mp.detail
      },
      changeBuild () {
        this.showBuild = !this.showBuild
      },
      // 获取已加入的小组
      async getWorkgroup () {
        this.groups = []
        try {
          const userinfo = wx.getStorageSync('userinfo')
          const data = {
            openid: userinfo.openId
          }
          const res = await get('/weapp/getgroups', data)
          console.log('从后端/weapp/getgroups传过来的信息:', res.records)
          this.allGroups = res.records
          // 1.获取已加入的小组信息
          for (let i of res.records) {
            if (i.openid === userinfo.openId) {
              // 将open_id相等的group_id存入groups
              this.groups.push(i)
            }
          }
          // 2.获取已加入小组的会议室预订信息
          for (let i in this.groups) {
            for (let j in this.reservations) {
              if (this.groups[i].group_id === this.reservations[j].participant) {
                // 将group_id相等的reservations存入groups
                this.groups[i].location = this.reservations[j].location
                let date = formatDate(new Date(this.reservations[j].start_date))
                let temp = `${date} ${this.reservations[j].start_time.substring(0,5)}~${this.reservations[j].end_time.substring(0,5)}`
                this.groups[i].pre_time = temp
                break
              }
            }
          }
        }
        catch (e) {
          console.log("从/weapp/getgroups后端传过来的错误信息:", e)
          showModel('获取工作小组失败', '请重试哦~')
        }
      },
      // 请求近期20条的预订信息
      async getReservations () {
        // 初始化reservations
        this.reservations = []
        try {
          const data = {
            location: "9-506"
          }
          const res = await get('/weapp/getreservations', data)
          console.log('从后端/weapp/getreservations传过来的信息:', res.records)
          // 将reservations表中的所有记录存入this.reservations
          this.reservations = this.reservations.concat(res.records)
        }
        catch (e) {
          console.log("从/weapp/getreservations后端传过来的错误信息:", e)
          showModel('获取预定时间失败', '请重试哦~')
        }
      },
      // 新增小组
      async submmit () {
        this.changeBuild()      // 收起新增小组popup层
        if (this.groupid.length >= 1) {
          for (let group of this.allGroups) {
            if (group.group_id == this.groupid) {
              // 若新增的小组重名,显示提示信息
              showModel('新建失败', '该组名已存在')
              this.addgroup = false
              break
            }else{
              this.addgroup = true
            }
          }
        }
        else {
          showModel('新建失败', '小组名称需大于或等于1个字符')
        }
        if (this.addgroup) {
          const userinfo = wx.getStorageSync('userinfo')
          try {
            const data = {
              openid: userinfo.openId,
              group_id: this.groupid,
              leader: this.leader
            }
            const res = await post('/weapp/creategroups', data)
            console.log('从/weapp/creategroups后端传过来的信息:', res)
            showSuccess('新建成功')
            setTimeout(function(){
              wx.reLaunch({
                url: '/pages/workgroup/main'
              })
            },1000)
          }catch (e) {
            console.log("从后端传过来的错误信息:", e)
            showModel('新建失败', '请重试哦~')
          }
        }
      },
      showAddgroup () {
        wx.navigateTo({
          url: '/pages/addgroup/main'
        })
      }
  	},
    onShow () {
      this.groupid = ''
      // 请求近期20条的预订信息
      this.getReservations()
      // 请求工作小组
      this.getWorkgroup()
    }
  }
</script>

<style lang="scss">
.all {

}
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
.right {
  float: right;
  text-align: center;
  position: relative;
  right: 40rpx;
  border-radius: 50rpx;
  border: 2rpx solid #1b72cf;
  color: #1b72cf;
  padding: 10rpx 20rpx;
  font-size: 44rpx;
}
.contain{
  margin-top: 10px;
  background:#FFFFFF;
  font-size:15px;
  .row{
    padding: 0px 18px;
    border-top: 1px #E8E8E8 solid;
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
  .right2 {
    float: right;
    color: #C8C8C8;
    line-height:55px;
  }
  .left {
    width:80%;
  }
}

</style>
