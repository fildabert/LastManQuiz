<template>
  <v-btn class="mx-2" @click.prevent="callGoogleSignIn()" fab dark large color="green">
    <v-icon>fab fa-google</v-icon>
  </v-btn>
</template>

<script>
// import firebase from "firebase";

import firebase from "@/apis/firebaseAuth.js";
var provider = new firebase.auth.GoogleAuthProvider();
export default {
  methods: {
    callGoogleSignIn() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var user = result.user;
          console.log(user);
          firebase
            .firestore()
            .collection("users")
            .where("email", "==", user.email)
            .get()
            .then(function(querySnapshot) {
              console.log(querySnapshot.docs.length);
              if (querySnapshot.docs.length === 0) {
                  console.log('oi')
                firebase
                  .firestore()
                  .collection("users")
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
              var token = result.credential.accessToken;
              localStorage.setItem("token", token);
              console.log(token);
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
