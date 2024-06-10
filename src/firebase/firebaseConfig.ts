import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userSignUpType } from "../types/types";

const firebaseConfig = {
    apiKey: "AIzaSyAyhaVuef4xfOQK3ZOZwx3wKP0VYQncEPc",
    authDomain: "crud-app-adde1.firebaseapp.com",
    projectId: "crud-app-adde1",
    storageBucket: "crud-app-adde1.appspot.com",
    messagingSenderId: "355077565861",
    appId: "1:355077565861:web:272346fd41ccc7a58f4c4c",
    measurementId: "G-5HLCJDJSYH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const userData = auth.currentUser


export { auth, userData }