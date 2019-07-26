<template>
  <v-app id="inspire">
    <SideNav :openDrawer="drawer"></SideNav>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
           <Login  v-if="$store.state.isLogin == false"></Login>
           <Signout  v-if="$store.state.isLogin == true"></Signout>
    </v-app-bar>


    <v-content>
      <!-- <HelloWorld/> -->
      <!-- <Question></Question> -->
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import SideNav from "./components/SideNav"
import Login from "./components/Login"
import Signout from "./components/Signout"
import jwt from "jsonwebtoken"

  export default {
    components: {
      SideNav,
      Login,
      Signout,
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = true
      this.$store.dispatch("GET_ROOMS")
      var token = localStorage.getItem("token")
      var decoded = jwt.verify(token, "RAHASIA")
      console.log(decoded)
      this.$store.commit("LOGIN", decoded.username)
    },
  }
</script>
