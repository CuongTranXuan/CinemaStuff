import Vue from "vue";
import Router from "vue-router";
import TopsView from "@/views/TopsView";
import SearchView from "@/views/SearchView";
import MoviesView from "@/views/MoviesView";
import PlayerView from "@/views/PlayerView";
import Player from "@/views/Player";
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
      component: MoviesView
    },
    {
      path: "/movies/:id",
      component: PlayerView
    },
    {
      path: "/movies/:id/play",
      component: Player
    }
  ]
});
