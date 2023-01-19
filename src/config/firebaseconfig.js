// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1BZbNu5HKzuTwoNVb9vphR82hWrLobgQ",
  authDomain: "ipt-final-project.firebaseapp.com",
  projectId: "ipt-final-project",
  storageBucket: "ipt-final-project.appspot.com",
  messagingSenderId: "613838995176",
  appId: "1:613838995176:web:ea0a71484dc4d79cbdd35d",
  measurementId: "G-B5BYZ7EF6J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
