<template>
  <div>
    <!-- ########### -->
    <!-- welcome page-->
    <!-- ########### -->

    <div class="fillin-contain" key="scale-down"
        :style="{backgroundImage:'url(' + bg + ')'}">
        

      <div class="info">
        <p class="FontStyle1">ORDER YOUR STADIUM RIGHT NOW!</p>
        <p class="FontStyle2">
          <strong>WELCOME TO MEETHERE!</strong>
        </p>
        <p class="FontStyle3">
          <strong>Developed by T.C.X.X.</strong>
        </p>

        <el-button type="primary" class="startBtn" @click="btnClick()"><strong>ORDER NOW</strong></el-button>
        <el-button type="warning" 
                 class="log_out"
                 @click="logoutButtonClicked()"><strong>SIGN OUT</strong></el-button>

      </div>
    </div>


    <!-- ############ -->
    <!--  news  page  -->
    <!-- ############ -->

    <div class="fill2">
      <!-- :style="{backgroundImage: 'url(../../static/TENNIS.jpeg)',}" -->
      <div class="info">
        <br />
        <i class="el-icon-arrow-up"></i>
        <p class="FontStyle4">Latest News</p>
        <i class="el-icon-arrow-down"></i>
        <br />
        <br />

        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <br />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      bg: require('../../static/BASKETBALL.jpeg')
    }
  },
  computed: {
    ...mapState(['userType', 'adminInfo', 'homePage'])
  },
  methods: {
    btnClick() {
      this.$router.push('stadium')
    },
  
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

<style>
.el-icon-arrow-up {
  color: rgb(221, 200, 200);
}
.el-icon-arrow-down {
  color: white;
  line-height: 20px;
}
.fill2 {
  width: 100%;
  background-size: 100% auto;
  padding: auto;
  background: #181b1f;
  height: auto;
}
.startBtn {
  width:160px;
  background-size: 100% auto;
}

.log_out{
  
  width: 160px;
  background-size: 100% auto;

}

.fillin-contain {
  width: 100%;
  background-size: 100% auto;
  padding: 26%;
  height: 0px;
}
/* .fillin-contain:before{content: "", display: block, padding-top:100% } */
.info {
  height: 100%;
  width: 100%;
  text-align: center;
}

.fillin-contain {

  height: 100%;
  width: auto;
}
.FontStyle1 {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: aliceblue;
  line-height: 30px;
}
.FontStyle2 {
  width: 100%;
  text-align: center;
  font-size: 39px;
  color: aliceblue;
  vertical-align: bottom;
  line-height: 40px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.FontStyle3 {
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: aliceblue;
  vertical-align: bottom;
  font-family: 'Courier New', Courier, monospace;
  line-height: 40px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color:#181b1f;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color:#181b1f;
}
.newsTab {
  width: 80%;
  height: auto;
  margin: 0 auto;
  border-radius: 0px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  background: #181b1f;
}
.FontStyle4 {
  width: 100%;
  text-align: center;
  font-size: 35px;
  color: white;
  vertical-align: bottom;
  font-family: Georgia, 'Times New Roman', Times, serif;
  line-height: 70px;
}
</style>