import Vue from 'vue'
import VueRouter from 'vue-router'
import user from '@/view/user/route'
//import home from '@/view/content/router'
import Cookies from 'js-cookie'
import store from '@/store'
import addRoutes from "./addRouter"
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import(/* webpackChunkName: "content" */'@/view/content'), 
    },
    ...user,
  ]
})
router.beforeEach(async (to, from, next) => {
  const token = Cookies.get('token')
  if (to.path === '/login') {
    // If you are accessing the login interface, if the token information exists, it means you have already logged in and jump to the home page
    if (token) {
      next("/")
      return
    }
    next()
    return
  }
  // If you access the non-login interface and the token does not exist, jump to the login interface
  if (!token) {
    next({ path: '/login' })
    return
  }
  // Load dynamic menus and routes
  const menuTree = store.state.navMenu.navTree;
  if (!menuTree) {
   
    const menuList = await store.dispatch('navMenu/addMenuList',1)
   
    if(!menuList){
      next()
      return
    }
    let routes = await addRoutes(menuList)
    for (let childRoutes of routes) {
      router.addRoute('Home', childRoutes)
    }
    //If the interface is refreshed for the first time or refreshed, the routes will be traversed here.
    // If to cannot find the corresponding route, then he will execute beforeEach((to, from, next)) again until the corresponding route is found
    next({ ...to, replace: true })
    return
  }
  next()


})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default router;