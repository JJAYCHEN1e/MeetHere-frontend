<template>
    <div class="fillcontain">
        <head-top></head-top>
        <header class="user_title">我的信息</header>
        <div class="user_set">
            <el-form
                :model="userInfoForm"
                :rules="rules"
                ref="userInfoForm"
                label-position="left"
                label-width="100px"
            >
                <el-form-item label="用户 ID">
                    <span>1</span>
                </el-form-item>
                <el-form-item label="邮箱地址">
                    <span>admin@meethere.com</span>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userInfoForm.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone_number">
                    <el-input v-model="userInfoForm.phone_number"></el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                    <span>{{ adminInfo.create_time }}</span>
                </el-form-item>
            </el-form>
            <div class="save_button">
                <el-button
                    type="success"
                    icon="el-icon-check"
                    circle
                ></el-button>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '../components/headTop'
import { mapState } from 'vuex'
import { baseUrl, baseImgPath } from '@/config/env'

export default {
    data() {
        return {
            baseUrl,
            userInfoForm: {
                username: 'JJAYCHEN',
                phone_number: '18066668888'
            },
            rules: {
                username: [
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
                phone_number: [
                    {
                        required: true,
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
        ...mapState(['adminInfo'])
    },
    methods: {}
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
