<template>
  <div style="text-align:left">
      <el-card>
      个人信息
      <el-divider></el-divider>
      <el-row>
          <el-col :span="5">
            <el-avatar  style="text-align:center" :fit="scale-down" :size="100" :src="this.user.head"></el-avatar>
            <img-upload @onUpload="uploadImg" ref="imgUpload" style="margin-top: 5px"></img-upload>
          </el-col>
          <el-col :span="19">
              <el-row>
              用户id：{{this.user.id}}
              </el-row>
              <el-row>
                  <div class="demo-input-suffix">
                    用户名：
                    <el-input
                        style="width:500px"
                        :placeholder="this.user.username"
                        v-model="username">
                    </el-input>
                    <el-button type="primary" size="medium" @click="buttonClick">修改</el-button>
                  </div> 
              </el-row>
          </el-col>
      </el-row>
      
      </el-card>
        <el-card style="margin-top:10px">
        修改密码
      <el-divider></el-divider>
      <el-row>
      原密码：
        <el-input
            style="width:500px"
            placeholder="原密码"
            v-model="oldpassword">
        </el-input>
      </el-row>
      <el-row style="margin-top:10px">
        新密码：
        <el-input
            style="width:500px"
            placeholder="新密码"
            v-model="newpassword">
        </el-input>
      </el-row>
      <el-row style="margin-top:10px">
          <el-button  type="primary" @click="changePassword">确认修改</el-button>
      </el-row>
        </el-card>

  </div>
</template>

<script>
import ImgUpload from '../article/ImgUpload.vue'
import {getStore} from '../libs/storage'
import {setStore} from '../libs/storage'
export default {
    components: {ImgUpload},
    data(){
        return{
            user:{},
            username:'',
            oldpassword:'',
            newpassword:'',
        }
    },

    created(){
        this.getUser()
    },

    methods:{
        getUser(){
            var id = getStore('userid')
            this.$axios.get('/getUserByID',{
                params:{
                    id:id
                }
            }).then(resp=>{
                this.user = resp.data
                console.log(this.user)
                this.username = this.user.username
            })
        },
        uploadImg () {
            this.user.head = this.$refs.imgUpload.url
            setStore("head",this.user.head)
            console.log(this.user)
            this.upDateUser()
        },

        upDateUser(){
            this.$axios.post('/updateUser',this.user).then(resp=>{
                this.$message.success('更新成功')
            })
        },

        buttonClick(){
            this.user.username = this.username
            this.upDateUser()
        },

        changePassword(){
            if(this.oldpassword!=this.user.password){
                this.$alert('密码不正确', '提示', {
                confirmButtonText: '确定',
                });
            }else{
                this.user.password = this.newpassword
                this.upDateUser()
            }
        }
    }
}
</script>

<style>


</style>