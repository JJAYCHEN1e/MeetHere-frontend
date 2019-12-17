<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4"
              style="min-height: 100%; background-color: #324057;">
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 background-color="#324057"
                 text-color="#fff"
                 active-text-color="#20A0FF"
                 router>
          <el-menu-item index="/customer/userInfo">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-plus"></i>我的
            </template>
            <el-menu-item index="/customer/userInfo">订单</el-menu-item>
            <el-menu-item index="/customer/userInfo">个人信息</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on"></i>场馆
            </template>
            <el-menu-item index="/customer/stadium">场馆介绍</el-menu-item>
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
