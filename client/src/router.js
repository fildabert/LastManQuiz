import Vue from 'vue'
import Router from 'vue-router'
import Game from "./components/Game.vue"

// Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/room/:name',
      name: "Game",
      component: Game
    }
  ]
})
