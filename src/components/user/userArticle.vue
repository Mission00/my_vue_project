<template>
<div style="text-align:left">
  <div  v-for="article in articleList" :key="article.id">
      <el-card>
        <el-row :gutter="3">
            <el-col :span="4">
                <el-image
                style="width: 120px; height: 150px"
                :src="article.articleCover"
                :fit="fit"></el-image>
            </el-col>
            <el-col :span="15">
                <router-link :to="{path:'/articledetails',query:{id:article.id}}"  style="text-decoration:none;">
                    <el-row>
                        <h1 style="font-size:20px">{{article.articleTitle}}</h1>
                    </el-row>
                    <el-row>
                        <p style="font-size:10px">{{article.articleAbstract}}</p>
                    </el-row>
                    <el-row>
                        <p style="font-size:10px">{{article.articleDate}}</p>
                    </el-row>
                </router-link>
            </el-col>
            <el-col :span="5">
                状态：{{article.state==1?"已审核":"未审核"}}
                <el-button type="danger" @click="DeleteArticle(article.id)">删除</el-button>
            </el-col>
        </el-row>
      </el-card>
        <el-divider></el-divider>
    </div>
    <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="1000">
    </el-pagination>
</div>
</template>

<script>
import {getStore} from '../libs/storage'
import {setStore} from '../libs/storage'
export default {
    data(){
        return{
            articleList:[],
            page:1,
        }
    },

    created(){
        this.getArticleListById()
    },

    methods:{
        getArticleListById(){
            var id  = getStore('userid')
            this.$axios.get('articleListByAuthorId',{
                params:{
                    id:id,
                    page:this.page
                }
            }).then(resp=>{
                this.articleList = resp.data
                console.log(this.articleList)
            })
        },
        DeleteArticle(id){
            console.log(id)
            this.$axios.get('deletearticle',{
                params:{
                    id:id
                }
            }).then(resp=>{
                if(resp.state==200){
                    this.$message('删除成功')
                }
                
            })
        },
        handleCurrentChange(val){
        if(val!=this.page){
          this.page = val
          this.getArticleListById()
        }
      }
    }
}
</script>

<style>
.router-link-active {
    text-decoration: none;
}
</style>