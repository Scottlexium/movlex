const firebase = require('firebase');
const firebaseConfig = {

    apiKey: "AIzaSyDEuMiwohc5YOVf36ygH9PfEPJgCpX24d0",
  
    authDomain: "movlex.firebaseapp.com",
  
    projectId: "movlex",
  
    storageBucket: "movlex.appspot.com",
  
    messagingSenderId: "172423701277",
  
    appId: "1:172423701277:web:b16984f70899c7710f37f4",
  
    measurementId: "G-JT9SEWQ2DN"
  
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const links = db.collection("links");
  module.export = links;