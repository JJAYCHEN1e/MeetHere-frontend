<template>
  <el-dialog title="订单修改" :visible.sync="currentDialogVisible">
    <span>
      <b>场馆编号：</b>
      {{ bookingMsg.stadiumId }}
    </span>
    <br />
    <br />
    <span>
      <b>场馆名称：</b>
      {{ stadium.name }}
    </span>
    <br />
    <br />
    <span>
      <b>场馆价格：</b>
      {{ stadium.price }} 元/小时
    </span>
    <br />
    <br />
    <el-divider></el-divider>
    <b>修改订单信息</b>
    <br />
    <br />
    <el-form label-position="left" label-width="130px">
      <el-form-item class="block" label="今日：">{{ today.getMonth() + 1 }} 月 {{ today.getDate() }} 日</el-form-item>
      <el-form-item class="block" label="选择日期：">
        <el-select v-model="daysAfterToday" placeholder="请选择预约日期">
          <el-option
            v-for="item in dates"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="block" label="选择始末时间：">
        <el-select v-model="startTime" placeholder="请选择开始时间">
          <el-option
            v-for="item in startTimes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>至
        <el-select v-model="endTime" placeholder="请选择结束时间">
          <el-option
            v-for="item in endTimes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="block" label="总额：">
        <span>{{ sumPrice }} 元</span>
      </el-form-item>
    </el-form>
    <br />
    <br />
    <div class="submit_button">
      <el-button type="primary" @click="submit">提交修改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  getStadiumById,
  getEmptyTimesByStadiumIdAndDate,
  updateBooking
} from '@/api/getData'

export default {
  name: 'updateBooking',
  props: ['dialogVisible', 'bookingMsg'],
  data() {
    return {
      currentDialogVisible: this.dialogVisible,
      today: new Date(),
      stadium: {},
      userId: this.$store.state.userInfo.customerId,
      daysAfterToday: null,
      startTime: null,
      endTime: null,
      sumPrice: 0,
      isInit: true,
      dates: [
        {
          value: 0,
          label: '今天'
        },
        {
          value: 1,
          label: '明天'
        },
        {
          value: 2,
          label: '后天'
        }
      ],
      startTimes: [],
      endTimes: [],
      emptyTimes: []
    }
  },
  watch: {
    dialogVisible: function(newValue) {
      this.currentDialogVisible = newValue
      if (newValue == true) {
        this.isInit = true
        this.daysAfterToday = null
        this.startTime = null
        this.endTime = null
        this.sumPrice = 0
        this.startTimes = []
        this.endTimes = []
        this.emptyTimes = []
        this.initData()
      } else if (newValue == false) {
        this.endTime = null
      }
    },
    currentDialogVisible: function(newValue) {
      this.$emit('updateDialogVisible', newValue)
    },
    daysAfterToday: function() {
      if (this.isInit) {
        console.log('daysAfterTodayisChanged')
        return
      }
      console.log('daysAfterTodayisChanged')
      this.getEmptyTimes()
    },
    startTime: function() {
      if (this.isInit) {
        console.log('startTimeChange' + this.startTime)
        return
      }
      console.log('startTimeChangeOut' + this.startTime)
      this.updateEndTimes()
    },
    endTime: function() {
      if (this.isInit) {
        console.log('endtimeChange' + this.endTime)
        this.isInit = false
        return
      }
      console.log('endtimeChangeOut')
      if (this.endTime == null) {
        console.log('endTimeIsNull')
        return
      }
      this.sumPrice = (this.endTime - this.startTime) * this.stadium.price
    }
  },
  methods: {
    async initData() {
      console.log('inininininini')
      console.log(this.bookingMsg)
      const res = await getStadiumById({
        id: this.bookingMsg.stadiumId,
        customerId: this.userId
      })
      console.log(res)
      if (res.code == 0) {
        this.stadium.id = res.data.stadiumId
        this.stadium.name = res.data.stadiumName
        this.stadium.price = res.data.price
      } else if (res.code == 1) {
        console.log('init数据获取失败')
      }
      this.daysAfterToday = this.bookingMsg.daysAfterToday
      this.getEmptyTimes()
      this.$forceUpdate()
    },
    async getEmptyTimes() {
      console.log('goIntoGetGetEmpty')
      this.sumPrice = 0
      if (this.daysAfterToday == null) {
        return
      }
      this.startTime = null
      this.endTime = null
      this.startTimes = []
      this.endTimes = []
      const res = await getEmptyTimesByStadiumIdAndDate({
        stadiumId: this.bookingMsg.stadiumId,
        daysAfterToday: this.daysAfterToday,
        customerId: this.userId
      })
      console.log(res)
      if (res.code == 0) {
        this.emptyTimes = []
        var start = this.bookingMsg.start
        var end = this.bookingMsg.end
        var currentUnit = {
          start: start,
          end: end
        }
        var flag = 0
        res.data.forEach(item => {
          const element = {}
          element.start = item.start
          if (
            this.daysAfterToday == this.bookingMsg.daysAfterToday &&
            flag == 0 &&
            item.start >= end
          ) {
            this.emptyTimes.push(currentUnit)
            flag = 1
          }
          element.end = item.end
          element.isVaild = true
          this.emptyTimes.push(element)
        })
        for (var i = 1; i < this.emptyTimes.length; i++) {
          if (this.emptyTimes[i].start == this.emptyTimes[i - 1].end) {
            this.emptyTimes[i].start = this.emptyTimes[i - 1].start
            this.emptyTimes[i - 1].isVaild = false
          }
        }
        for (var i = 0; i < this.emptyTimes.length; i++) {
          if (this.emptyTimes[i].isVaild == false) continue
          for (
            var count = this.emptyTimes[i].start;
            count < this.emptyTimes[i].end;
            count++
          ) {
            var startTime = {}
            startTime.value = count
            startTime.label = count + ':00'
            this.startTimes.push(startTime)
          }
        }
        console.log(this.emptyTimes)
        if (this.isInit) {
          this.startTime = this.bookingMsg.start
          this.updateEndTimes()
          this.endTime = this.bookingMsg.end
          this.sumPrice = this.bookingMsg.priceSum
        }
        this.$forceUpdate()
      } else {
        console.log('getEmptyTimes数据获取失败')
      }
    },
    async submit() {
      if (this.endTime == null) {
        this.updatedBookingIsNotCompleteNotify()
        return
      }
      const res = await updateBooking({
        customerId: this.userId,
        bookingId: this.bookingMsg.bookingId,
        stadiumId: this.bookingMsg.stadiumId,
        daysAfterToday: this.daysAfterToday,
        startTime: this.startTime,
        endTime: this.endTime
      })
      console.log(res)
      if (res.code == 0) {
        this.updateBookingSuccessNotify()
        this.initData()
      } else {
        this.updateBookingFailNotify()
      }
    },
    updateBookingSuccessNotify() {
      this.$notify({
        title: '成功',
        message: '添加新订单成功',
        type: 'success'
      })
    },
    updateBookingFailNotify() {
      this.$notify.error({
        title: '错误',
        message: '添加新订单失败'
      })
    },
    updatedBookingIsNotCompleteNotify() {
      this.$notify.error({
        title: '错误',
        message: '请填写完整订单日期和时间'
      })
    },
    updateEndTimes() {
      this.sumPrice = 0
      this.endTime = null
      this.endTimes = []
      for (var i = 0; i < this.emptyTimes.length; i++) {
        if (this.emptyTimes[i].isVaild == false) {
          console.log('被忽略的是' + i)
          continue
        }
        if (
          this.emptyTimes[i].start <= this.startTime &&
          this.startTime < this.emptyTimes[i].end
        ) {
          for (
            var count = this.startTime + 1;
            count <= this.emptyTimes[i].end;
            count++
          ) {
            var endTime = {}
            endTime.value = count
            endTime.label = count + ':00'
            this.endTimes.push(endTime)
          }
          break
        }
      }
      this.$forceUpdate()
    }
  }
}
</script>
<style>
.submit_button {
  text-align: center;
}
</style>