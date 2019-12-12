<template>
    <el-dialog
        title="注册"
        :visible.sync="currentDialogVisible"
        width="500px"
        center
    >
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-position="left"
            label-width="100px"
        >
            <el-form-item label="注册邮箱" prop="email">
                <el-input
                    v-model="ruleForm.email"
                    placeholder="示例: admin@meethere.com"
                ></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
                <el-input
                    v-model="ruleForm.userName"
                    placeholder="请输入用户名: (不超过 8 个字符)"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    type="password"
                    v-model="ruleForm.password"
                    placeholder="请输入密码: (6 至 20 个字符)"
                ></el-input>
            </el-form-item>
            <el-form-item label="邮件验证码" prop="code">
                <el-row type="flex" justify="space-between">
                    <el-col :span="13">
                        <el-input
                            v-model="ruleForm.code"
                            placeholder="请输入邮件中的验证码"
                        ></el-input>
                    </el-col>
                    <el-col :span="6.5">
                        <el-button
                            type="primary"
                            @click="submitForm('ruleForm')"
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
                @click="submitForm('ruleForm')"
                >立即注册</el-button
            >
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'SignUp',
    props: ['dialogVisible'],
    data() {
        return {
            currentDialogVisible: this.dialogVisible,
            ruleForm: {
                email: '',
                userName: '',
                password: '',
                code: ''
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
                        trigger: ['blur', 'change'] //检验方式（change为检验的字符变化的时候）
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
                code: [
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
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
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
// .form_contianer {
//   .wh(400px, 270px);
//   .ctp(400px, 270px);
//   // padding: 25px;
//   border-radius: 5px;
//   // text-align: center;
//   background-color: #fff;

// }
// .submit_btn {
//     margin: 15px;
//     width: auto;
//     font-size: 15px;
//   }
</style>
