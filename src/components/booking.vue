<template>
  <el-dialog title="场馆预定" :visible.sync="currentDialogVisible">
    <span>
      <b>场馆编号：</b>{{ stadiumId }}
    </span>
    <br />
    <br />
    <span>
      <b>场馆名称：</b> 你猜
    </span>
    <br />
    <br />
    <span>
      <b>场馆价格：</b>
    </span>
    <br />
    <br />
    <el-divider></el-divider>
    <b>选择预约时间</b>
    <br />
    <br />
    <span>今日：</span> {{ today.getMonth() }} 月 {{ today.getDate() }} 日
    <el-tabs type="border-card">
      <el-tab-pane label="[today]">
      </el-tab-pane>
      <el-tab-pane label="明天">配置管理</el-tab-pane>
      <el-tab-pane label="后天">角色管理</el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
export default {
  name: 'booking',
  props: ['dialogVisible', 'stadiumId'],
  data() {
    return {
      currentDialogVisible: this.dialogVisible,
      today: new Date()
    }
  },
  watch: {
    dialogVisible: function(newValue) {
      this.currentDialogVisible = newValue
    },
    currentDialogVisible: function(newValue) {
      this.$emit('updateDialogVisible', newValue)
    }
  }
}
</script>
<style>
</style>