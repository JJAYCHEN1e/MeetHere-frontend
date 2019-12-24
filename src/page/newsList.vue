<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData"
                highlight-current-row
                style="width: 100%">
        <el-table-column property="newsId"
                         label="ID"
                         width="50">
        </el-table-column>
        <el-table-column property="newsTitle"
                         label="标题"
                         width="150">
        </el-table-column>
        <el-table-column property="adminName"
                         label="发布者"
                         width="150">
        </el-table-column>
        <el-table-column property="newsPostTime"
                         label="发布时间"
                         width="180">
        </el-table-column>
        <el-table-column property="newsContent"
                         label="内容">
          <template slot-scope="scope">
            <el-input type="textarea"
                      maxlength="200"
                      :autosize="{maxRows: 6}"
                      v-model="tableData[scope.$index].newsContent">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column align="right"
                         width="180">
          <template slot="header">
            <el-button size="medium"
                       type="primary"
                       circle
                       icon="el-icon-edit"
                       @click="newPostDialogVisible = true"></el-button>
          </template>
          <template slot-scope="scope">
            <el-button size="mini"
                       type="warning"
                       @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
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
    <el-dialog title="发布新闻"
               :visible.sync="newPostDialogVisible"
               width="50%">
      <el-form :model="newsPostForm"
               :rules="rules"
               ref="newsPostForm"
               label-position="left"
               label-width="100px">
        <el-form-item label="新闻标题"
                      prop="newsTitle">
          <el-input v-model="newsPostForm.newsTitle"></el-input>
        </el-form-item>
        <el-form-item label="新闻内容"
                      prop="newsContent">
          <el-input type="textarea"
                    maxlength="210"
                    :autosize="{ minRows:8, maxRows:8 }"
                    v-model="newsPostForm.newsContent"></el-input>
        </el-form-item>
        <el-time-select placeholder="起始时间"
                        v-model="startTime"
                        :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '09:30'
    }">
        </el-time-select>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="newPostDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="sendNewPostForm('newsPostForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import headTop from '../components/headTop'
import {
  getNewsCount,
  getNewsList,
  deleteNews,
  updateNews,
  postNews
} from '@/api/getData'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      tableData: [
        {
          newsId: 1,
          newsTitle: '这是第一个新闻',
          adminName: 'JJAYCHEN(2)',
          newsPostTime: '2019-12-17 19:21:42',
          newsContent:
            '这是一字符串这是一字符串这是一字符串这是一字符串这是一字符串这是一字符串这是一字符串'
        }
      ],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      search: '',
      newPostDialogVisible: false,
      newsPostForm: {
        newsTitle: '',
        newsContent: '',
        adminId: this.$store.state.adminInfo.adminId
      },
      rules: {
        newsTitle: [
          {
            required: true,
            message: '请输入标题',
            trigger: ['blur', 'change']
          },
          {
            min: 1,
            max: 40,
            message: '长度在 1 到 40 个字符',
            trigger: ['blur', 'change']
          }
        ],
        newsContent: [
          {
            required: true,
            message: '请输入内容',
            trigger: ['blur', 'change']
          },
          {
            min: 1,
            max: 200,
            message: '长度在 1 到 200 个字符',
            trigger: ['blur', 'change']
          }
        ]
      }
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
        const res = await getNewsCount({
          userId: this.adminInfo.adminId
        })
        if (res.code == 0) {
          this.count = parseInt(res.data['count'])
        } else {
          throw new Error('获取数据失败')
        }
        this.getNews()
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
      this.getNews()
    },
    async getNews() {
      const res = await getNewsList({
        offset: this.offset,
        limit: this.limit,
        userId: this.adminInfo.adminId
      })
      console.log(res)
      if (res.code == 0) {
        this.tableData = []
        res.data.forEach(item => {
          const tableItem = {}
          tableItem.newsId = item.newsId
          tableItem.newsTitle = item.newsTitle
          tableItem.adminName = item.admin.adminName + '(' + item.adminId + ')'
          tableItem.newsPostTime = item.newsPostTime
          tableItem.newsContent = item.newsContent
          this.tableData.push(tableItem)
        })
      } else if (res.code == 1) {
        console.log('获取新闻列表失败')
      }
    },
    async handleUpdate(index, row) {
      const res = await updateNews({
        newsId: row.newsId,
        newsTitle: row.newsTitle,
        newsContent: row.newsContent,
        adminId: this.adminInfo.adminId
      })
      console.log(res)
      if (res.code == 0) {
        alert('保存成功!')
      } else if (res.code == 1) {
        console.log('保存新闻失败')
      }
    },
    handleDelete(index, row) {
      this.$confirm(
        '确认删除来自管理员 ' +
          row.adminName +
          ' 在 ' +
          row.newsPostTime +
          ' 发布的新闻 "' +
          row.newsTitle +
          '" 吗？'
      ).then(async () => {
        const res = await deleteNews({
          newsId: row.newsId,
          adminId: this.adminInfo.adminId
        })
        console.log(res)
        if (res.code == 0) {
          this.tableData.splice(index, 1)
        } else if (res.code == 1) {
          console.log('删除新闻失败')
        }
      })
    },
    sendNewPostForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await postNews({
            adminId: this.adminInfo.adminId,
            newsTitle: this.newsPostForm.newsTitle,
            newsContent: this.newsPostForm.newsContent
          })
          if (res.code == 0) {
            alert('发布成功!')
            this.newPostDialogVisible = false
            this.initData()
          } else if (res.code == -1) {
            alert('发布失败：' + res.message)
            console.log(res.message)
          }
        } else {
          console.log('表单验证错误')
          return false
        }
      })
    }
  },
  watch: {
    newPostDialogVisible: function() {
      this.$refs['newsPostForm'].resetFields()
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
