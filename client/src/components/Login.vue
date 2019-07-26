<template>
  <v-btn class="mx-2" @click.prevent="callGoogleSignIn()" fab dark large color="green">
    <v-icon>fab fa-google</v-icon>
  </v-btn>
</template>

<script>
// import firebase from "firebase";
import jwt from "jsonwebtoken"
import firebase from "firebase";
import db from "@/apis/firebase.js";
var provider = new firebase.auth.GoogleAuthProvider();
export default {
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
        });
    },
    callGoogleSignIn() {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result)=> {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var user = result.user;
          var player = user.displayName
          console.log(user, "==============================");
          db.collection("users")
            .where("email", "==", user.email)
            .get()
            .then((querySnapshot)=> {
              console.log(querySnapshot.docs.length);
              if (querySnapshot.docs.length === 0) {
                console.log("oi");
                db.collection("users")
                  .add({
                    email: user.email,
                    username: user.displayName
                  })
                  .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                  })
                  .catch(function(error) {
                    console.error("Error adding document: ", error);
                  });
              }
              // var token = result.credential.accessToken;
              // localStorage.setItem("token", token);
              // this.$store.state.isLogin = true
              // this.$store.state.user.username = player
              var jwttoken = jwt.sign({username: player}, "RAHASIA", {expiresIn: "6h"})
              localStorage.setItem("token", jwttoken)
              // var decoded = jwt.decode(jwttoken)
              // console.log(decoded)
              this.$store.commit('LOGIN', player)
              // console.log(token);
            })
            .catch(function(error) {
              console.log("Error getting documents: ", error);
            });

          // The signed-in user info.
          //   console.log(user);
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }
  }
};
</script>

<style>
</style>
