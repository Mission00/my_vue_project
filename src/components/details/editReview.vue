<template>
    <div style="text-align: right;">
    <el-button type="primary" icon="el-icon-edit" @click="reviewButtonClick" >写短评</el-button>
    <el-dialog
      title="写短评"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="25%">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        maxlength="200"
        show-word-limit
        v-model="review"
        name="review"
        margin:10
        style="margin:10px">
        </el-input>
        <el-button @click="addMovieReview()">确定</el-button>
    </el-dialog>
  </div>

</template>

<script>
import {setStore} from '../libs/storage'
import {getStore} from '../libs/storage'

export default {
    name:'editReview',
    data(){
        return{
            dialogFormVisible: false,
            rules: {    
                review: [{required: true, message: '语言名不能为空', trigger: 'blur'}]
            },
            loading: false,
            review:'',
            movieid: this.$route.query.id,
        }
    },
    methods:{
      reviewButtonClick(){
          if(getStore('userid')==null){
            this.$message.error('请先登录')
          }else{
            this.dialogFormVisible=true
          }
        },
      addMovieReview(){
        this.$axios.post('/addReview',{
          itemID:this.movieid,
          userIDF:getStore('userid'),
          userNameF:getStore('username'),
          review:this.review,
          type:0,
        }).then(resp=>{
          if(resp.status==200){
            this.review=''
            this.dialogFormVisible = false
          }else{

          }
            
        })
      }
    },

}
</script>

<style>

</style>