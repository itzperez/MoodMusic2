// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { exp } from "react-native/Libraries/Animated/Easing";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB05YJhAFOxKK1wcb4QbzVWnV8_0Uw0rTk",
  authDomain: "mood-music-c9193.firebaseapp.com",
  databaseURL: "https://mood-music-c9193-default-rtdb.firebaseio.com",
  projectId: "mood-music-c9193",
  storageBucket: "mood-music-c9193.appspot.com",
  messagingSenderId: "856652497281",
  appId: "1:856652497281:web:40d2d5222964f33ddbe880",
  measurementId: "G-57LNG0TWHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
