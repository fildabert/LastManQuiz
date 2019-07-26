<template>
  <v-btn class="mx-2" @click.prevent="signOut()" fab dark large color="red">
    <v-icon>fas fa-sign-out-alt</v-icon>
  </v-btn>
</template>

<script>
// import firebase from "firebase";

import firebase from "firebase";
import db from "@/apis/firebase.js";
var provider = new firebase.auth.GoogleAuthProvider();
export default {
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(()=> {
          // Sign-out successful.
           localStorage.removeItem("token");
             this.$store.commit('LOGOUT')
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  }
};
</script>

<style>
</style>
