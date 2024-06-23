// firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyChgxbZwVKF3GKP5dIJajkYO2V7nB4kpS4",
    authDomain: "book-holiday-home.firebaseapp.com",
    projectId: "book-holiday-home",
    storageBucket: "book-holiday-home.appspot.com",
    messagingSenderId: "387164426629",
    appId: "1:387164426629:web:8d14000224c01b95a9b4ec",
    measurementId: "G-F9YFVDW67D"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth, firebaseApp };


