<template>
<div>
    <el-card class="detail-card">
        <p>{{movie.name1}}</p>
        <div style="padding:30px">
            <el-form>
                <el-form-item><h style="font-size:40px">{{movie.name1}}</h></el-form-item>
                <el-form-item>
                   <el-tooltip class="item" effect="dark" content="点击播放" placement="right-start">
                    <img :src="require('../../assets/movie_img/'+movie.name2+'.jpg')" style="width:25%;cursor:pointer;" @click="toVedio(movie.name1,movie.name2)"/>
                     </el-tooltip>
                </el-form-item>
            </el-form>
            <p>导演：{{movie.director}}</p>
            <p>编剧：{{movie.screenwriter}}</p>
            <p>主演：{{movie.actot}}</p>
            <p>类型：{{movie.type}}</p>
            <p>制片国家/地区: {{movie.country}}</p>
            <p>语言: {{movie.language}}</p>
            <p>首播: {{movie.director}}</p>
            <p>导演：{{movie.premiere}}</p>
            <p>集数：{{movie.num}}</p>
            <p>片长：{{movie.movie_length}}</p>
            <p>【剧集简介】<br><br>{{movie.introduction}}</p>
        </div>
    </el-card>

    <el-card class="detail-card">
      <edit-review></edit-review>
      <div style="text-align: right;margin-top:5px"> 
        <router-link :to="{path:'/articleEdit',query:{movieID:movieid}}">
          <el-button type="primary" icon="el-icon-edit" v-show="userid!=null">写影评</el-button>
        </router-link>
      </div>

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


    <el-backtop  :bottom="100">
    <div
      style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
    >
      UP
    </div>
  </el-backtop>
</div>
    
</template>


<script>
import editReview from './editReview.vue'
import {setStore} from '../libs/storage';
import {getStore} from '../libs/storage';

export default {
    name: 'Details',
    components:{editReview},
    data(){
        return{
            movie:[],
            movieid: this.$route.query.id,
            userid:getStore('userid'),
            username:getStore('username'),
            reviewList:[],
            userNameT:'',
            userIDT:'',
            replayInputVisible:false,
            review:'',
            fatherID:0,
            ite:''
        }
    },


    created: function(){
        this.$nextTick(function () {
        var _this = this
        this.$axios.get('/details',{
          params:{
           movieid: this.movieid,
          }
        }).then(resp => {
          if(resp && resp.status === 200)
          {
            console.log(resp.data);
            _this.movie = resp.data
          }
        })
        this.getReviewListByMovieID()
        
      })
    },
    methods:{
      check(){
        if(getStore('userid')!=null){
          return true;
        }
        return false;
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
          }).then(resp=>{
            if(resp.status==200){
              this.replayInputVisible = false
              this.getReviewListByMovieID()
            }
          })
      },
      toVedio(name1,name2){
        let routeData = this.$router.resolve({
          name: "Video",
          query: {name1: name1,
          name2:name2}
        });
        window.open(routeData.href, '_blank');
      },
      getReviewListByMovieID(){
        this.$axios.get('/getReviewList',{
          params:{
           id:this.movieid,
            type:'0',
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
      getReviewlikecount(reviewid,index){
         this.$axios.get('/reviewlikecount',{
          params:{
            reviewid:reviewid,
            userid:this.userid
          }
        }).then(resp=>{
          this.reviewList[index].likeCount = resp.data.count
        })
      },
    },
}
</script>

<style scoped>

.detail-card{
    width: 80%;
    margin-top: 20px;
    margin-left:auto;
    margin-right:auto;
}
p{
    font-size: 16px;
    text-align:left;
}

</style>