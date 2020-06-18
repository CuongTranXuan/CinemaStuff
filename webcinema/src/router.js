import Vue from "vue";
import Router from "vue-router";
import TopsView from "@/views/TopsView";
import SearchView from "@/views/SearchView";
// import MoviesView from "@/views/MoviesView";
import PlayerView from "@/views/PlayerView";
Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: '/film/',
  routes: [
    {
      path: "/",
      redirect: { name: "tops" }
    },
    {
      path: "/tops",
      name: "tops",
      component: TopsView
    },
    {
      path: "/search",
      name: "search",
      component: SearchView
    },
    {
      path: "/movies",
      name: "movies",
      component: TopsView
    },
    {
      path: "/movies/:id",
      component: PlayerView
    }
  ]
});
