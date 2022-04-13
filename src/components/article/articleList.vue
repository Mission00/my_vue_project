<template>
    <div style="margin-top:30px;text-align:left">
        <el-row :gutter="10">
            <el-col :span="15" offset=2>
                <el-tabs v-model="type" type="border-card" @tab-click="typeChange">
                    <el-tab-pane label="影评" name="0">
                        <div  v-for="article in ArticleList" :key="article.id">
                            <el-row :gutter="3">
                                <el-col :span="4">
                                    <el-image
                                    style="width: 120px; height: 150px"
                                    :src="article.articleCover"
                                    :fit="fit"></el-image>
                                </el-col>
                                <el-col :span="20">
                                    <router-link :to="{path:'/articledetails',query:{id:article.id}}" style="text-decoration: none;">
                                        <el-row>
                                            <h1 style="font-size:25px">{{article.articleTitle}}</h1>
                                        </el-row>
                                        <el-row>
                                            <p>{{article.articleAbstract}}</p>
                                        </el-row>
                                        <el-row>
                                            <p style="font-size:10  px">{{article.articleDate}}</p>
                                        </el-row>
                                    </router-link>
                                </el-col>
                            </el-row>
                             <el-divider></el-divider>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="资讯" name="1">
                        <div  v-for="article in ArticleList" :key="article.id">
                            <el-row :gutter="3">
                                <el-col :span="4">
                                    <el-image
                                    style="width: 120px; height: 150px"
                                    :src="article.articleCover"
                                    :fit="fit"></el-image>
                                </el-col>
                                <el-col :span="20">
                                    <router-link :to="{path:'/articledetails',query:{id:article.id}}" style="text-decoration: none;">
                                        <el-row>
                                            <h1 style="font-size:25px">{{article.articleTitle}}</h1>
                                        </el-row>
                                        <el-row>
                                            <p>{{article.articleAbstract}}</p>
                                        </el-row>
                                        <el-row>
                                            <p style="font-size:10  px">{{article.articleDate}}</p>
                                        </el-row>
                                    </router-link>
                                </el-col>
                            </el-row>
                             <el-divider></el-divider>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="4">
                <el-card>
                    热门影片
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import { getStore } from '../libs/storage'
export default {
    data () {
      return {
        userId:getStore('userid'),
        ArticleList:[],
        type:"0",
      }
    },

    created(){
        this.getArticleList()
    },

    methods:{
        getArticleList(){
            this.$axios.get('/articleList',{
                params:{
                   type:this.type
                }
            }).then(resp=>{
                if(resp.status==200){
                   console.log(resp.data);
                   this.ArticleList = resp.data
                }else{
                    console.log("失败")
                }
            })
        },
        typeChange(tab, event){
            this.type=tab.name
            console.log(this.type);
            this.getArticleList()
        }
    }
}
</script>

<style scoped>
    div>a{
        color:rgb(0, 0, 0);
    }

    .router-link-active {
    text-decoration: none;
}

</style>