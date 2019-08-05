<template>
    <div class="container">
        <el-card class="card">
            <img src="../../assets/images/logo_index.png">
            <el-form ref="form" :model="formData" :rules="rules" status-icon>
                <el-form-item prop="mobile">
                     <el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                     <el-input v-model="formData.code" class="mycode" placeholder="请输入验证码" ></el-input>
                     <el-button>获取验证码</el-button>
                </el-form-item>
                <el-form-item>
                     <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import store from '@/store'
export default {

  data () {
    const checkTel = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) { return callback(new Error('手机号格式不正确')) }
      callback()
    }
    return {
      formData: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkTel, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度在为6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // this.$http
          // .post(
          //   'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
          //   this.formData
          // )
          //   .then(res => {
          //     // console.log(res.data)
          //     // 存储用户的信息到缓存中
          //     store.setUser(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     this.$message.error('手机号或验证码输入错误')
          //   })
          try {
            const { data: { data } } = await this.$http
              .post('authorizations', this.formData)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码输入错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container{
    position: absolute;
    width: 100%;
    height: 100%;
    background:url(../../assets/images/login_bg.jpg) no-repeat center / cover
}
.card{
    position: absolute;
    width: 400px;
    height: 350px;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    img{
        display: block;
        width: 200px;
        margin:0 auto 30px;
    }
    .mycode{
        width:65%;
        margin-right: 10px;

    }
}

</style>
