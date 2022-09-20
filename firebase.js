// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCTl977_GpRGaCUnorIr6UOsd_8trTXN3w",
    authDomain: "facebook-next-clone-cb2a1.firebaseapp.com",
    projectId: "facebook-next-clone-cb2a1",
    storageBucket: "facebook-next-clone-cb2a1.appspot.com",
    messagingSenderId: "182543700945",
    appId: "1:182543700945:web:27adf4eab03757062406f0",
    measurementId: "G-BW6GDPJ37Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { db, storage }