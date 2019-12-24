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
    <br />
    <br />
    <el-form label-position="left">
      <el-form-item class="block">
        <span class="demonstration">选择日期：</span>
        <el-select v-model="startTime" placeholder="请选择">
          <el-option
            v-for="item in dates"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="block">
        <span class="demonstration">选择始末时间：</span>
        <el-select v-model="startTime" placeholder="请选择">
          <el-option
            v-for="item in dates"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getStadiumById } from '@/api/getData'

export default {
  name: 'booking',
  props: ['dialogVisible', 'stadiumId'],
  data() {
    return {
      currentDialogVisible: this.dialogVisible,
      today: new Date(),
      stadium: {},
      userId: this.$store.state.userInfo.customerId,
      startTime: '',
      endTime: ''
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
        customerId: this.userId
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