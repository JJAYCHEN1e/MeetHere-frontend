<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData"
                :row-class-name="rowClassName"
                style="width: 100%">
        <el-table-column label="订单 ID"
                         prop="bookingId"
                         width="100">
        </el-table-column>
        <el-table-column label="用户名(ID)"
                         prop="customerName">
        </el-table-column>
        <el-table-column label="场馆(ID)"
                         prop="stadiumName">
        </el-table-column>
        <el-table-column label="总价格"
                         prop="priceSum"
                         width="100">
        </el-table-column>
        <el-table-column label="开始时间"
                         prop="startTime">
        </el-table-column>
        <el-table-column label="结束时间"
                         prop="endTime">
        </el-table-column>
        <el-table-column label="支付状态"
                         prop="paidState"
                         class="paid"
                         width="100">
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <el-input v-model="search"
                      size="mini"
                      placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination"
           style="text-align: left;margin-top: 10px;">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-size="20"
                       layout="total, prev, pager, next"
                       :total="count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from '../components/headTop'
import { getBookingList, getBookingCount, deleteBooking } from '@/api/getData'
import dtime from 'time-formater'

export default {
  data() {
    return {
      tableData: [
        // {
        //   bookingId: 1,
        //   customerName: '用户名最多八个字(12)',
        //   stadiumName: '中北羽毛球馆(2)',
        //   priceSum: '150¥',
        //   startTime: '2019-12-18 15:00',
        //   endTime: '2019-12-18 16:00',
        //   paid: '未支付'
        // }
      ],
      currentTime: dtime().format('YYYY-MM-DD HH:MM'),
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1
    }
  },
  components: {
    headTop
  },
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    rowClassName({ row, rowIndex }) {
      if (row.endTime < this.currentTime) {
        // 结束时间小于当前时间
        // if (row.paid == 0) return 'failure'
        return 'finished'
      }
      if (row.startTime > this.currentTime) {
        // 未来的
        if (row.paid == 'false') return 'futureUnpaid'
      } else {
        // 进行中的
        //如果已经支付
        if (row.paid == 'true') return 'undergoing'
        //如果还没支付，那么失效
        else return 'failure'
      }
    },
    async initData() {
      try {
        const res = await getBookingCount({
          adminId: this.$store.state.adminInfo.adminId
        })
        if (res.code == 0) {
          this.count = parseInt(res.data['count'])
        } else if (res.code == 1) {
          throw new Error('获取数据失败')
        }
        this.getBookingData()
      } catch (err) {
        console.log('获取数据失败', err)
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getBookingData()
    },
    handleDelete(index, row) {
      this.$confirm('确认删除订单?').then(async () => {
        const res = await deleteBooking({
          bookingId: row.bookingId,
          adminId: this.$store.state.adminInfo.adminId
        })
        console.log(res)
        if (res.code == 0) {
          this.tableData.splice(index, 1)
        } else if (res.code == 1) {
          console.log('删除失败')
        }
      })
    },
    async getBookingData() {
      const res = await getBookingList({
        offset: this.offset,
        limit: this.limit,
        adminId: this.$store.state.adminInfo.adminId
      })
      if (res.code == 0) {
        this.tableData = []
        res.data.forEach(item => {
          const tableItem = {}
          tableItem.bookingId = item.bookingId
          tableItem.customerName =
            item.customerName + '(' + item.customerId + ')'
          tableItem.stadiumName = item.stadiumName + '(' + item.stadiumId + ')'
          tableItem.priceSum = item.priceSum + '¥'
          tableItem.startTime = item.startTime
          tableItem.endTime = item.endTime
          tableItem.paid = item.paid
          tableItem.paidState = item.paid == 'false' ? '未支付' : '已支付'
          this.tableData.push(tableItem)
        })
      } else if (res.code == 1) {
        console.log('获取订单列表失败')
      }
    }
  }
}
</script>

<style lang="less">
@import '../style/mixin';
.table_container {
  padding: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

// .failure {
//   background-color: #fff0f0 !important;
//   .el-table_1_column_7,
//   .el-table_2_column_15 {
//     color: red !important;
//   }
// }

.finished {
  background-color: #f0f0f0 !important;
}

.futureUnpaid {
  .el-table_1_column_7,
  .el-table_2_column_15 {
    color: red !important;
  }
}

.undergoing {
  background-color: #eef5fe !important;
}

.el-table__body tr.current-row > td {
  background-color: transparent;
  //   color: #f19944;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent;
  //   color: #f19944;
}
</style>
