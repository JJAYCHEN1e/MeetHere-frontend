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
              <i class="el-icon-document"></i>管理
            </template>
            <el-menu-item index="/manage/userList">用户列表</el-menu-item>
            <el-menu-item index="/manage/commentList">留言列表</el-menu-item>
            <el-menu-item index="/manage/bookingList">订单列表</el-menu-item>
            <el-menu-item index="/manage/newsList">新闻管理</el-menu-item>
            <el-menu-item index="/manage/stadiumList">场馆管理</el-menu-item>
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
