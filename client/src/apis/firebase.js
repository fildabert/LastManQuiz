import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: 'AIzaSyBOofJEj6KlJz2MlIdgUWyYIoCWpCQOfT4',
    authDomain: 'lastman-quiz.firebaseapp.com',
    projectId: 'lastman-quiz'
});

var db = firebase.firestore()

export default db