<template>
    <el-menu
      :default-active = this.$route.path
      router
      mode="horizontal"
      background-color="black"
      text-color="#FFFFFF"
      active-text-color="gold"
      style="min-width: 100%;">

      <el-menu-item index="/index" style="width:150px;margin-left:100px">
        <i class="el-icon-s-home"></i>首页
      </el-menu-item>

      <el-menu-item index="/movie" style="width:150px">
        <i class="el-icon-video-camera-solid"></i>电影库
      </el-menu-item>
       <el-menu-item index="/article" style="width:150px">
        <i class="el-icon-video-camera-solid"></i>资讯
      </el-menu-item>
      <!-- <el-menu-item index="/articleEdit" style="width:150px">
        <i class="el-icon-video-camera-solid"></i>写影评
      </el-menu-item> -->

      <el-input v-model="searchMesg" placeholder="搜索影片" 
      style="position:absolute;margin-top:10px;width:220px" 
      suffix-icon="el-icon-search"
      @keydown.enter.native="searchEnterFun"></el-input>

      <template v-if="userName!=null">
        <el-submenu style="float:right;margin-right:100px;">
          <template slot="title"><el-avatar :src="this.head"></el-avatar>  {{userName}}</template>
          <el-menu-item index="/user/setting"><i class="el-icon-user"></i>个人中心</el-menu-item>
          <el-menu-item @click="logout"><i class="el-icon-back"></i>退出登录</el-menu-item>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item index="/register" @click="logout"  style="float:right;margin-right:100px"><i class="el-icon-back"></i>注册</el-menu-item>
        <el-menu-item index="/login"  style="float:right;"><i class="el-icon-user"></i>登录</el-menu-item>
      </template>
    </el-menu>
</template>

<script>
import {getStore} from '../libs/storage';
import {removeStore} from '../libs/storage';

export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/movie', navItem: '影视库'},
        {name: '/article', navItem: '资讯'},
      ],
      userName: getStore('username'),
      head:getStore('head'),
      searchMesg:'',
    }
  },
  methods:{
    logout(){
      const h = this.$createElement;
      sessionStorage.clear();
      location.reload([true]);
    },
    searchEnterFun(e){
      var keyCode = window.Event?e.keyCode:e.whitch;
      if(keyCode == 13)
      {
        this.search();
      }
    },
    search(){
      let routeData = this.$router.resolve({
          name: "Search",
          query: {searchMesg: this.searchMesg}
      });
      window.open(routeData.href, '_blank');
    }
  },
}
</script>

<style>
  .el-menu--collapse .el-menu .el-submenu, .el-menu--popup
  {
    min-width: 120px!important;
  }

  .el-submenu .el-submenu__title:hover{
    background-color: #000000 !important;
    color: gold!important;
  }
  .el-menu.el-menu--horizontal{
  border-bottom: none;
}

</style>

<style scoped>
.el-menu-item:hover{
    background-color: #094777 !important;
    color: gold!important;
}
.el-menu-item{
    background-color: #000000 !important;
    height: 65px;
    font-size:17px;
}

</style>