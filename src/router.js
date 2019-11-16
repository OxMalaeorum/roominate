import Vue from "vue";
import { store } from "./store";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ResidenceHome from "./views/ResidenceHome";
import Login from "./views/Login";
import Register from "./views/Register";
//officer views
import ResidenceOff from "./views/ResidenceOff";
import ResoffDetail from "./views/ResidenceOffDetail.vue";
import UnitoffDetail from "./views/UnitOffDetail";
import Profile from "./views/Profile";
//applicant views
import ResidenceApp from "./views/ResidenceApp";
import ResappDetail from "./views/ResidenceAppDetail";
import ApplicationApp from "./views/ApplicationApp";

//DO NOT INCLUDE THIS SAVE HACK
import SaveHack from "./views/SaveHack";

Vue.use(Router);

const ifAuth = (to, from, next) => {
  if (store.getters.getAuth) {
    next();
    return;
  }
  next("/login");
};

const ifNotAuth = (to, from, next) => {
  if (!store.getters.getAuth) {
    next();
    return;
  }
  next("/folks2/landing");
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/save",
      name: "save",
      component: SaveHack
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/residence",
      name: "residence",
      component: ResidenceHome
    },
    {
      path: "/login",
      component: Login,
      beforeEnter: ifNotAuth
    },
    {
      path: "/register",
      component: Register,
      beforeEnter: ifNotAuth
    },
    {
      path: "/officer/residence",
      component: ResidenceOff,
      beforeEnter: ifAuth
    },
    {
      path: "/officer/residence_detail",
      component: ResoffDetail,
      beforeEnter: ifAuth
    },
    {
      path: "/officer/unit_detail",
      component: UnitoffDetail,
      beforeEnter: ifAuth
    },
    {
      path: "/officer/profile",
      component: Profile,
      beforeEnter: ifAuth
    },
    {
      path: "/applicant/residence",
      component: ResidenceApp,
      beforeEnter: ifAuth
    },
    {
      path: "/applicant/application",
      component: ApplicationApp,
      beforeEnter: ifAuth
    },
    {
      path: "/applicant/residence_detail",
      component: ResappDetail,
      beforeEnter: ifAuth
    },
    {
      path: "/applicant/profile",
      component: Profile,
      beforeEnter: ifAuth
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
