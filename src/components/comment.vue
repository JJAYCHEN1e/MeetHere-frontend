<template>
  <el-dialog title="场馆详情" :visible.sync="currentDialogVisible">
    <span>
      <b>场馆编号：</b>
      {{ stadium.id }}
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
      <b>场馆地址：</b>
      {{ stadium.location }}
    </span>
    <br />
    <br />
    <span>
      <b>场馆描述：</b>
      {{ stadium.description }}
    </span>
    <br />
    <br />
    <span>
      <b>场馆类型：</b>
      {{ stadium.type }}
    </span>
    <br />
    <br />
    <span>
      <b>场馆价格：</b>
      {{ stadium.price }} 元/小时
    </span>
    <br />
    <br />
    <br />
    <el-divider></el-divider>
    <b>评论</b>
    <br />
    <br />
    <div v-for="(comment, o) in comments" :key="o">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ comment.userName }}</span>
          <br />
          <span>{{ comment.postTime }}</span>
          <el-button
            @click="deleteComment(comment.id)"
            style="float: right; padding: 3px 0"
            type="text"
            v-if="userId == comment.userId"
          >删除</el-button>
        </div>
        {{ comment.content }}
      </el-card>
      <br />
    </div>
    <el-divider></el-divider>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ userName }}</span>
        <el-button @click="postComment" style="float: right; padding: 3px 0" type="text">评论</el-button>
      </div>
      <textarea rows="3" cols="100" v-model="commentContent"></textarea>
    </el-card>
  </el-dialog>
</template>

<script>
import {
  getStadiumById,
  getCommentsByStadiumId,
  deleteComment,
  postComment
} from '@/api/getData'

export default {
  name: 'comment',
  props: ['dialogVisible', 'stadiumId'],
  data() {
    return {
      currentDialogVisible: this.dialogVisible,
      stadium: {},
      comments: [],
      userId: this.$store.state.userInfo.customerId,
      userName: this.$store.state.userInfo.userName,
      userComment: {},
      commentContent: ''
    }
  },
  watch: {
    dialogVisible: function(newValue) {
      this.commentContent = ''
      this.initData()
      this.currentDialogVisible = newValue
    },
    currentDialogVisible: function(newValue) {
      this.$emit('updateDialogVisible', newValue)
    }
  },
  methods: {
    async postComment() {
      if (this.commentContent == '') {
        this.emptyContentNotify()
      }
      const res = await postComment({
        stadiumId: this.stadiumId,
        customerId: this.userId,
        commentContent: this.commentContent
      })
      if (res.code == 0) {
        this.postCommentSuccessNotify()
        this.initCommentData()
        this.commentContent = ''
      } else {
        this.postCommentFailNotify()
      }
    },
    async deleteComment(id) {
      const res = await deleteComment({
        commentId: id
      })
      console.log(res)
      if (res.code == 0) {
        for (var i = 0; i < this.comments.length; i++) {
          var comment = this.comments[i]
          console.log(this.comments)
          console.log(comment)
          if (comment.id == id) {
            this.comments.splice(i, 1)
          }
          this.deleteCommentSuccessNotify()
        }
        this.$forceUpdate()
      } else {
        console.log('删除失败')
        this.deleteCommentFailNotify()
      }
    },
    deleteCommentFailNotify() {
      this.$notify.error({
        title: '错误',
        message: '删除失败'
      })
    },
    deleteCommentSuccessNotify() {
      this.$notify.info({
        title: '提示',
        message: '删除评论成功'
      })
    },
    emptyContentNotify() {
      this.$notify({
        title: '警告',
        message: '评论不可为空',
        type: 'warning'
      })
    },
    postCommentSuccessNotify() {
      this.$notify({
        title: '成功',
        message: '评论成功',
        type: 'success'
      })
    },
    postCommentFailNotify() {
      this.$notify.error({
        title: '错误',
        message: '发送失败'
      })
    },
    async initData() {
      const res = await getStadiumById({
        id: this.stadiumId
      })
      console.log(res)
      if (res.code == 0) {
        this.stadium.id = res.data.stadiumId
        this.stadium.name = res.data.stadiumName
        this.stadium.type = res.data.typeName
        this.stadium.location = res.data.location
        this.stadium.description = res.data.description
        this.stadium.price = res.data.price
      } else if (res.code == 1) {
        console.log('数据获取失败')
      }
      this.$forceUpdate()
      this.initCommentData()
    },
    async initCommentData() {
      const res = await getCommentsByStadiumId({
        stadiumId: this.stadiumId
      })
      console.log(res)
      if (res.code == 0) {
        this.comments = []
        res.data.forEach(item => {
          const element = {}
          element.userId = item.customerId
          element.userName = item.userName
          element.postTime = item.commentPostTime
          element.content = item.commentContent
          element.likes = item.likes
          element.id = item.commentId
          this.comments.push(element)
        })
      } else {
        console.log('数据获取失败')
      }
      this.$forceUpdate()
    }
  }
}
</script>

<style>
</style>