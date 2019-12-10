<template>
  <div>
    <head-top></head-top>
    <el-row>
      <el-col :span="4" v-for="(o, index) in 10" :key="o" :offset="index > 0 ? 2 : 0" style="margin: 50px">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="width: 250px">
          <img src="./11.png" class="image" />
          <div style="padding: 14px;">
            <span>中北自习室</span> <br>
            <span>中北自习室不允许携带食物入内</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="test">详情</el-button>
            </div>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="test">预约</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import visitorPie from "@/components/visitorPie";
import { getUserCity } from "@/api/getData";
export default {
  data() {
    return {
      pieData: {}
    };
  },
  components: {
    headTop,
    visitorPie
  },
  mounted() {
    this.initData();
  },
  methods: {
    test: function() {
        alert("you hit me??")
    }, 
    async initData() {
      try {
        const res = await getUserCity();
        if (res.status == 1) {
          this.pieData = res.user_city;
        } else {
          throw new Error(res);
        }
      } catch (err) {
        console.log("获取用户分布信息失败", err);
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 250px;
  height: 250px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
