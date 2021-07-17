<template>
  <div>
    <el-carousel :outoplay="false" height="689px">
      <el-carousel-item v-for="item in i_movies" :key="item.indexid">
        <div style="display: table; z-index:9999">
          <div class="movie_title">
            <p><font style="font-size:70px;font-weight:bold;color:white;">{{item.name1}}</font></p>
            <el-button class="movie_botton" @click="JumpToMovie(item.movieid)">{{item.name2}}</el-button>
          </div>
        </div>
      <img :src="require('../../assets/index_img/'+ item.src +'.jpg')" style="max-width:100% ">
      </el-carousel-item>
    </el-carousel>
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
      }
    },


    methods:{
      JumpToMovie(id){
        let routeData = this.$router.resolve({
          name: "Details",
          query: {id: id}
        });
        window.open(routeData.href, '_blank');
      },
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

</style>
