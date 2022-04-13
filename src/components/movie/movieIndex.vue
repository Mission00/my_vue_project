<template>
  <el-container style="background-color:#F0F0F0">
    <el-aside style="width: 300px;margin-top: 40px;">
    <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
    </el-aside>
    <el-main>
       <el-skeleton style="width:400px" :loading="loading" animated :count="3">
          <Movies class="movies-area" ref="moviesArea"></Movies>
       </el-skeleton>
       <el-row>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import SideMenu from './SideMenu'
  import Movies from './movies'
  export default {
    name: 'AppLibrary',
    components: {SideMenu,Movies},
    data(){
      return{
        currentPage:1,
      }
    },
    methods:{
      listByCategory(){
        var _this = this
        console.log(_this.$refs.sideMenu.Category)
        this.$axios.get('/movies',{
          params:{
           Category:_this.$refs.sideMenu.CategoryID,
           currentPage:this.currentPage
          }
        }).then(resp => {
          if(resp && resp.status === 200)
          {
            _this.$refs.moviesArea.movies = resp.data
            console.log(resp.data)
          }
        })
      },
      handleCurrentChange(val){
        if(val!=this.currentPage){
          this.currentPage = val
          this.listByCategory()
        }
      }
    }
  }
</script>

<style scoped>

</style>