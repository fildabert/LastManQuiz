<template>
  <v-app id="inspire">
    <SideNav :openDrawer="drawer"></SideNav>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
     <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import SideNav from "./components/SideNav"
  export default {
    components: {
      SideNav
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
        setTimeout(() =>{
            console.log(this.$store.state.rooms)
        }, 500)
    },
  }
</script>