<template>
  <div>
    <!-- 查找小组搜索框 -->
  	<van-search :value="groupid" shape="round" backgroup="#4fc08d" placeholder="请输入小组ID"
  	show-action @search="onSearch" @cancel="onCancel"/>

    <div class="contain">
      <div class="row" v-for="(group,index) in groups" @click="addGroups" :key="index">
        <label class="left">
          <img class="img" src="/static/images/addgroup.png">
        </label>
        <label class="name">&nbsp;&nbsp;工作小组:{{group.group_id}}</label>
        <label class="right">+</label>
      </div>
    </div>
  </div>
</template>

<script>
  import {showSuccess, showModel, post, get} from '@/util'
  export default{
  	data () {
  	  return {
  	  	groupid: '',
        groups: [],               // 查询到的小组
        allGroups: [],            // 已存在的所有小组
        change: false
  	  }
  	},
  	methods: {
  	  onSearch (e) {
        this.groupid = e.mp.detail
        this.getGroups()
  	  },
  	  onCancel (e) {
        this.groupid = ''
        console.log('onCancel()传过来的this.groupid=', this.groupid)
  	  },
      // 获取查询到的小组与所有已存在小组
      async getGroups () {
        try {
          const data = {
            group_id: this.groupid
          }
          const res = await get('/weapp/getgroups', data)
          console.log('从后端/weapp/getgroups传过来的信息:', res.records)
          this.allGroups = res.records
          for (let group of this.allGroups) {
            if (group.group_id === this.groupid) {
              this.groups.push(group)
            }
          }
        }catch (e) {
          console.log("从/weapp/getgroups后端传过来的错误信息:", e)
          showModel('无此工作小组', '请重新搜索')
        }
      },
      async addGroups () {
        const userinfo = wx.getStorageSync('userinfo')
        try {
          // 遍历已存在小组名单, 查看是否已加入
          for (let group of this.allGroups) {
            if (userinfo.openId !== group.openid) {
              // 未加入该工作小组
              this.change = true
            }
          }
          const data = {
            openid: userinfo.openId,
            group_id: this.groupid
          }
          if (this.change) {
            const res = await post('/weapp/creategroups', data)
            console.log('从后端/weapp/creategroups传过来的信息:', res)
            showSuccess('加入成功')
            setTimeout(function(){
              wx.switchTab({
                url: '/pages/workgroup/main'
              })
            },1000)
          }
          else {
            showModel('已加入工作小组', '不可重复加入')
          }
        }catch (e) {
          console.log("从/weapp/creategroups后端传过来的错误信息:", e)
          showModel('加入失败', '请重新操作')
        }
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
</style>
