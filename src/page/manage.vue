<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4"
              style="min-height: 100%; background-color: #324057;">
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 background-color="#324057"
                 text-color="#fff"
                 active-text-color="#20A0FF"
                 router>
          <el-menu-item index="/manage">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>场馆
            </template>
            <el-menu-item index="/manage/userList">用户列表</el-menu-item>
            <el-menu-item index="/manage/commentList">留言列表</el-menu-item>
            <el-menu-item index="/manage/bookingList">订单列表</el-menu-item>
            <el-menu-item index="/manage/adminList">管理员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-plus"></i>我的
            </template>
            <el-menu-item index="/manage/commentList">订单</el-menu-item>
            <el-menu-item index="/manage/userInfo">个人信息</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on"></i>场馆
            </template>
            <el-menu-item index="/manage/stadium">场馆介绍</el-menu-item>
            <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-edit"></i>编辑
            </template>
            <!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
            <el-menu-item index="/manage/vueEdit">文本编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>设置
            </template>
            <el-menu-item index="/manage/adminSet">管理员设置</el-menu-item>
            <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-warning"></i>说明
            </template>
            <el-menu-item index="/manage/explain">说明</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20"
              style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    defaultActive: function() {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>


<style lang="less" scoped>
@import '../style/mixin';
.manage_page {
}
</style>
