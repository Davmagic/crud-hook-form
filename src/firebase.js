import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
let fbConfig = {
    apiKey: "AIzaSyDDZOLxYn6tMlS0UilhkzmYbXIWht6VpDs",
    authDomain: "fb-incidents.firebaseapp.com",
    projectId: "fb-incidents",
    storageBucket: "fb-incidents.appspot.com",
    messagingSenderId: "217243689906",
    appId: "1:217243689906:web:154210d6a27668cfaebaab"
  };
// Initialize Firebase
firebase.initializeApp(fbConfig);

const fb =firebase.database()

export default fb;