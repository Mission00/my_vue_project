<template>
  <div>
    <el-menu
    class="categories"
    router
    default-active = "/user/setting">
      <el-menu-item index="/user/setting">
        <i class="el-icon-setting"></i>个人设置
      </el-menu-item>
      <el-menu-item index="/user/article">
        <i class="el-icon-s-comment"></i>全部影评
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>