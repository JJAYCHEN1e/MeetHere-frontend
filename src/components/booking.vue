<template>
  <el-dialog title="场馆预定" :visible.sync="currentDialogVisible">
    <span>
      <b>场馆编号：</b>
      {{ stadiumId }}
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
    <b>选择预约时间</b>
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
        </el-select>
        至
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
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  getStadiumById,
  getEmptyTimesByStadiumIdAndDate,
  addNewBooking
} from '@/api/getData'

export default {
  name: 'booking',
  props: ['dialogVisible', 'stadiumId'],
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
      this.initData()
    },
    currentDialogVisible: function(newValue) {
      this.$emit('updateDialogVisible', newValue)
    },
    daysAfterToday: function() {
      this.getEmptyTimes()
    },
    startTime: function() {
      this.updateEndTimes()
    },
    endTime: function() {
      if (this.endTime == null) return
      this.sumPrice = (this.endTime - this.startTime) * this.stadium.price
    }
  },
  methods: {
    async initData() {
      const res = await getStadiumById({
        id: this.stadiumId,
        customerId: this.userId
      })
      console.log(res)
      if (res.code == 0) {
        this.stadium.id = res.data.stadiumId
        this.stadium.name = res.data.stadiumName
        this.stadium.price = res.data.price
      } else if (res.code == 1) {
        console.log('数据获取失败')
      }
      this.daysAfterToday = null
      this.startTime = null
      this.endTime = null
      this.startTimes = []
      this.endTimes = []
      this.sumPrice = 0
      this.$forceUpdate()
    },
    async getEmptyTimes() {
      this.sumPrice = 0
      if (this.daysAfterToday == null) {
        return
      }
      this.startTime = null
      this.endTime = null
      this.startTimes = []
      this.endTimes = []
      const res = await getEmptyTimesByStadiumIdAndDate({
        stadiumId: this.stadiumId,
        daysAfterToday: this.daysAfterToday,
        customerId: this.userId
      })
      console.log(res)
      if (res.code == 0) {
        this.emptyTimes = []
        res.data.forEach(item => {
          const element = {}
          element.start = item.start
          element.end = item.end
          this.emptyTimes.push(element)
        })
      } else {
        console.log('数据获取失败')
      }
      for (var i = 0; i < this.emptyTimes.length; i++) {
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
      this.$forceUpdate()
    },
    async submit() {
      if (this.endTime == null) {
        this.newBookingIsNotCompleteNotify()
        return
      }
      const res = await addNewBooking({
        customerId: this.userId,
        stadiumId: this.stadiumId,
        daysAfterToday: this.daysAfterToday,
        startTime: this.startTime,
        endTime: this.endTime
      })
      console.log(res)
      if (res.code == 0) {
        this.addNewBookingSuccessNotify()
        this.initData()
      } else {
        this.addNewBookingFailNotify()
      }
    },
    addNewBookingSuccessNotify() {
      this.$notify({
        title: '成功',
        message: '添加新订单成功',
        type: 'success'
      })
    },
    addNewBookingFailNotify() {
      this.$notify.error({
        title: '错误',
        message: '添加新订单失败'
      })
    },
    newBookingIsNotCompleteNotify() {
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