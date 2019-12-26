<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData"
                highlight-current-row
                style="width: 100%">
        <el-table-column property="stadiumId"
                         label="ID"
                         width="50">
        </el-table-column>
        <el-table-column property="stadiumName"
                         label="场馆名"
                         width="150">
        </el-table-column>
        <el-table-column property="type"
                         label="场馆类型"
                         width="100">
        </el-table-column>
        <el-table-column property="location"
                         label="地点"
                         width="180">
        </el-table-column>
        <el-table-column property="description"
                         label="文字描述">
        </el-table-column>
        <el-table-column property="freeTime"
                         label="空闲时间">
        </el-table-column>
        <el-table-column property="price"
                         label="单价(元/小时)"
                         width="150">
        </el-table-column>
        <el-table-column align="right"
                         width="180">
          <template slot="header">
            <el-button size="medium"
                       type="primary"
                       circle
                       icon="el-icon-edit"
                       @click="formSendType='POST', newStadiumDialogVisible=true"></el-button>
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
    <el-dialog title="添加场馆"
               :visible.sync="newStadiumDialogVisible"
               width="50%">
      <el-form :model="newStadiumForm"
               :rules="rules"
               ref="newStadiumForm"
               @validate="validateObserver()"
               label-position="left"
               label-width="100px">
        <el-form-item label="场馆名"
                      prop="stadiumName">
          <el-input v-model="newStadiumForm.stadiumName"></el-input>
        </el-form-item>
        <el-form-item label="场馆地址"
                      prop="location">
          <el-input v-model="newStadiumForm.location"></el-input>
        </el-form-item>
        <el-form-item label="场馆类型"
                      prop="type">
          <el-select v-model="newStadiumForm.type"
                     placeholder="请选择">
            <el-option v-for="item in types"
                       :key="item.type"
                       :label="item.stadiumName"
                       :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格"
                      prop="price">
          <el-input v-model="newStadiumForm.price"></el-input>
        </el-form-item>
        <el-form-item label="场馆描述"
                      prop="description">
          <el-input type="textarea"
                    maxlength="210"
                    :autosize="{ minRows:8, maxRows:8 }"
                    v-model="newStadiumForm.description"></el-input>
        </el-form-item>
        <el-form-item label="照片"
                      prop="pictureRaw">
          <el-upload drag
                     action=""
                     :limit="1"
                     :on-change="onUploadChange"
                     :auto-upload="false"
                     :show-file-list="true"
                     ref="upload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip"
                 slot="tip">只能上传jpg/png文件，且不超过 1MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="newStadiumDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="sendNewStadiumForm('newStadiumForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import headTop from '../components/headTop'
import {
  getStadiumCount,
  getStadiumListForAdmin,
  deleteStadium,
  updateStadium,
  postStadium,
  getStadiumTypes
} from '@/api/getData'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      tableData: [
        {
          stadiumId: 1,
          stadiumName: '中北网球场',
          type: '',
          location: '中北校区某个地方',
          description:
            '这是一字符串这是一字符串这是一字符串这是一字符串这是一字符串这是一字符串这是一字符串',
          freeTime: '',
          price: 100
        }
      ],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      search: '',
      types: [{ stadiumName: '', type: 0 }],
      newStadiumDialogVisible: false,
      formSendType: 'POST',
      newStadiumForm: {
        stadiumId: '',
        stadiumName: '',
        type: '',
        location: '',
        description: '',
        price: '',
        pictureRaw: ''
      },
      shouldClearValidate: 0,
      rules: {
        stadiumName: [
          {
            required: true,
            message: '请输入场馆名',
            trigger: ['blur', 'change']
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: ['blur', 'change']
          }
        ],
        location: [
          {
            required: true,
            message: '请输入场馆地址',
            trigger: ['blur', 'change']
          },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: ['blur', 'change']
          }
        ],
        type: [
          {
            required: true,
            message: '请选择场馆类型',
            trigger: ['blur', 'change']
          }
        ],
        price: [
          {
            required: true,
            message: '请输入价格',
            trigger: 'blur'
          },
          {
            validator(rule, value, callback) {
              var reg = /^[0-9]*$/
              if (reg.test(value)) {
                callback()
              } else {
                callback(new Error('请输入正确格式的价格'))
              }
            },
            trigger: ['blur', 'change']
          }
        ],
        description: [
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
        ],
        pictureRaw: [
          {
            required: true,
            message: '请上传图片',
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
    this.getTypes()
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    async initData() {
      try {
        const res = await getStadiumCount({
          adminId: this.adminInfo.adminId
        })
        if (res.code == 0) {
          this.count = parseInt(res.data['count'])
        } else {
          throw new Error('获取数据失败')
        }
        this.getStadiums()
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
      this.getStadiums()
    },
    async getTypes() {
      const res = await getStadiumTypes({
        adminId: this.adminInfo.adminId
      })
      console.log(res)
      if (res.code == 0) {
        this.types = res.data
      } else if (res.code == 1) {
        alert('获取场馆类型列表失败，请检查网络设置')
        this.newStadiumDialogVisible = false
      }
    },
    async getStadiums() {
      const res = await getStadiumListForAdmin({
        offset: this.offset,
        limit: this.limit,
        adminId: this.adminInfo.adminId
      })
      console.log(res)
      if (res.code == 0) {
        this.tableData = []
        res.data.forEach(item => {
          const tableItem = {}
          tableItem.stadiumId = item.stadiumId
          tableItem.stadiumName = item.stadiumName
          tableItem.type = item.type
          tableItem.location = item.location
          tableItem.description = item.description
          tableItem.freeTime = item.freeTime
          tableItem.price = item.price
          this.tableData.push(tableItem)
        })
      } else if (res.code == 1) {
        console.log('获取场馆列表失败')
      }
    },
    handleUpdate(index, row) {
      this.formSendType = 'UPDATE'
      this.newStadiumDialogVisible = true
      this.newStadiumForm.stadiumId = row.stadiumId
      this.newStadiumForm.stadiumName = row.stadiumName
      this.types.forEach(type => {
        if (type.stadiumName == row.type) {
          this.newStadiumForm.type = type.type
          return
        }
      })
      this.newStadiumForm.location = row.location
      this.newStadiumForm.description = row.description
      this.newStadiumForm.price = row.price
      this.newStadiumForm.pictureRaw = 'nil'
    },
    handleDelete(index, row) {
      this.$confirm(
        '确认删除名为 ' +
          row.stadiumName +
          '(' +
          row.stadiumId +
          ') 的 ' +
          row.type +
          ' 吗？'
      ).then(async () => {
        const res = await deleteStadium({
          stadiumId: row.stadiumId,
          adminId: this.adminInfo.adminId
        })
        console.log(res)
        if (res.code == 0) {
          this.tableData.splice(index, 1)
        } else if (res.code == 1) {
          console.log('删除场馆失败')
        }
      })
    },
    sendNewStadiumForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const body = {
            adminId: this.adminInfo.adminId,
            stadiumName: this.newStadiumForm.stadiumName,
            type: this.newStadiumForm.type,
            price: this.newStadiumForm.price,
            location: this.newStadiumForm.location,
            description: this.newStadiumForm.description,
            pictureRaw: this.newStadiumForm.pictureRaw
          }
          if (this.formSendType == 'POST') {
            const res = await postStadium(body)
            if (res.code == 0) {
              alert('发布成功!')
              this.newStadiumDialogVisible = false
              this.initData()
            } else if (res.code == -1) {
              alert('发布失败：' + res.message)
              console.log(res.message)
            }
          } else if (this.formSendType == 'UPDATE') {
            body.stadiumId = this.newStadiumForm.stadiumId
            const res = await updateStadium(body)
            if (res.code == 0) {
              alert('保存成功!')
              this.newStadiumDialogVisible = false
              this.initData()
            } else if (res.code == 1) {
              console.log('保存新闻失败')
            }
          }
        } else {
          console.log('表单验证错误')
          return false
        }
      })
    },
    validateObserver() {
      if (
        this.shouldClearValidate > 0 &&
        this.$refs['newStadiumForm'] !== undefined
      ) {
        this.$refs['newStadiumForm'].clearValidate()
        this.shouldClearValidate--
      }
    },
    onUploadChange(file) {
      const isIMAGE =
        file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isIMAGE) {
        this.$message.error('只能上传jpg/png图片!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
        this.$refs['upload'].clearFiles()
        return false
      }
      var reader = new FileReader()
      reader.readAsDataURL(file.raw)
      const that = this
      reader.onload = function(e) {
        console.log(this.result)
        that.newStadiumForm.pictureRaw = this.result
      }
    }
  },
  watch: {
    newStadiumDialogVisible: function(newValue) {
      if (this.$refs['upload'] !== undefined) {
        this.$refs['upload'].clearFiles()
      }
      if (newValue == true) {
        if (this.formSendType == 'POST') {
          this.newStadiumForm.stadiumName = ''
          this.newStadiumForm.type = ''
          this.newStadiumForm.location = ''
          this.newStadiumForm.description = ''
          this.newStadiumForm.price = ''
          this.newStadiumForm.pictureRaw = ''
          if (this.newStadiumForm.stadiumId != '') this.shouldClearValidate = 5
        }
      } else {
        this.$refs['newStadiumForm'].clearValidate()
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
.el-upload__tip {
  font-size: 12px;
  color: #606266;
  margin-top: -22px;
}
</style>
