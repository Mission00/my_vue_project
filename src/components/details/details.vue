<template>
<div>
    <el-card class="detail-card">
        <p>{{movie.name1}}</p>
        <div style="padding:30px">
            <el-form>
                <el-form-item><h style="font-size:40px">{{movie.name1}}</h></el-form-item>
                <el-form-item>
                   <el-tooltip class="item" effect="dark" content="点击播放" placement="right-start">
                    <img :src="require('../../assets/movie_img/'+movie.name2+'.jpg')" style="width:55%;cursor:pointer;" @click="toVedio(movie.name1,movie.name2)"/>
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
export default {
    name: 'Details',
    data(){
        return{
            movie:[],
        }
    },

    created: function(){
        this.$nextTick(function () {
        var _this = this
        this.$axios.get('/details',{
          params:{
           movieid: this.$route.query.id,
          }
        }).then(resp => {
          if(resp && resp.status === 200)
          {
            console.log(resp.data);
            _this.movie = resp.data
          }
        })
        
      })
    },
    methods:{
      toVedio(name1,name2){
        let routeData = this.$router.resolve({
          name: "Video",
          query: {name1: name1,
          name2:name2}
        });
        window.open(routeData.href, '_blank');
      },
    },
}
</script>

<style scoped>

.detail-card{
    width: 80%;
    margin-top: 50px;
    margin-left:auto;
    margin-right:auto;
}
p{
    font-size: 16px;
    text-align:left;
}

</style>