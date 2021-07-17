<template>
<div class="background">
  <el-card class="box-card-register">
    <div slot="header" class="clearfix" >
      <el-col :span="24" class="el-icon-user-solid">用户注册</el-col>
    </div>
      <div class="register-wrap">
          <el-form :model="registerForm" class="register-container" :rules="inputRules" ref="registerForm">
              <el-form-item prop="username">
                  <el-input type="text" v-model="registerForm.username" placeholder="请输入用户名" clearable>
                    <template slot="prepend">用户名</template>
                    </el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" show-password>
                    <template slot="prepend">密&nbsp;&nbsp;&nbsp;&nbsp;码</template>
                    </el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" style="width: 100%;" v-on:click="submit('registerForm')">注册</el-button>
              </el-form-item>
              <el-row style="text-align: center; margin-top: -10px;">
                  <el-button type="text" @click="login">返回登录</el-button>
              </el-row>
          </el-form>
      </div>
  </el-card>
  <el-row style="text-align: center; margin-top: 170px;">
            <p style="color:#F2F6FC"> @Designed by cmx at 2020.12.9</p>
  </el-row>
</div>
</template>

<script>
import {setStore} from './libs/storage';
import {getStore} from './libs/storage';
  export default {
    name: 'Register',
    data () {
      return {
        registerForm: {
          username: '',
          password: '',
        },
        responseResult: [],
        inputRules:{
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { max: 8, message: '最大长度8', trigger: 'blur' },
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '请输入不少于6个字符', trigger: 'blur' },
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }
          ]
        }
      }
    },
    methods: {
      submit(formName){
          this.$refs[formName].validate((valid)=>{
            if (valid) 
            {
               this.$axios.post('/register',{
                  username:this.registerForm.username,
                  password:this.registerForm.password,
                }).then(rep => {
                  if(rep.data === 200)
                  { 
                    this.$alert('注册成功', '成功', {
                        confirmButtonText: '前往登录',
                        callback: action => {
                          this.$router.replace('/login')
                        }
                      });
                  }
                  else
                  {
                    this.$message.error('注册失败！');
                  }
                })
            } 
            else {
                this.$message.error('非法输入！');
                return false;
            }
          })
      },
      login() {
        this.$router.replace('/login')
      }
    },
  }
</Script>

<style>
.register-wrap{
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 400px;
}
.register-container{
  margin-top: 5%;
}
.box-card-register {
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  height: 320px;
  margin-top:12%
}
.background{
  background:url("../assets/background/background.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100%;
  -webkit-background-size:100%;
}
.clearfix{
  height: 25px;
}
.el-col{
  font-size: 25px;
}

html,body,#app,.el-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
      /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
}

  
</style>