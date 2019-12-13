<template>
  <el-dialog
    title="注册"
    :visible.sync="currentDialogVisible"
    width="500px"
    center
  >
    <el-form
      :model="registerForm"
      :rules="rules"
      ref="registerForm"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="注册邮箱" prop="email">
        <el-input
          v-model="registerForm.email"
          placeholder="示例: admin@meethere.com"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input
          v-model="registerForm.userName"
          placeholder="请输入用户名: (不超过 8 个字符)"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="registerForm.password"
          placeholder="请输入密码: (6 至 20 个字符)"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮件验证码" prop="checkCode">
        <el-row type="flex" justify="space-between">
          <el-col :span="13">
            <el-input
              v-model="registerForm.checkCode"
              placeholder="请输入邮件中的验证码"
            ></el-input>
          </el-col>
          <el-col :span="6.5">
            <el-button type="primary" @click="submitForm('registerForm')"
              >发送验证码</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        class="submit_btn"
        @click="submitForm('registerForm')"
        >立即注册</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { register } from '@/api/getData'

export default {
  name: 'SignUp',
  props: ['dialogVisible'],
  data() {
    return {
      currentDialogVisible: this.dialogVisible,
      registerForm: {
        userName: '',
        email: '',
        password: '',
        checkCode: ''
      },
      rules: {
        email: [
          {
            required: true, //是否必填
            message: '请输入邮箱地址', //错误提示信息
            trigger: 'blur' //检验方式（blur为鼠标点击其他地方，）
          },
          {
            type: 'email', //要检验的类型（number，email，date等）
            message: '请输入正确的邮箱地址',
            trigger: ['blur'] //检验方式（change为检验的字符变化的时候）
          }
        ],
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
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }
        ],
        checkCode: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 6,
            message: '验证码长度错误',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]{6}$/,
            message: '验证码格式错误',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await register({
            userName: this.registerForm.userName,
            email: this.registerForm.email,
            password: this.registerForm.password,
            checkCode: this.registerForm.checkCode
          })
        } else {
          console.log('注册表单验证错误')
          return false
        }
      })
    }
  },
  watch: {
    dialogVisible: function(newValue) {
      this.currentDialogVisible = newValue
    },
    currentDialogVisible: function(newValue) {
      // 只能通过观察 currentDialogVisible 来判断是否点击 X
      this.$emit('updateDialogVisible', newValue)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../style/mixin';
</style>
