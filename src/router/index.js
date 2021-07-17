import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import Register from '@/components/register'
import Home from '@/components/Home'
import LibraryIndex from '@/components/movie/movieIndex'
import Details from '@/components/details/details'
import Search from '@/components/search/search'
import Video from '@/components/video/video'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name:'Register',
      component: Register
    },
    {
      path: '/login',
      name:'Login',
      component: Login
    },

    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
      /*beforeEnter: (to, from, next) => {
        if( sessionStorage.getItem("USERID")==null)
        {
          window.alert("请先登录");
          next('/login');
        }
        else
        {
          next();
        }
      },*/
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Appindex',
          component: AppIndex,
        },
        {
          path: '/movie',
          name: 'Movie',
          component: LibraryIndex,
        },
        {
          path: '/admin',
          name: 'Appindex',
          component:null,

        },
        {
          path: '/details',
          name: 'Details',
          component:Details,
        },
        {
          path: '/search',
          name: 'Search',
          component:Search,
        },
        {
          path: '/video',
          name: 'Video',
          component:Video,
        },
      ]
    },
  ]
})