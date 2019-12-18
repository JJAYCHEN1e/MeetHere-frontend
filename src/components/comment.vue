<template>
  <el-dialog title="场馆详情" :visible.sync="currentDialogVisible">
    <span>
      <b>场馆编号：</b>{{ stadium.id }}
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
import { getStadiumById } from '@/api/getData'

export default {
  name: 'comment',
  props: ['dialogVisible', 'stadiumId'],
  data() {
    return {
      currentDialogVisible: this.dialogVisible,
      stadium: {}
    }
  },
  updated() {
    this.initData();
  },
  watch: {
    dialogVisible: function(newValue) {
      // this.initData()
      this.currentDialogVisible = newValue
    },
    currentDialogVisible: function(newValue) {
      // this.initData();
      this.$emit('updateDialogVisible', newValue)
    }
  },
  methods: {
    async initData() {
      const res = await getStadiumById({
        id: this.stadiumId
      })
      console.log(res)
      if(res.code == 0) {
        this.stadium.id = res.data.stadiumId
      }
    }
  }
}
</script>

<style>
</style>