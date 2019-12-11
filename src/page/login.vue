<template>
  <div class="login_page fillcontain">
    <div>
      <transition name="form-fade" mode="in-out">
        <section class="form_contianer">
          <div class="manage_tip">
            <p>Welcome to MeetHere</p>
          </div>
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <el-form-item>
              <p class="title">登录</p>
            </el-form-item>
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="邮箱地址">
                <span>dsfsf</span>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="setDialogVisible()" class="submit_btn">注册</el-button>
            </el-form-item>
          </el-form>
          <!-- <p class="tip">温馨提示：</p> -->
        </section>
      </transition>
    </div>
    <SignUp
      v-bind:dialogVisible="signUpDialogVisible"
      v-on:updateDialogVisible="updateDialogVisible"
    ></SignUp>
  </div>
</template>

<script>
import { login, getAdminInfo } from "@/api/getData";
import { mapActions, mapState } from "vuex";
import SignUp from "@/components/SignUp.vue";

export default {
  components: {
    SignUp
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      signUpDialogVisible: false,
      rules: {
        username: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  computed: {
  },
  methods: {
    setDialogVisible() {
      this.signUpDialogVisible = true;
    },
    updateDialogVisible(newValue) {
      this.signUpDialogVisible = newValue;
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await login({
            user_name: this.loginForm.username,
            password: this.loginForm.password
          });
          if (res.status == 1) {
            this.$message({
              type: "success",
              message: "登录成功"
            });
            this.$router.push("manage");
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "请输入正确的用户名密码",
            offset: 100
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.login_page {
  background: url("/static/Login-Background-2.jpg") no-repeat center center;
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
  .wh(320px, 290px);
  .ctp(320px, 290px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
  .title{
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
