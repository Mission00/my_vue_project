<template>
    <div style="margin-top:30px;text-align:left">
        <el-row :gutter="10">
            <el-col :span="15" offset="2">
                    <el-card style="text-align: left;width: 900px;">
                        <div>
                        <span style="font-size: 20px"><strong>{{article.articleTitle}}</strong></span>
                        <el-divider content-position="left">{{article.articleDate}}</el-divider>
                        <div class="markdown-body">
                            <div v-html="article.articleContentHtml"></div>
                        </div>
                        </div>
                    </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    相关影片
                    <div class="movie_div">
                    <img :src="movie.img_src" style="height:300px;margin-bottom:10px" @click="toDetail(movie.movie_id)">
                    </div>
                </el-card>
                <el-card>
                    相关文章
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            article:{},
            movie:{},
        }
    },
    created(){
        this.getArticleById()
    },
    methods:{
        getArticleById(){
            var id = this.$route.query.id
            console.log(id)
            
            this.$axios.get('/getArticle',{
                params:{
                    id:id
                }
            }).then(resp=>{
                if(resp.status==200){
                    this.article = resp.data
                    console.log(this.article)
                    this.getLinkMovie(this.article.movieID)
                }
            })
        },
        getLinkMovie(movieid){            
            this.$axios.get('/details',{
                params:{
                    movieid:movieid
                }
            }).then(resp=>{
                if(resp.status==200){
                    this.movie = resp.data
                    console.log(this.movie)
                }
            })
        },
        toDetail(id){
        //this.$router.push({ path: '/details', query: {id: id}});
        let routeData = this.$router.resolve({
          name: "Details",
          query: {id: id}
        });
        window.open(routeData.href, '_blank');
      }
    }
}
</script>

<style scope>
.movie_div
{
  overflow: hidden;
  float: left;
  margin: 5px;
  display: block;
  position: relative;
}
.movie_div img
{
    transition: all 0.4s;
    width: 100%;
    display: block;
}
.movie_div img:hover
{
  transform: scale(1.2);
  cursor:pointer;
}


</style>