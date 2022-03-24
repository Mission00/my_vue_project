<template>
  <div style="min-height:690px;">
    <el-row>
      <el-col :span="4" v-for="item in movies" :key="item.movieid" >
        <transition>
          <el-card shadow="hover" body-style="padding:0px">
            <div class="movie_div">
              <img :src="item.img_src" class="img" @click="toDetail(item.movie_id)">
            </div>
              <span>{{item.name1 | ellipsis}}</span><br>
              <span>{{item.premiere}}</span>
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
    },
    filters: {
      ellipsis (value) {
        if (!value) return ''
        if (value.length > 8) {
          return value.slice(0,8) + '...'
        }
        return value
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
    height: 300px;
    display: block;
}
.movie_div img:hover
{
  transform: scale(1.2);
  cursor:pointer;
}

</style>
