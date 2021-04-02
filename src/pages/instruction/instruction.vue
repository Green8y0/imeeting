<template>
  <div class="instruction">
    <p class="content prompts">小程序操作简介</p>
    <!-- <p class="little-tip">1、会议室预订：</p>
    <p class="content tip"><label class="point">◉</label> 点击首页的"会议室预订"进入日期设置页面；</p>
    <p class="content tip"><label class="point">◉</label> 选择预订日期；</p>
    <p class="content tip"><label class="point">◉</label> 根据已预定的会议室时间段设置详细的会议信息；</p>
    <p class="content tip"><label class="point">◉</label> 设置的会议信息在"小组"页面可查看；</p> -->

    <p class="little-tip">1、会议室预订：</p>
    <p class="content tip"><label class="point">◉</label> 点击首页的"会议室预订"进入设置页面；</p>
    <p class="content tip"><label class="point">◉</label> 以小组为单位预订空闲会议室；</p>
    <p class="content tip"><label class="point">◉</label> 未加入任意一个小组的用户不可预订会议室；</p>
    <p class="content tip"><label class="point">◉</label> 选择预订日期；</p>
    <p class="content tip"><label class="point">◉</label> 根据已预定的会议室时间段设置详细的会议信息；</p>
    <p class="content tip"><label class="point">◉</label> 设置的会议信息在"小组"页面可查看；</p>
    
    <p class="little-tip">2、工作小组：</p>
    <p class="content tip"><label class="point">◉</label> 点击"小组"页面进入工作小组详情页面；</p>
    <p class="content tip"><label class="point">◉</label> 可在此页面跳转到"创建工作小组"或"加入工作小组"页面；</p>
    <p class="content tip"><label class="point">◉</label> 本页面下方会显示已加入的工作小组及该工作小组预订的会议室记录；</p>
    <p class="content tip"><label class="point">◉</label> 小组管理员选择对应小组可删除小组或新增管理员；</p>
    <p class="little-tip">3、小程序使用介绍</p>
    <p class="content prompts">（1）首页</p>
    <p class="content tip"><label class="point">◉</label> 会议室预订功能：进入空闲会议室预订界面</p>
    <img class="index-img" :src="src1">
    <p class="content prompts">（2）小组页面</p>
    <p class="content tip"><label class="point">◉</label> 添加备注：备注为空时，可以点击添加备注。</p>
    <p class="content tip"><label class="point">◉</label> 修改备注：备注添加完成后，可以修改。</p>
    <p class="content tip"><label class="point">◉</label> 删除记录：出现备注修改框时,点击"删除"可以当前记录。</p>
    <img class="index-img" :src="src2">
    <p class="content prompts">（3）我的页面</p>
    <p class="content tip"><label class="point">◉</label> 操作指引：跳转到当前小程序的"操作指引"页面</p>
    <!-- <p class="content tip"><label class="point">◉</label> 清空记录：清空所有的空闲时间段历史记录，清空后记录不能恢复，谨慎操作~</p> -->
    <p class="content tip"><label class="point">◉</label> 意见反馈：对于小程序的建议、问题反馈、合作信息等，可以通过这个页面提交。</p>
    <!-- <p class="content tip"><label class="point">◉</label> 
    工作小组：跳转到"工作小组"页面,提供创建、加入、搜索工作小组等功能</p> -->
    <img class="index-img" :src="src3">
    </div>
</template>

<script>
export default {
  data () {
    return {
      src1: '../../static/images/index.png',
      src2: '../../static/images/group.jpg',
      src3: '../../static/images/me.png'
    }
  }
}
</script>

<style lang='scss'>
.instruction {
  .title {
    background:#feb500;
    border-radius: 16rpx;
    font-size: 16px;
    .img {
      width:100%;
      height:120px;
    }
    .content-title {
      padding:4px 20px 10px 20px;
    }
  }
  .content {
    padding:4px 15px;
    font-size: 16px;
    font-weight:bold;
  }
  .little-tip {
    padding:15px 15px 3px 15px;
    font-size: 15px;
    font-weight:bold;
    color: #EA5149;
  }
  .tip {
    font-size: 15px;
    font-weight:normal;
    .point{
      color: #feb600;
    }
  }
  .prompts {
    font-size: 15px;
  }
  .index-img {
    display:block;
    margin:10px auto;
    height:560px;
    border-radius: 10px;
    margin-bottom:30px;
  }
}
</style>