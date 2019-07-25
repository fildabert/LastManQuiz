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
           <Login/>
    </v-app-bar>


    <v-content>
   
     <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import SideNav from "./components/SideNav"
import Login from "./components/Login"
  export default {
    components: {
      SideNav,
      Login
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>
