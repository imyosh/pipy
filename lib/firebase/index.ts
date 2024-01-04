import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGN1YUEoCjIqGqfDYtnWaWUPM26YqTI2w",
  authDomain: "pipy-50ce1.firebaseapp.com",
  projectId: "pipy-50ce1",
  storageBucket: "pipy-50ce1.appspot.com",
  messagingSenderId: "860286628883",
  appId: "1:860286628883:web:76d6aa46c88be5da913be6",
  measurementId: "G-GZ03HC4PX4",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
