<template>
  <div class="fillcontain">
    <head-top></head-top>
    <header class="user_title">我的信息</header>
    <div class="user_set">
      <el-form :model="userInfoForm"
               :rules="rules"
               ref="userInfoForm"
               label-position="left"
               label-width="100px">
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
      </el-form>
      <div class="save_button">
        <el-button type="success"
                   icon="el-icon-check"
                   circle
                   @click="save('userInfoForm')"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from '../components/headTop'
import { mapState, mapMutations } from 'vuex'
import { baseUrl, baseImgPath } from '@/config/env'
import { saveUserInfo } from '@/api/getData'

export default {
  data() {
    return {
      baseUrl,
      userInfoForm: {
        phoneNumber: this.$store.state.userInfo.phoneNumber,
        userName: this.$store.state.userInfo.userName
      },
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
        ]
      }
    }
  },
  components: {
    headTop
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState(['userInfo', 'token'])
  },
  methods: {
    ...mapMutations(['setUserName', 'setPhoneNumber']),
    save(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await saveUserInfo(
            {
              customerId: this.userInfo.customerId,
              userName: this.userInfoForm.userName,
              phoneNumber: this.userInfoForm.phoneNumber
            },
            this.token
          )
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
          console.log('注册表单验证错误')
          return false
        }
      })
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
</style>
