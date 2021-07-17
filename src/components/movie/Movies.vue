<template>
  <div style="min-height:690px;">
    <el-row>
      <el-col :span="5" v-for="item in movies" :key="item.movieid" >
        <transition>
          <el-card shadow="hover" body-style="padding:0px">
            <div class="movie_div">
              <img :src="require('../../assets/movie_img/'+ item.name2 +'.jpg')" class="img" @click="toDetail(item.movie_id)">
            </div>
            <div style="font-size:17px;">
              <span>{{item.name1}}</span><br>
              <span>{{item.premiere}}</span>
            </div>
          </el-card>
        </transition>
      </el-col>
    </el-row>
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
      }">
      UP
    </div>
  </el-backtop>
  </div>
</template>

<script>
  export default {
    name: 'Movies',
    data () {
      return {
        movies: [],

      }
    },
    methods:{
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
