
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "",
    authDomain: "nacaapp-91f22.firebaseapp.com",
    projectId: "nacaapp-91f22",
    storageBucket: "nacaapp-91f22.appspot.com",
    messagingSenderId: "891799178924",
    appId: "",
    measurementId: "G-S9ZJ2L8WF7"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// export { collection };



export { firestore, collection };