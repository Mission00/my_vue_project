<template>
  <el-container style="background-color:#F0F0F0">
    <el-aside style="width: 300px;margin-top: 40px;">
    <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
    </el-aside>
    <el-main>
       <el-skeleton style="width:400px" :loading="loading" animated :count="3">
          <Movies class="movies-area" ref="moviesArea"></Movies>
       </el-skeleton>
    </el-main>
  </el-container>
</template>

<script>
  import SideMenu from './SideMenu'
  import Movies from './movies'
  import {getStore} from '../libs/storage' 
  export default {
    name: 'AppLibrary',
    components: {SideMenu,Movies},
    methods:{
      listByCategory(){
        var _this = this
        this.$axios.get('/movies',{
          params:{
           Category:_this.$refs.sideMenu.Category,
          }
        }).then(resp => {
          if(resp && resp.status === 200)
          {
            _this.$refs.moviesArea.movies = resp.data
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>