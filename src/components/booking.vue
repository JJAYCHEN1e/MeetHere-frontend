<template>
  <el-dialog title="场馆预定" :visible.sync="currentDialogVisible">
    <span>
      <b>场馆编号：</b>
      {{ stadiumId }}
    </span>
    <br />
    <br />
    <span>
      <b>场馆名称：</b> 
      {{ stadium.name }}
    </span>
    <br />
    <br />
    <span>
      <b>场馆价格：</b>
      {{ stadium.price }} 元/小时
    </span>
    <br />
    <br />
    <el-divider></el-divider>
    <b>选择预约时间</b>
    <br />
    <br />
    <span>今日：</span>
    {{ today.getMonth() + 1 }} 月 {{ today.getDate() }} 日
    <el-tabs type="border-card">
      <el-tab-pane label="今天">预约</el-tab-pane>
      <el-tab-pane label="明天">预约</el-tab-pane>
      <el-tab-pane label="后天">预约</el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import {
  getStadiumById
} from '@/api/getData'

export default {
  name: 'booking',
  props: ['dialogVisible', 'stadiumId'],
  data() {
    return {
      currentDialogVisible: this.dialogVisible,
      today: new Date(),
      stadium: {},
      userId: this.$store.state.userInfo.customerId
    }
  },
  watch: {
    dialogVisible: function(newValue) {
      this.currentDialogVisible = newValue
      this.initData()
    },
    currentDialogVisible: function(newValue) {
      this.$emit('updateDialogVisible', newValue)
    }
  },
  methods: {
    async initData() {
      const res = await getStadiumById({
        id: this.stadiumId,
        customerId: userId
      })
      console.log(res)
      if (res.code == 0) {
        this.stadium.id = res.data.stadiumId
        this.stadium.name = res.data.stadiumName
        this.stadium.price = res.data.price
      } else if (res.code == 1) {
        console.log('数据获取失败')
      }
      this.$forceUpdate()
    }
  }
}
</script>
<style>
</style>