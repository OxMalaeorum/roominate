import Vue from "vue";
import { store } from "./store";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login";
import Register from "./views/Register";
//officer views
import OfficerHome from "./views/OfficerHome";
import ResidenceOff from "./views/ResidenceOff";
import ResoffDetail from "./views/ResidenceOffDetail.vue";
import UnitoffDetail from "./views/UnitOffDetail";
import ApplicationOff from "./views/ApplicationOff";
//applicant views
import ApplicantHome from "./views/ApplicantHome";
import ResidenceApp from "./views/ResidenceApp";
import ResappDetail from "./views/ResidenceAppDetail";

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
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: ifNotAuth
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
      path: "/officer/home",
      component: OfficerHome,
      beforeEnter: ifAuth
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
      path: "/officer/application",
      component: ApplicationOff,
      beforeEnter: ifAuth
    },
    {
      path: "/applicant/home",
      component: ApplicantHome,
      beforeEnter: ifAuth
    },
    {
      path: "/applicant/residence",
      component: ResidenceApp,
      beforeEnter: ifAuth
    },
    {
      path: "/applicant/residence_detail",
      component: ResappDetail,
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
