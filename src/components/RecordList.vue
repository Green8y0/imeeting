<template>
	<div class="book-card">
		<div class="table" width="98%">
			<div class="tr">
				<div class="date">
					{{start_date}}&nbsp;{{start_time}}
				</div>
        <div class="date">
          {{end_date}}&nbsp;{{end_time}}
        </div>
				<div class="net" @click="changeShow()">
					<label v-if="note">{{note}}</label>
					<label v-else class="no-note">点击添加</label>
				</div>
				<label v-if="show_input">
					<div class="image" @click="cancel()">
						<img class="img" src="/static/images/quxiao.png">
					</div>
				</label>
				<label v-else>
					<div class="image" @click="changeShow()">
						<img class="img" :src="note?src:''">
					</div>
				</label>
			</div>
		</div>
		<div class="hide" v-if="show_input">
			<button class="btn" @click="updateNote()">
				<label v-if="record.note">修改</label>
				<label v-else>添加</label>
			</button>
      <button class="btn2" @click="deleteRecord">删除</button>
			<input v-model="note" class="input" maxlength="10" placeholder="最多输入10个字">
		</div>
	</div>
</template>

<script>
	import {formatDate} from '../utils/index.js'
	import {post, showModel, showSuccess} from '@/util'
	export default{
	  props: ['record'],
	  data () {
	    return {
      start_date: formatDate(new Date(this.record.start_date)),
      start_time: this.record.start_time,
      end_date: formatDate(new Date(this.record.end_date)),
      end_time: this.record.end_time,
      show_input: false,
      note: this.record.note,
      src: '/static/images/bianji.png'
	    }
	  },
	  methods: {
	    changeShow () {
	      this.show_input = !this.show_input
	    },
	    async updateNote () {
	      try {
	        const data = {
	          id: this.record.id,
	          note: this.note
	        }
	        const res = await post('/weapp/updatenote', data)
	        console.log('从后端返回的执行正确的信息是:', res)
	        this.show_input = false
	        this.record.note = this.note
	      } catch (e) {
	        showModel('失败', '请重新提交哦~')
	        console.log('从后端返回的执行错误的信息是:', e)
	      }
	    },
	    cancel () {
	      this.show_input = !this.show_input
	      this.note = this.record.note
	    },
      async deleteRecord () {
        try {
          const data = {
            id: this.record.id
          }
          const res = await post('/weapp/deleterecord', data)
          console.log('从后端返回的执行正确的信息是:', res)
          showSuccess('删除成功')
          this.showRecord()
        }catch (e) {
          showModel('删除失败', '请重新操作')
          console.log('从后端/weapp/deleterecord返回的执行错误的信息是:', e)
        }
      },
      showRecord () {
        wx.reLaunch({
          url: '/pages/record/main'
        })
      }
	  }
	}
</script>

<style lang="scss">
.book-card{
  background: #FFFFFF;
  margin-bottom:6px;
  .table {
    border: 0px solid darkgray;
    font-size: 14px;
    height: 42px;
    line-height:42px;
    .tr {
      display: flex;
      width: 100%;
    }
    .date{
      width: 40%;
      margin-left: 5px;
    }
    .busi{
      width: 10%;
      font-weight:bold;
    }
    .mark{
      width: 15%;
      margin-left: 20px;
      font-weight:bold;
    }
    .net{
      width: 16%;
      text-align:center;
      width:60px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      font-size: 14px;
      margin-left: 5px;
      line-height:42px;
      .no-note{
        text-decoration:underline;
        color:#C0C0C0;
        font-size: 13px;
      }
    }
    .image{
      padding-top:1px;
      float: right;
      margin-left: 5px;
    }
  }
  .hide{
    background: #F0F0F0;
    font-size: 15px;
    padding: 10px 10px 3px 30px;
    .input{
      width:60%;
      height:30px;
      background:#FFFFFF;
      border:1px solid black;
      border-radius: 5px;
      text-align:center;
    }
    .btn{
      color:white;
      background:#EA5A49;
      padding-left: 15px;
      margin-right:2px;
      border-radius: 5px;
      font-size: 13px;
      line-height: 30px;
      height: 30px;
      width: 18%;
      float:right;
    }
    .btn2{
      color:white;
      background:#EA5A49;
      padding-left: 15px;
      margin-right:6px;
      border-radius: 5px;
      font-size: 13px;
      line-height: 30px;
      height: 30px;
      width: 18%;
      float:right;
    }
  }
  .img{
    width: 13px;
    height: 13px;
    margin-right: 5px;
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>