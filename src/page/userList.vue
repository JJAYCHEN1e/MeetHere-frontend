<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData"
                highlight-current-row
                style="width: 100%">
        <el-table-column property="customerId"
                         label="ID"
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
import { getUserList, getUserCount, deleteUser } from '@/api/getData'
import { mapState } from 'vuex'
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
      currentPage: 1,
      search: ''
    }
  },
  components: {
    headTop
  },
  created() {
    this.initData()
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    async initData() {
      try {
        const res = await getUserCount({
          adminId: this.adminInfo.adminId
        })
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
        limit: this.limit,
        adminId: this.adminInfo.adminId
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
    },
    handleDelete(index, row) {
      this.$confirm(
        '确认删除用户 ' +
          row.customerId +
          ' ' +
          row.userName +
          '(' +
          row.email +
          ')?'
      ).then(async () => {
        const res = await deleteUser({
          customerId: row.customerId,
          adminId: this.adminInfo.adminId
        })
        console.log(res)
        if (res.code == 0) {
          this.tableData.splice(index, 1)
        } else if (res.code == 1) {
          console.log('获取用户列表失败')
        }
      })
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
