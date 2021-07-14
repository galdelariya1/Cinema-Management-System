import firebase from 'firebase/app'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkMpeqY0dN31zv9EStpz-HXWorSpeKck0",
  authDomain: "react-movies-project.firebaseapp.com",
  projectId: "react-movies-project",
  storageBucket: "react-movies-project.appspot.com",
  messagingSenderId: "806454354666",
  appId: "1:806454354666:web:7b0d1772ef3e64403ded93"
};


firebase.initializeApp(firebaseConfig);

export default firebase;

