<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData"
                highlight-current-row
                style="width: 100%">
        <el-table-column property="customerId"
                         width="100">
        </el-table-column>
        <el-table-column property="registeredTime"
                         label="注册日期"
                         width="220">
        </el-table-column>
        <el-table-column property="userName"
                         label="用户姓名"
                         width="220">
        </el-table-column>
        <el-table-column property="email"
                         label="注册邮箱">
        </el-table-column>
        <el-table-column property="phoneNumber"
                         label="手机号码">
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="danger"
                     icon="el-icon-delete"
                     size="small"
                     circle></el-button>
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
import { getUserList, getUserCount } from '@/api/getData'
export default {
  data() {
    return {
      tableData: [
        {
          customerId: 2,
          registeredTime: '2019-12-17',
          userName: '陈俊杰',
          email: '705276106@qq.com',
          phoneNumber: '18000000000'
        }
      ],
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
  methods: {
    async initData() {
      try {
        const res = await getUserCount()
        if (res.code == 0) {
          this.count = parseInt(res.data['count'])
        } else {
          throw new Error('获取数据失败')
        }
        this.getUsers()
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
      this.getUsers()
    },
    async getUsers() {
      const res = await getUserList({
        offset: this.offset,
        limit: this.limit
      })
      console.log(res)
      if (res.code == 0) {
        this.tableData = []
        res.data.forEach(item => {
          const tableItem = {}
          tableItem.customerId = item.customerId
          tableItem.registeredTime = item.registeredTime
          tableItem.userName = item.userName
          tableItem.email = item.email
          tableItem.phoneNumber = item.phoneNumber
          this.tableData.push(tableItem)
        })
      } else if (res.code == 1) {
        console.log('获取用户列表失败')
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
</style>
