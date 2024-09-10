// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJdg8XKr9cpGZfk2rhymNmQ_gkh3mb1Ek",
  authDomain: "inventory-management-app-444cf.firebaseapp.com",
  projectId: "inventory-management-app-444cf",
  storageBucket: "inventory-management-app-444cf.appspot.com",
  messagingSenderId: "763590407274",
  appId: "1:763590407274:web:263407a46aedc1fc1e4613"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}