<template>
    <div  style="margin-top:5%">
        <el-container>
        <el-aside>
            <UserMenu></UserMenu>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
        </el-container>
    </div>
</template>

<script>
import UserMenu from './userMenu.vue'
export default {
    name: 'Home',
    components: {UserMenu}
}
</script>

<style>

</style>