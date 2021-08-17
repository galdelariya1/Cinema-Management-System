import firebase from 'firebase/app'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCye9IlcfOMWZ9ujZ9KaqPifU0IL61ZOjs",
  authDomain: "cinema-management-system-4ea0c.firebaseapp.com",
  projectId: "cinema-management-system-4ea0c",
  storageBucket: "cinema-management-system-4ea0c.appspot.com",
  messagingSenderId: "100501815736",
  appId: "1:100501815736:web:6bffa7fff3752a02028f4d",
  measurementId: "G-BST71VZFPM"
};


firebase.initializeApp(firebaseConfig);

export default firebase;

