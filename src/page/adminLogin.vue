<template>
  <div class="login_page fillcontain">
    <div>
      <transition name="form-fade"
                  mode="in-out">
        <section class="form_contianer">
          <div class="manage_tip">
            <p>Welcome to MeetHere</p>
          </div>
          <el-form :model="loginForm"
                   :rules="rules"
                   ref="loginForm">
            <el-form-item>
              <p class="title">管理员登录</p>
            </el-form-item>
            <el-form-item prop="email">
              <el-input v-model="loginForm.email"
                        placeholder="邮箱地址">
                <span>dsfsf</span>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password"
                        show-password
                        placeholder="密码"
                        @keyup.enter.native="login('loginForm')"
                        v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="login('loginForm')"
                         class="submit_btn">登录</el-button>
            </el-form-item>
          </el-form>
        </section>
      </transition>
    </div>
  </div>
</template>

<script>
import { adminLogin } from '@/api/getData'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.$store.state.userType == 1) {
      this.$message({
        type: 'success',
        message: '检测到您已登录，自动跳转至首页'
      })
      this.$router.push('manage')
    }
  },
  methods: {
    ...mapMutations(['saveLoginInfo']),
    async login(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await adminLogin({
            email: this.loginForm.email,
            password: this.loginForm.password
          })
          console.log(res)
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            this.saveLoginInfo({
              userType: 1,
              LoginInfo: {
                adminId: res.data['adminId'],
                email: res.data['email'],
                phoneNumebr: res.data['phoneNumber'],
                adminName: res.data['adminName']
              },
              token: res.data['token']
            })
            this.$router.push('manage')
          } else if (res.code == -1) {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入正确格式的邮箱地址与密码',
            offset: 100
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../style/mixin';
.login_page {
  background: url('/static/Login-Background-2.jpg') no-repeat center center;
  background-size: cover;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  .wh(320px, 230px);
  .ctp(320px, 230px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
  .title {
    font-size: 25px;
    color: #303133;
  }
}
.tip {
  font-size: 12px;
  color: red;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
