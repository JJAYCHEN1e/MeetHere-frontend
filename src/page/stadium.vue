<template>
  <div style="height:100%">
    <head-top></head-top>
    <el-scrollbar class="m-scroll" style="height: 100%">
      <el-row>
        <el-col :span="4" v-for="(stadium, o) in stadiums" :key="o" style="margin: 50px">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" style="width: 250px">
            <img :src="stadium.picture" class="image" />
            <div style="padding: 14px;">
              <span>{{ stadium.name }}</span>
              <br />
              <span>{{ stadium.description }}</span>
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
import headTop from '../components/headTop'
import comment from '@/components/comment.vue'
import booking from '@/components/booking.vue'
import { getStadiumList } from '@/api/getData'
export default {
  components: {
    headTop,
    comment,
    booking
  },
  data() {
    return {
      commentDialogVisible: false,
      bookingDialogVisible: false,
      stadiumInfo: [
        {
          name: '中北自习室',
          description: '中北自习室不允许携带食物入内',
          picture: ''
        }
      ],
      stadiums: []
    }
  },
  created() {
    console.log('fjdiajfodjaifojsiodjo')
    this.getStadiums()
  },
  methods: {
    setCommentDialogVisible() {
      this.commentDialogVisible = true
    },
    updateCommentDialogVisible(newValue) {
      this.commentDialogVisible = newValue
    },
    setBookingDialogVisible() {
      this.bookingDialogVisible = true
    },
    updateBookingDialogVisible(newValue) {
      this.bookingDialogVisible = newValue
    },
    async getStadiums() {
      const res = await getStadiumList()
      console.log(res)
      if (res.code == 0) {
        this.stadiums = []
        res.data.forEach(item => {
          const element = {}
          element.name = item.stadiumName
          element.description = item.description
          element.picture = item.picture
          this.stadiums.push(element)
        })
      } else if (res.code == 1) {
        console.log('获取场馆列表失败')
      }
    },
    //it's a test...
    test: function() {
      console.log('1jidjsaofidj')
    }
  }
}
</script>

<style lang="less">
@import '../style/mixin';

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
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
