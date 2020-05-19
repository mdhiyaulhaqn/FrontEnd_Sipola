import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
// import authHeader from '../../services/auth-header';
Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active"
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const login = localStorage.getItem('user');
  

  // // const loggedIn = JSON.parse(localStorage.getItem('user'));

  // console.log(loggedIn)


  if (authRequired && !login) {
      next('/login');
    }
  else {
    const loggedIn = JSON.parse(login);
    if(to.matched.some(record => record.meta.is_admin)) {
      if(loggedIn.roles.includes("ROLE_ADMIN")){
          next()
      } else {
        next('/forbidden')
      }
    } 
    else if(to.matched.some(record => record.meta.is_dirut)) {
      if(loggedIn.roles.includes("ROLE_DIREKTUR_UTAMA")){
          next()
      } else {
        next('/forbidden')
      }
    } 
    else if(to.matched.some(record => record.meta.is_pm)) {
      if(loggedIn.roles.includes("ROLE_PROJECT_MANAGER")){
          next()
      } else{
        next('/forbidden')
      }
    }
    else if(to.matched.some(record => record.meta.is_sales)) {
      if(loggedIn.roles.includes("ROLE_SALES_MARKETING")){
          console.log("hihihi")
          next()
      } else{
        next('/forbidden')
      }
    }
    else if(to.matched.some(record => record.meta.is_service_team)) {
      if(loggedIn.roles.includes("ROLE_SERVICE_TEAM")){
          next()
      }
      else if(loggedIn.roles.includes("ROLE_FINANCE")){
        next()
      } 
      else{
        next('/forbidden')
      }
    }
    else if(to.matched.some(record => record.meta.is_finance)) {
      if(loggedIn.roles.includes("ROLE_FINANCE")){
          next()
      } else{
        next('/forbidden')
      }
    }
    else if(to.matched.some(record => record.meta.is_logistik)) {
      if(loggedIn.roles.includes("ROLE_LOGISTIK")){
          next()
      } else{
          next('/forbidden')
      }
    }
    else if(to.matched.some(record => record.meta.is_supervisor)) {
      if(loggedIn.roles.includes("ROLE_SUPERVISOR")){
          next()
      } else{
        next('/forbidden')
      }
    }else{
      next()
    }
  }
});


export default router;
