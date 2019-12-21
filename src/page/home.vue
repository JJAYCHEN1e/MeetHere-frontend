<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">数据统计</header>
    </section>
    <tendency :sevenDate='sevenDate'
              :sevenDay='sevenDay'></tendency>
  </div>
</template>

<script>
import headTop from '../components/headTop'
import tendency from '../components/tendency'
import dtime from 'time-formater'
import {
  getTotalBookingCountForDay,
  getToalBookingCountForStadiums
} from '@/api/getData'
export default {
  data() {
    return {
      sevenDay: [],
      sevenDate: [],
      stadiums: [],
      stadiumBookingCount: []
    }
  },
  components: {
    headTop,
    tendency
  },
  mounted() {
    for (let i = 6; i > -1; i--) {
      const date = dtime(new Date().getTime() - 86400000 * i).format(
        'YYYY-MM-DD'
      )
      this.sevenDay.push(date)
    }
    this.getSevenData()
  },
  computed: {},
  methods: {
    async getSevenData() {
      const apiArr = []
      this.sevenDay.forEach(item => {
        apiArr.push(
          getTotalBookingCountForDay({
            date: item,
            adminId: this.$store.state.adminInfo.adminId
          })
        )
      })

      Promise.all(apiArr)
        .then(res => {
          const resArr = []
          res.forEach((item, index) => {
            if (item.code == 0) {
              resArr[index] = item.data
            }
          })
          this.sevenDate = resArr
        })
        .catch(err => {
          console.log(err)
        })

      const res = await getToalBookingCountForStadiums({
        adminId: this.$store.state.adminInfo.adminId
      })
      if (res.code == 0) {
        this.stadiums = res.data['stadiums']
        this.stadiumBookingCount = res.data['count']
      } else if (res.code == 1) {
        console.log('获取场馆订单数据失败')
      }
    }
  }
}
</script>

<style lang="less">
@import '../style/mixin';
.data_section {
  padding: 20px;
  margin-bottom: 40px;
  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    .data_num {
      color: #333;
      font-size: 26px;
    }
    .head {
      border-radius: 6px;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }
  .today_head {
    background: #ff9800;
  }
  .all_head {
    background: #20a0ff;
  }
}
.wan {
  .sc(16px, #333);
}
</style>
