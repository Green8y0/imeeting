<template>
  <div class="all">
    <div>
      <van-divider contentPosition="center" customStyle="color: #1989fa; border-color: #1989fa; font-size: 18px;">
        预订信息
      </van-divider>
      <!-- 日历(calendar)区域 -->
      <van-calendar title="日历" class="calendar" :show="false" @close="changeShowDate"
                    @confirm="selectGroup" :poppable="false" :show-confirm="false"/>

      <!-- <van-action-sheet :show="show_screen" :actions="meetingroom"
      @close="changeScreen" @select="selectGroup" description="选择会议室"/> -->

    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../utils/index.js'
  import {showModel, showSuccess, get, post} from '@/util'

  export default {
    data() {
      return {
        show_screen: false,     // 控制"选择工作小组区域"的弹出层显示
        show_date: false,       // 选择的日期
        meetingroom: [{
          name: '9-506'
        },
          {
            name: '9-411'
          },
          {
            name: '9-205'
          }]        // 填写的会议信息
      }
    },
    methods: {
      changeScreen() {
        // 修改预订会议区域的显示参数show_screen,true为显示,false为隐藏
        this.show_screen = !this.show_screen
      },
      changeShowDate() {
        this.show_date = !this.show_date
      },
      // 设置需要预订会议的工作小组id
      selectGroup(e) {
        this.changeScreen()
        console.log('e.mp.detail = ', e.mp.detail);
        const msg = {
          date: formatDate(e.mp.detail),
          location: "9-506"
        }
        try {
          wx.navigateTo({
            url: '/pages/book/main?location=' + msg.location + '&date=' + msg.date
          });
        } catch (e) {
          showModel('跳转失败', '请重试')
          console.log('从后端返回的执行错误的信息是:', e)
        }

      }
    }
  }
</script>

<style lang="scss">
  .all {

  }

  .calendar {
    --calendar-height: 500px;
  }

  .radio-content {
    border-bottom: 1px dashed black;
    padding: 10 rpx 0 rpx 15 rpx 15 rpx;
    border-bottom: 1px solid black;
    border-bottom-style: dashed;
  }

  .radio-title {
    padding: 10 rpx 0 rpx 15 rpx 15 rpx;
    margin-bottom: 20 rpx;
    border-bottom: 1px solid black;
    text-align: center;
    background-color: #5f9ea0;
  }

  .the_show {
    background-color: #f2f2f2;
    border-bottom: 20 rpx solid #ffffff;
    padding-left: 30 rpx
  }

  .show_where {
    font-size: 43 rpx;
    color: black;
    margin-bottom: 20 rpx
  }

  .show_time {
    font-size: 32 rpx;
    margin-bottom: 12 rpx;
    color: #5a5858
  }

  .show_number {
    font-size: 32 rpx;
    margin-bottom: 8 rpx;
    color: #6f6666
  }

  .row {
    display: inline-block
  }

  .right {
    float: right;
    text-align: center;
    position: relative;
    right: 40 rpx;
    border-radius: 50 rpx;
    border: 2 rpx solid #1b72cf;
    color: #1b72cf;
    padding: 10 rpx 20 rpx;
    font-size: 32 rpx;
  }

  .but {
    color: white;
    background: rgb(175, 69, 92);
    padding-left: 15px;
    padding-top: 10px;
    border-radius: 20px;
    font-size: 30px;
    line-height: 30px;
    height: 50px;
    width: 100%;
  }

  .button {
    line-height: 30px;
    height: 35px;
    font-size: 15px;
    font-weight: bold;
    background: #5f9ea0;
    width: 100%;
  }

  .btn {
    padding-left: 140px;
    padding-right: 10px;
    float: center;
    background: #5f9ea0;
    border-radius: 10px;
    border: 1px dashed #282923;
  }

  .hide {
    background: #F0F0F0;
    font-size: 15px;
    padding: 10px 10px 3px 30px;
    border: 2 rpx solid #444141;
  }
</style>
