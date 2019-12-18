<template>
  <div class="header_container">

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="this.homePage">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta.slice(0,$route.meta.length-1)"
                          :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb>
      <el-button type="text"
                 class="log_out"
                 @click="logoutButtonClicked()">退出</el-button>
    </el-breadcrumb>
  </div>
</template>

<script>
import { baseImgPath } from '@/config/env'
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      baseImgPath
    }
  },
  created() {},
  computed: {
    ...mapState(['userType', 'adminInfo', 'homePage'])
  },
  methods: {
    ...mapMutations(['logout']),
    logoutButtonClicked() {
      if (this.userType == 0) this.$router.push('/')
      else if (this.userType == 1) this.$router.push('/adminLogin')
      this.logout()
      this.$message({
        type: 'success',
        message: '退出成功'
      })
    }
  }
}
</script>

<style lang="less">
@import '../style/mixin';
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}

.log_out {
  color: #579ef8;
  font-weight: 600;
  margin-right: 20px;
}
</style>
