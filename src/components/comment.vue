<template>
  <el-dialog title="场馆详情" :visible.sync="currentDialogVisible">
    <span>
      <b>场馆编号：</b>中文冒号
    </span>
    <br />
    <br />
    <span>
      <b>场馆名称：</b>你猜
    </span>
    <br />
    <br />
    <span>
      <b>场馆地址：</b>123
    </span>
    <br />
    <br />
    <span>
      <b>场馆描述：</b>
    </span>
    <br />
    <br />
    <span>
      <b>场馆类型：</b>
    </span>
    <br />
    <br />
    <span>
      <b>场馆价格：</b>
    </span>
    <br />
    <br />
    <br />
    <el-divider></el-divider>
    <b>评论</b>
    <br />
    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>喷子</span>
        <el-button style="float: right; padding: 3px 0" type="text" v-if="1 === 1">删除</el-button>
      </div>垃圾垃圾，这个场馆就是个垃圾
    </el-card>
    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>喷子</span>
        <el-button style="float: right; padding: 3px 0" type="text" v-if="1 === 1">删除</el-button>
      </div>呵，你怕不是个喷子
    </el-card>
    <br />
    <el-divider></el-divider>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>your name</span>
        <el-button style="float: right; padding: 3px 0" type="text">评论</el-button>
      </div>
      <textarea rows="3" cols="100">
请开始你的发言
      </textarea>
    </el-card>
  </el-dialog>
</template>

<script>
export default {
  name: 'comment',
  props: ['dialogVisible'],
  data() {
    return {
      currentDialogVisible: this.dialogVisible
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