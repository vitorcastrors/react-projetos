import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVxpofdbsRq-XeUMoEIUb_CdumWfWyrWY",
  authDomain: "miniblog-cb7b2.firebaseapp.com",
  projectId: "miniblog-cb7b2",
  storageBucket: "miniblog-cb7b2.firebasestorage.app",
  messagingSenderId: "347223288330",
  appId: "1:347223288330:web:e83a38acb8f451342a8df3"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };