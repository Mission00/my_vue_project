<template>
  <div>
    <el-carousel :outoplay="false" height="500px" style="backgrond:black">
      <el-carousel-item v-for="item in i_movies" :key="item.indexid">
        <div style="display: table; z-index:9999">
          <div class="movie_title">
            <p><font style="font-size:70px;font-weight:bold;color:white;">{{item.name1}}</font></p>
            <el-button class="movie_botton" @click="JumpToMovie(item.movieid)">{{item.name2}}</el-button>
          </div>
        </div>
      <img :src="require('../../assets/index_img/'+ item.src +'.jpg')" style="max-width:100%">
      </el-carousel-item>
    </el-carousel>
    <div>
      <el-row>
        <p style="float:left;margin:30px;font-weight:bold;font-size:20px">最热影片</p>
      </el-row>
        <el-row>
          <el-col :span="3" v-for="item in hot_movies" :key="item.movieid" >
            <transition>
              <el-card shadow="hover" body-style="padding:0px">
                <div class="movie_div">
                  <img :src="item.img_src" class="img" @click="toDetail(item.movie_id)">
                </div>
                <div style="font-size:17px;">
                  <span>{{item.name1}}</span><br>
                  <span>{{item.premiere}}</span>
                </div>
              </el-card>
            </transition>
          </el-col>
        </el-row>
    </div>
    <div>
      <el-row>
        <p style="float:left;margin:30px;font-weight:bold;font-size:20px">最新影片</p>
      </el-row>
        <el-row>
          <el-col :span="3" v-for="item in new_movies" :key="item.movieid" >
            <transition>
              <el-card shadow="hover" body-style="padding:0px">
                <div class="movie_div">
                  <img :src="item.img_src" class="img" @click="toDetail(item.movie_id)">
                </div>
                <div style="font-size:17px;">
                  <span>{{item.name1}}</span><br>
                  <span>{{item.premiere}}</span>
                </div>
              </el-card>
            </transition>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppIndex',
    created: function () {
            this.$nextTick(function () {
        var _this = this
        this.$axios.get('/index')
        .then(resp => {
          console.log(resp.data)
          _this.i_movies = resp.data
        })
        
      })
    },
    data(){
      return{
        i_movies:[],
        hot_movies:[],
        new_movies:[],
      }
    },

    mounted(){
      this.getHotMovies()
      this.getNewMovies()
    },



    methods:{
      JumpToMovie(id){
        let routeData = this.$router.resolve({
          name: "Details",
          query: {id: id}
        });
        window.open(routeData.href, '_blank');
      },
      getHotMovies(){
        this.$axios('/getHotMovies').then(resp=>{
          this.hot_movies = resp.data
          console.log(this.hot_movies)
        })
      },
      getNewMovies(){
        this.$axios('/getNewMovies').then(resp=>{
          this.new_movies = resp.data
          console.log(this.new_movies)
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

<style scoped>
.movie_title{
    position:absolute;
    z-index:9999;
    margin-left:200px;
    margin-top:300px;
    display: table-cell;
    vertical-align:middle;
    text-align:center;
}
.movie_name{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.movie_botton{
  height:50px;
  width:260px;
  background-color:black;
  color:white;
  border-color:black;
}

.el-button {
    color: #fff;
    background-color: #2c0e03;
    border-color:black;
    letter-spacing:3px
  }
  .el-button:hover{
    background-color: rgb(53, 51, 51);
    border-color:black;
    color: gold;
  }
  .el-button:focus{
    background-color: #2c0e03;
    border-color:black;
    color: white;
  }

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
