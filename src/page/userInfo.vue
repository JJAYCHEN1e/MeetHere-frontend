<template>
  <div class="fillcontain">
    <head-top></head-top>
    <header class="user_title">我的信息</header>
    <div class="user_set" >
      <el-form :model="userInfoForm"
               :rules="rules"
               ref="userInfoForm"
               label-position="left"
               label-width="100px"
               
               >

        <el-form-item label="用户 ID">
          <span>{{ userInfo.customerId }}</span>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <span>{{ userInfo.email }}</span>
        </el-form-item>
        <el-form-item label="用户名"
                      prop="userName">
          <el-input v-model="userInfoForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码"
                      prop="phoneNumber">
          <el-input v-model="userInfoForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <span>{{ userInfo.registeredTime }}</span>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" class="save_button"
                   @click="save('userInfoForm')">保存信息</el-button>
        <el-button type="primary" class="change_password"
                   @click="changePasswordDialogVisible = true">修改密码</el-button>
      </el-form-item>
      <br/>
      
      </el-form>
    </div>
    

    <el-dialog title="修改密码"
               :visible.sync="changePasswordDialogVisible"
               width="30%">
      <el-form :model="changePasswordForm"
               :rules="rules"
               ref="changePasswordForm"
               label-position="left"
               label-width="100px">
        <el-form-item label="原密码"
                      prop="oldPassword">
          <el-input type="password"
                    v-model="changePasswordForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码"
                      prop="newPassword">
          <el-input type="password"
                    v-model="changePasswordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码"
                      prop="newPasswordConfirm">
          <el-input type="password"
                    v-model="changePasswordForm.newPasswordConfirm"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="changePasswordDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="sendChangePasswordForm('changePasswordForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import headTop from '../components/headTop'
import { mapState, mapMutations } from 'vuex'
import { baseUrl, baseImgPath } from '@/config/env'
import { saveUserInfo, changePassword } from '@/api/getData'

export default {
  data() {
    return {
      baseUrl,
      userInfoForm: {
        phoneNumber: this.$store.state.userInfo.phoneNumber,
        userName: this.$store.state.userInfo.userName
      },
      changePasswordForm: {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      },
      changePasswordDialogVisible: false,
      rules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 8,
            message: '长度在 1 到 8 个字符',
            trigger: 'blur'
          }
        ],
        phoneNumber: [
          {
            required: false,
            pattern: /^1[34578]\d{9}$/, // 正则表达式
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
          }
        ],
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '原密码长度应在 6 到 20 个字符',
            trigger: 'blur'
          }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '新密码长度应在 6 到 20 个字符',
            trigger: 'blur'
          }
        ],
        newPasswordConfirm: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value != this.changePasswordForm.newPassword) {
                callback(new Error('密码不一致'))
              } else {
                callback()
              }
            },
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  components: {
    headTop
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['setUserName', 'setPhoneNumber']),
    save(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await saveUserInfo({
            customerId: this.userInfo.customerId,
            userName: this.userInfoForm.userName,
            phoneNumber: this.userInfoForm.phoneNumber
          })
          if (res.code == 0) {
            alert('保存成功!')
            this.setUserName(this.userInfoForm.userName)
            this.setPhoneNumber(this.userInfoForm.phoneNumber)
            console.log(this.userInfo.userName)
          } else if (res.code == -1) {
            alert('保存失败')
            console.log(res.message)
          }
        } else {
          console.log('表单验证错误')
          return false
        }
      })
    },
    sendChangePasswordForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await changePassword({
            customerId: this.userInfo.customerId,
            password: this.changePasswordForm.oldPassword,
            newPassword: this.changePasswordForm.newPasswordConfirm
          })
          if (res.code == 0) {
            alert('修改成功!')
            this.changePasswordDialogVisible = false
          } else if (res.code == -1) {
            alert('修改失败：' + res.message)
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
    changePasswordDialogVisible: function() {
      this.$refs['changePasswordForm'].resetFields()
    }
  }
}
</script>

<style lang="less">
@import '../style/mixin';

.user_set {
  width: 40%;
  background-color: #f9fafc;
  margin: 20px auto 0;
  border-radius: 10px;
  padding: 15px;
}
.user_title {
  margin-top: 20px;
  .sc(24px, #666);
  text-align: center;
}
.save_button {
  margin: 20px auto 0;
  text-align: center;
}
.change_password {
  margin: 20px auto 0;
  text-align: center;
}
</style>
