import Vue from "vue";
import Router from "vue-router";
import TopsView from "@/views/TopsView";
import SearchView from "@/views/SearchView";
import MoviesView from "@/views/MoviesView";
import PlayerView from "@/views/PlayerView";
import LoginForm from "@/views/LoginForm";
import Player from "@/views/Player";
import Upload from "@/views/Upload";
Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.NODE_ENV === "development" ? "/" : "/vue-movies/",
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
      path: "/login",
      name: "Login",
      component: LoginForm
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
      path: "/upload",
      name: "upload",
      component: Upload
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
