<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>

      <!-- <HelloWorld/> -->
      <Question></Question>

      <img src='./assets/yes.png' alt="yes">
      <img src='./assets/no.png' alt="no">
      
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Question from './components/Question'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Question
  },
  data: () => ({
    //
  }),
};
</script>
