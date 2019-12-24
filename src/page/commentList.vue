<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData"
                highlight-current-row
                style="width: 100%">
        <el-table-column property="commentId"
                         label="ID"
                         width="100">
        </el-table-column>
        <el-table-column property="stadiumName"
                         label="场馆"
                         width="220">
        </el-table-column>
        <el-table-column property="customerName"
                         label="用户"
                         width="220">
        </el-table-column>
        <el-table-column property="commentPostTime"
                         label="评论时间">
        </el-table-column>
        <el-table-column property="commentContent"
                         label="内容">
        </el-table-column>
        <el-table-column property="likes"
                         label="点赞数"
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
import {
  getCommentCount,
  getCommentList,
  deleteCommentByAdmin
} from '@/api/getData'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      tableData: [
        {
          commentId: 2,
          stadiumName: '中北羽毛球馆(2)',
          customerName: 'JJAYCHEN(2)',
          commentPostTime: '2019-12-17 19:21:42',
          commentContent:
            '这是一字符串这是一字符串这是一字符串这是一字符串这是一字符串这是一字符串这是一字符串',
          likes: 123
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
        const res = await getCommentCount({
          adminId: this.adminInfo.adminId
        })
        if (res.code == 0) {
          this.count = parseInt(res.data['count'])
        } else {
          throw new Error('获取数据失败')
        }
        this.getComments()
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
      this.getComments()
    },
    async getComments() {
      const res = await getCommentList({
        offset: this.offset,
        limit: this.limit,
        adminId: this.adminInfo.adminId
      })
      console.log(res)
      if (res.code == 0) {
        this.tableData = []
        res.data.forEach(item => {
          const tableItem = {}
          tableItem.commentId = item.commentId
          tableItem.commentPostTime = item.commentPostTime
          tableItem.commentContent = item.commentContent
          tableItem.likes = item.likes
          tableItem.customerName =
            item.customerName + '(' + item.customerId + ')'
          tableItem.stadiumName = item.stadiumName + '(' + item.stadiumId + ')'
          this.tableData.push(tableItem)
        })
      } else if (res.code == 1) {
        console.log('获取用户列表失败')
      }
    },
    handleDelete(index, row) {
      this.$confirm(
        '确认删除来自用户 ' +
          row.customerName +
          ' 在 ' +
          row.stadiumName +
          ' 下的评论 "' +
          row.commentContent +
          '" 吗？'
      ).then(async () => {
        const res = await deleteCommentByAdmin({
          commentId: row.commentId,
          adminId: this.adminInfo.adminId
        })
        console.log(res)
        if (res.code == 0) {
          this.tableData.splice(index, 1)
        } else if (res.code == 1) {
          console.log('获取评论列表失败')
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
