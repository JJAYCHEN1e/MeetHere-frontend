<template>
  <div>
    <!-- ########### -->
    <!-- welcome page-->
    <!-- ########### -->

    <div class="fillin-contain" key="scale-down" :style="{backgroundImage:'url(' + bg + ')'}">
      <div class="info">
        <p class="FontStyle1">ORDER YOUR STADIUM RIGHT NOW!</p>
        <p class="FontStyle2">
          <strong>WELCOME TO MEETHERE!</strong>
        </p>
        <p class="FontStyle3">
          <strong>Developed by T.C.X.X.</strong>
        </p>

        <el-button type="primary" class="startBtn" @click="btnClick()">
          <strong>ORDER NOW</strong>
        </el-button>
        <el-button type="warning" class="log_out" @click="logoutButtonClicked()">
          <strong>SIGN OUT</strong>
        </el-button>
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
          <el-carousel-item v-for="anews in news" :key="anews.value">
            <div class = "newsCarousel">
              <div class = 'newsText'>
              <h3 class = 'newsTextTitle'>{{anews.title}}</h3>
              <p class = 'newsTextContent'>{{anews.text}}</p>
              <p class = 'newsTextTime'>{{anews.time}}</p>
              </div>
              </div>
          </el-carousel-item>
        </el-carousel>
        <br />
        <br />
      </div>
    </div>
  <div class = 'fill2'>
    <el-table :data="newsTable"
              highlight-current-row
              style="width: 100%">
        
        <el-table-column property="title"
                         label="标题"
                         width="180">
        </el-table-column>
        <el-table-column property="text"
                         label="内容">
          
        </el-table-column>
        <el-table-column property="time"
                         label="发布时间"
                         width="180">
        </el-table-column>
    </el-table>
  </div>
  <div class="Pagination"
           style="text-align: left;margin-top: 10px;">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-size="10"
                       layout="total, prev, pager, next"
                       :total="count">
        </el-pagination>
      </div>



  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { 
  listNewsItem,
  getNewsCount
  } from '@/api/getData'

export default {
  created() {
    this.initData()
  },
  data() {
    return {
      bg: require('../../static/BASKETBALL.jpeg'),
      news: [],
      newsTable:[],
      offset: 0,
      limit: 10,
      currentPage: 1,
      count: 0
    }
  },
  computed: {
    ...mapState(['userType', 'adminInfo', 'homePage'])
  },
  methods: {

    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getNews()
    },
    

    btnClick() {
      this.$router.push('stadium')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
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
    },
    async initData() {
      const res = await getNewsCount({
        userId: this.$store.state.userInfo.customerId
      })
      if (res.code == 0) {
          this.count = parseInt(res.data['count'])
        } else {
          throw new Error('获取数据失败')
        }
      console.log(this.count)
      this.getNewsPage()
      this.getNewsTable()
    },
    async getNewsPage(){
      const res = await listNewsItem({
        offset: 0,
        limit: 5,
        userId: this.$store.state.userInfo.customerId
      })
      console.log(res)
      if (res.code == 0) {
        this.news = []
        res.data.forEach(item => {
          const elemement = {}
          elemement.newsId = item.newsId
          elemement.adminId = item.adminId
          elemement.title = item.newsTitle
          elemement.text = item.newsContent
          elemement.time = item.newsPostTime
          // elemement.final = '<div>'+item.newsTitle+'<br/>'+item.newsContent+'<br/>'+item.newsPostTime+'</div>'
          // const tag = {}
          // tag.text = elemement.title +'\n'+ elemement.text + elemement.time
          
          this.news.push(elemement)
        })
      } else {
        console.log('获取失败', err)
      }
    },
    async getNewsTable(){
        const res = await listNewsItem({
          offset: this.offset,
          limit: this.limit,
          userId: this.$store.state.userInfo.customerId
        })
        console.log(res)
        if(res.code ==0 ){
          this.newsTable = []
          res.data.forEach(item => {
            const tableItem ={}
          tableItem.newsId = item.newsId
          tableItem.adminId = item.adminId
          tableItem.title = item.newsTitle
          tableItem.text = item.newsContent
          tableItem.time = item.newsPostTime
          this.newsTable.push(tableItem)
          console.log("test here")
          })
        }else if(res.code == 1){
          console.log("获取失败")
        }
    }
  }
}
</script>

<style>
.newsText{
  
  width:80%;
  height:260px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.newsTextTitle{
  width: 100%;
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  height:20px;
}


.newsTextContent{
  line-height: 30px;
  height : 210px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;/*垂直居中*/
  justify-content: center; /* 水平居中 */
  align-items: center;
}
.newsTextTime{
  font-size: 10px;
  text-align: center;
  vertical-align: middle;
  height:60;
}

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
  width: 160px;
  background-size: 100% auto;
}

.log_out {
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

.el-carousel__item div {
  text-align: center;
  color:antiquewhite;
  font-size: 18px;
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