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

                    
                    <el-card class="detail-card">
                    <edit-ar-review></edit-ar-review>

                    <div :span="5" v-for="(item,index) in reviewList" :key="item.id" style="text-align:left">
                        <el-row :gutter="20">
                        <el-col :span="2"><div class="block"><el-avatar :size="50" :src="null"></el-avatar></div></el-col>
                        <el-col :span="10">
                            <el-row>
                            <el-font style="font-size:15px">{{item.userNameF}}</el-font>
                            </el-row>
                            <el-row>
                            <el-font style="font-size:10px">{{item.time}}</el-font>
                            </el-row>
                            <p>{{item.review}}</p>
                            <el-row>
                            <button @click="likeButtonClick(index,item.id)">赞{{item.likeCount}}</button>
                            <button @click="replayButtonClick(item)">回复</button>
                            </el-row>


                            <el-row>
                            <div v-for="children in item.children" :key="children.id">
                                <el-col :span="20">
                                    <el-row>
                                        <el-font style="font-size:10px">{{children.time}}</el-font>
                                        <el-font style="font-size:15px">{{children.userNameF}}</el-font>
                                        <el-font style="font-size:15px">回复</el-font>
                                        <el-font style="font-size:15px">{{children.userNameT}}</el-font>
                                        <el-font style="font-size:15px">:{{children.review}}</el-font>
                                        <button  @click="replayButtonClick(children)">回复</button>
                                        <el-divider></el-divider>
                                    </el-row>
                                </el-col>

                            </div>
                            </el-row>

                        </el-col>
                        </el-row>

                        <el-divider></el-divider>
                    </div>
                    </el-card>

                    <el-dialog
                    title="回复"
                    :visible.sync="replayInputVisible"
                    width="30%"
                    :before-close="handleClose">
                    <el-input v-model="review" :placeholder="userNameT"></el-input>
                    <el-button @click="reply">回复</el-button>
                    </el-dialog>
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
import editArReview from './editArReview.vue'
import {getStore} from '../libs/storage';
export default {
    components:{editArReview},
    data(){
        return{
            article:{},
            movie:{},
            reviewList:[],
            replayInputVisible:false,
            review:'',
            fatherID:0,
            ite:'',
            userNameT:'',
            userIDT:'',
            userid:getStore('userid'),
            username:getStore('username'),
        }
    },
    created(){
        this.getArticleById(),
        this.getReviewListByMovieID()
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
        getReviewListByMovieID(){
        var id = this.$route.query.id
        this.$axios.get('/getReviewList',{
          params:{
            id:id,
            type:'1',
          }
        }).then(resp=>{
          console.log(resp)
          this.reviewList = resp.data
        })
      },
      likeButtonClick(index,itemId){
        console.log(itemId)
        console.log(index)
        console.log(this.userid)
        this.$axios.get('/reviewlike',{
          params:{
            reviewid:itemId,
            userid:this.userid
          }
        }).then(resp=>{
            if(resp.data=="点赞成功"){
              this.$message(resp.data)
              this.getReviewlikecount(itemId,index)
            }else if(resp.data=="重复点赞"){
              this.$message(resp.data)
            }
        })
      },
        reply(){
            console.log(this.userNameT)
            this.$axios.post('/addReview',{
                itemID:this.movieid,
                fatherID:this.fatherID,
                userIDF:getStore('userid'),
                userIDT:this.userIDT,
                userNameT:this.userNameT,
                userNameF:getStore('username'),
                review:this.review,
                type:"1",
            }).then(resp=>{
                if(resp.status==200){
                this.replayInputVisible = false
                this.getReviewListByMovieID()
                }
            })
        },
        replayButtonClick(item){
        this.replayInputVisible = !this.replayInputVisible
        this.userNameT = item.userNameF
        this.userIDT = item.userIDF
        if(item.fatherID==0){
          this.fatherID = item.id
        }else{
          this.fatherID=item.fatherID
        }
        console.log(this.userNameT)
        console.log(this.userIDT)
        console.log(this.fatherID)
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
.detail-card{
    width: 900px;
    margin-top: 20px;
    margin-left:auto;
    margin-right:auto;
}


</style>