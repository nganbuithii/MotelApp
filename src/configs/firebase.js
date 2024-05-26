
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDlIBEjaa4tdVx_l64PtZ_Gsrb11B9TkKQ",
    authDomain: "nacaapp-91f22.firebaseapp.com",
    projectId: "nacaapp-91f22",
    storageBucket: "nacaapp-91f22.appspot.com",
    messagingSenderId: "891799178924",
    appId: "1:891799178924:web:2b564d44e8600667999909",
    measurementId: "G-S9ZJ2L8WF7"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// export { collection };



export { firestore, collection };