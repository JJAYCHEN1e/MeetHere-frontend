<template>
  <div style="height:100%">
    <head-top></head-top>
    <el-scrollbar class="m-scroll" style="height: 100%">
      <el-row>
        <el-col
          :span="4"
          v-for="(o, index) in 10"
          :key="o"
          :offset="index > 0 ? 2 : 0"
          style="margin: 50px"
        >
          <el-card :body-style="{ padding: '0px' }" shadow="hover" style="width: 250px">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px;">
              <span>中北自习室</span>
              <br />
              <span>中北自习室不允许携带食物入内</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="setCommentDialogVisible()">详情</el-button>
              </div>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="setBookingDialogVisible()">预约</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-scrollbar>
    <comment
      v-bind:dialogVisible="commentDialogVisible"
      v-on:updateDialogVisible="updateCommentDialogVisible"
    ></comment>
    <booking
      v-bind:dialogVisible="bookingDialogVisible"
      v-on:updateDialogVisible="updateBookingDialogVisible"
    ></booking>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import comment from "@/components/comment.vue";
import booking from "@/components/booking.vue";
export default {
  components: {
    headTop,
    comment,
    booking
  },
  data() {
    return {
      commentDialogVisible: false, 
      bookingDialogVisible: false
    };
  },
  methods: {
    setCommentDialogVisible() {
      this.commentDialogVisible = true;
    },
    updateCommentDialogVisible(newValue) {
      this.commentDialogVisible = newValue;
    },
    setBookingDialogVisible() {
      this.bookingDialogVisible = true;
    },
    updateBookingDialogVisible(newValue) {
      this.bookingDialogVisible = newValue;
    },
    test: function() {
      alert("you hit me??");
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
