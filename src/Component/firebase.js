import { getFirestore, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAzSNEHJnEwHTsUSga_eHaw12pqwvsgB1Q",
  authDomain: "react-firebase-50813.firebaseapp.com",
  databaseURL: "https://react-firebase-50813-default-rtdb.firebaseio.com",
  projectId: "react-firebase-50813",
  storageBucket: "react-firebase-50813.appspot.com",
  messagingSenderId: "450000400222",
  appId: "1:450000400222:web:99d1ec43ef90ec7c65a9cf"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const StudentRef = collection(db, "student");