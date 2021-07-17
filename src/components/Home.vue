<template>
  <div class="home">
    <NavMenu></NavMenu>
    <router-view/>
  </div>
</template>

<script>
  import NavMenu from './common/NavMenu'
  export default {
    name: 'Home',
    components: {NavMenu}
  }
</script>

<style>
.home{
    width:100%;
    height:100%;
    position: absolute;
}
html,body,#app,.el-container{
      /*设置内部填充为0，几个布局元素之间没有间距*/
      padding: 0px;
        /*外部间距也是如此设置*/
      margin: 0px;
      /*统一设置高度为100%*/
  }
</style>