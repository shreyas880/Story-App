import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyD80n_yLZ6mUqjQn_TDMHCp0l7tL-yKG2E",
  authDomain: "story-app4-afcef.firebaseapp.com",
  databaseURL: "https://story-app4-afcef.firebaseio.com",
  projectId: "story-app4-afcef",
  storageBucket: "story-app4-afcef.appspot.com",
  messagingSenderId: "440596486701",
  appId: "1:440596486701:web:d1ce22c5bb9a1ed3c1b6a4",
  measurementId: "G-2F048CCBWL"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default  firebase.firestore();