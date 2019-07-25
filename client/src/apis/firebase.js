import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyBOofJEj6KlJz2MlIdgUWyYIoCWpCQOfT4",
    authDomain: "lastman-quiz.firebaseapp.com",
    databaseURL: "https://lastman-quiz.firebaseio.com",
    projectId: "lastman-quiz",
    storageBucket: "lastman-quiz.appspot.com",
    messagingSenderId: "941100926346",
    appId: "1:941100926346:web:922a5ef76b68093d"
});

var db = firebase.firestore()

export default db