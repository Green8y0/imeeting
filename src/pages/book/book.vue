<template>
  <div class="all">
    <van-cell title="预订会议室" is-link @click="changeScreen" />

    <!-- 已预定信息区域 -->
    <div class="reserved-div" v-for="(item,index) in reserved" :key="index">
      <!-- 已预定信息日期 -->
      <div class="reserved-date">
        {{item.start_date}}
      </div>

      <div class="reserved-detail">
        <!-- 已预定信息时间图标 -->
        <van-icon name="underway-o" size="50rpx" />

        <!-- 已预定信息具体时间 -->
        <div class="reserved-time">
          <div>{{item.start_time}}</div>
          <div>{{item.end_time}}</div>
        </div>

        <!-- 已预定信息对象 -->
        <div class="reserved-content">
          <div class="reserved-groupid">小组:&nbsp;&nbsp;{{item.participant}}</div>
          <div class="reserved-topic">主题:&nbsp;&nbsp;{{item.topic}}</div>
        </div>
      </div>
    </div>

    <!-- 预订信息弹出层popup -->
    <van-popup custom-style="height: 70%;" :show="show_screen" @close="changeScreen" position="top">
      <!-- 会议开始结束时间设置区域 -->
      <div>
        <!-- 会议日期,不可更改 -->
        <van-cell-group>
          <van-field :value="meetingroom.start_date" label="会议日期:" required="true" readonly="true"
                     input-align="right"/>
        </van-cell-group>

        <!-- 会议开始时间设置区域,弹出层popup -->
        <van-cell title="会议开始时间" is-link :value="meetingroom.start_time"
                  @click="changeShowStart" required="true"/>
        <van-popup :show="show_start" position="bottom" custom-style="height:40%;" z-index=101
                   @close="changeShowStart">
          <div>
            <van-datetime-picker type="time" :value="meetingroom.start_time"
                                 :min-hour="minHour" :max-hour="maxHour" :filter="filter"
                                 @cancel="changeShowStart" @confirm="inputStartTime"/>
          </div>
        </van-popup>

        <!-- 会议结束时间设置区域,弹出层popup -->
        <van-cell title="会议结束时间" is-link :value="meetingroom.end_time"
                  @click="changeShowEnd" required="true"/>
        <van-popup :show="show_end" position="bottom" custom-style="height:40%;" z-index=101
                   @close="changeShowEnd">
          <div>
            <van-datetime-picker type="time" :value="meetingroom.end_time"
                                 :min-hour="minHour" :max-hour="maxHour" :filter="filter"
                                 @cancel="changeShowEnd" @confirm="inputEndTime"/>
          </div>
        </van-popup>
      </div>

      <!-- 会议对象弹出层 -->
      <div>
        <van-cell title="会议对象:" is-link :value="meetingroom.participant"
                  @click="changeShowParticipant" required="true"/>
        <van-action-sheet :show="show_participant" :actions="meetingObjs"
                          @close="changeShowParticipant" @select="selectGroup" description="选择会议对象"/>
      </div>

      <!-- 会议主题、地址设置区域 -->
      <div>
        <van-cell-group>
          <!-- 会议地址区域,不可更改 -->
          <van-field :value="meetingroom.location" label="会议地址:" readonly="true" required="true"
                     input-align="right"/>
          <van-field :value="meetingroom.topic" label="会议主题:" placeholder="请输入会议主题..."
                     input-align="right" required="true" @change="changeTopic"/>
          <van-field :value="meetingroom.content" label="会议内容:" placeholder="请输入会议内容..."
                     type="textarea" input-align="right" autosize @change="changeContent"/>
        </van-cell-group>
      </div>

      <!-- 预订会议室按钮区域 -->
      <div>
        <van-button type="info" size="large" @click="reserve">提交预订信息</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import {formatDate, formatLocalTime} from '../../utils/index.js'
  import {showSuccess, showModel, post, get} from '@/util'

  export default {
    data() {
      return {
        show_screen: false,     // 控制"选择工作小组区域"的弹出层显示
        show_date: false,       // 选择的日期
        show_participant: false,
        groups: [],             // 用户加入了的所有工作小组id
        meetingObjs: [],        // 会议对象选项
        reserved: [],           // 数据库中在所选日期当天已预约的信息
        allReservedDate: [],
        meetingroom: {},        // 填写的会议信息
        nextWeekReserved: [],   // 下周例会信息
        show_start: false,      // 控制"选择会议开始时间区域"的弹出层显示
        show_end: false,
        minHour: 9,
        maxHour: 21,
        checkTag: false,
        temp: {},
        filter(type, options) {
          if (type === 'minute') {
            return options.filter((option) => option % 5 === 0);
          }
          return options;
        }
      }
    },
    methods: {
      async reserve() {
        this.checkError()
        if (this.checkTag) {
          const data = this.meetingroom
          console.log('reserve中的data=', data)
          try {
            const res = await post('/weapp/createreservations', data)
            console.log('从后端传过来的信息', res)
            showSuccess('添加成功')
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/workgroup/main'
              })
            }, 1000)
          } catch (e) {
            showModel('预订失败', '请重试哦~')
            console.log('从后端返回的执行错误的信息是:', e)
          }
        } else {
          showModel('会议信息填写错误', '请重试哦~')
        }
      },
      checkError() {
        this.checkTag = true
        console.log('checkError中的this.meetingroom=', this.meetingroom)
        if (this.meetingroom.start_time >= this.meetingroom.end_time) {
          showModel('会议时间设置错误', '请重新填写')
          this.checkTag = false
        }
        if (this.meetingroom.topic === '') {
          showModel('会议主题不可为空', '请重新填写')
          this.checkTag = false
        }
        if (this.meetingroom.location === '') {
          showModel('会议地址不可为空', '请重新填写')
          this.checkTag = false
        }
        if (this.meetingroom.participant === '') {
          showModel('会议对象不可为空', '请重新填写')
          this.checkTag = false
        }
      },
      changeScreen() {
        // 修改预订会议区域的显示参数show_screen,true为显示,false为隐藏
        this.show_screen = !this.show_screen
      },
      changeShowStart() {
        this.show_start = !this.show_start
      },
      changeShowEnd() {
        this.show_end = !this.show_end
      },
      changeShowParticipant() {
        this.show_participant = !this.show_participant
      },
      confirmDate() {
        // 日期选择完成后触发
        this.changeScreen()
      },
      inputStartTime(e) {
        // 修改会议开始时间
        this.meetingroom.start_time = e.mp.detail
        console.log('会议开始时间:', this.meetingroom.start_time)
        this.changeShowStart()
      },
      inputEndTime(e) {
        // 修改会议结束时间
        this.meetingroom.end_time = e.mp.detail
        console.log('会议结束时间:', this.meetingroom.end_time)
        this.changeShowEnd()
      },
      changeLocation(e) {
        this.meetingroom.location = e.mp.detail
      },
      changeTopic(e) {
        this.meetingroom.topic = e.mp.detail
      },
      changeContent(e) {
        this.meetingroom.content = e.mp.detail
      },
      selectGroup(e) {
        // 设置需要预订会议的工作小组id
        this.meetingroom.participant = e.mp.detail.name
        console.log('selectGroup()中location=', this.meetingroom.participant)
      },
      // 初始化预订会议信息
      initMeeting(e) {
        let now = new Date()
        this.meetingroom = {
          location: e.location,
          topic: '例会',
          content: '',
          start_date: e.date,
          start_time: formatLocalTime(now, 'time'),
          end_time: '21:00',
          participant: ''
        }
      },
      // 清除上周预订记录
      async clearPreReserved(){
        let now = new Date()
        let num = 24 * 60 * 60 * 1000
        let delArr = [] // 要删除的数组
        for (let item of this.allReservedDate) {
          let pass = new Date(item.date)
          const msg = {
            id: item.id,
            diffDays: (now - pass) / num
          }
          if (msg.diffDays > 7){
            delArr.push(msg.id)
          }
          // console.log(`id = ${msg.id}, 相差天数 = ${msg.diffDays}, 是否超过一周 = ${msg.diffDays > 7}`);
        }

        // 请求数据库
        if (delArr.length > 0) {
          try {
            const data = delArr
            const res = await post('/weapp/deletereservations', data)
            console.log('从后端/weapp/deletereservations传过来的信息', res)
          }catch (e) {
            console.log("从/weapp/deletereservations后端传过来的错误信息:", e)
          }
        }
      },
      // 获得最近20条会议预订信息
      async getReservations() {
        try {
          const data = {
            group_id: this.meetingroom.participant
          }
          const res = await get('/weapp/getreservations', data)
          console.log('从后端/weapp/getreservations传过来的信息:', res.records)
          // 查找当天已被预订的时间段
          for (let i of res.records) {
            this.allReservedDate.push({
              id: i.id,
              date: i.start_date
            })
            if (this.meetingroom.start_date === formatDate(new Date(i.start_date))) {
              // 当天的已预定时间段存入this.reserved[]
              i.start_date = formatDate(new Date(i.start_date))
              i.start_time = i.start_time.substring(0,5)
              i.end_time = i.end_time.substring(0,5)
              this.reserved.push(i)
            }
          }
          await this.clearPreReserved()
        } catch (e) {
          console.log("从/weapp/getreservations后端传过来的错误信息:", e)
          showModel('获取工作小组失败', '请重试哦~')
        }
      },
      // 获取已加入的小组
      async getGroups() {
        try {
          const userinfo = wx.getStorageSync('userinfo')
          const data = {
            openid: userinfo.openId
          }
          const res = await get('/weapp/getgroups', data)
          console.log('从后端/weapp/getgroups传过来的信息:', res.records)
          // 1.获取已加入的小组信息,设置会议对象
          for (let i of res.records) {
            if (i.openid === userinfo.openId) {
              // 将open_id相等的group_id存入groups
              this.groups.push(i)
              const option = {
                name: i.group_id
              }
              this.meetingObjs.push(option)
            }
          }
        } catch (e) {
          console.log("从/weapp/getgroups后端传过来的错误信息:", e)
          showModel('获取工作小组失败', '请重试哦~')
        }
      }
    },
    onLoad(options) {
      this.show_screen = false
      this.groups = []
      this.reserved = []
      this.initMeeting(options)       // 初始化预订会议信息
      this.getGroups()                // 获取当前账号所加入的工作小组
      this.getReservations()          // 获取已预定的会议信息
    }
  }
</script>

<style lang="scss">
  .all {
    width: 100%;
    height: 100%;
  }

  .reserved-div {
    width: 100%;
    /*height: 20%;*/
    color: #00000090;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
  }

  .reserved-date {
    width: 100%;
    height: 20%;
    font-size: 40 rpx;
    margin-left: 20 rpx;
  }

  .reserved-detail{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .reserved-icon {
    width: 10%;
  }

  .icon {
    width: 50 rpx;
    height: 50 rpx;
    display: inline-block;
    vertical-align: middle;
  }

  .reserved-time {
    float: left;
    width: 20%;
    padding-left: 20 rpx;
    vertical-align: text-bottom;
  }

  .reserved-content {
    float: left;
    width: 60%;
    vertical-align: text-bottom;
  }

  .reserved-groupid {
    font-size: 40 rpx;
    color: black;
  }

  .reserved-topic {
    font-size: 40 rpx;
    color: black
  }
</style>
