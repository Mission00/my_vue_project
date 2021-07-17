<template>
  <el-menu
    class="categories"
    default-active="0"
    background-color="rgb(255,255,255,.3)"
    @select="handleSelect"
    
    active-text-color="blue">
    <el-menu-item index="0">
      <i class="el-icon-menu"></i>
      <span slot="title">全部</span>
    </el-menu-item>
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title">日剧</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">韩剧</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-menu"></i>
      <span slot="title">欧美剧集</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-menu"></i>
      <span slot="title">欧美电影</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-menu"></i>
      <span slot="title">纪录片/综艺</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'SideMenu',
    data(){
      return{
        Category:'',
      }
    },
    
    created: function () {
      this.$nextTick(function () {
        this.Category = '全部';
        this.$emit('indexSelect')
      })
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key)
        if(key==0)
        {
          this.Category = '全部';
        }
        else if(key==1)
        {
          this.Category = '日剧';
        }
        else if(key==2)
        {
         this. Category = '韩剧';
        }
        else if(key==3)
        {
          this.Category = '欧美剧集';
        }
        else if(key==4)
        {
          this.Category = '欧美电影';
        }
        else if(key==5)
        {
          this.Category = '纪录片/综艺';
        }
        this.$emit('indexSelect')
      }
    }
  }
</script>

<style scoped>
  .categories {
    position: fixed;
    left: 130px;
  }
</style>