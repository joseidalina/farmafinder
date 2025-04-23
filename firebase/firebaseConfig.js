// Importa o Firebase App e o Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAZ4VaLkZVfylQvvjzc1VsmXGQrLtyBtRA",
  authDomain: "farmarfander.firebaseapp.com",
  projectId: "farmarfander",
  storageBucket: "farmarfander.firebasestorage.app",
  messagingSenderId: "557500033801",
  appId: "1:557500033801:web:736dc4d750423f1b2a81d8",
  measurementId: "G-6Q5SCWGCER"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Inicializa o Firestore
const db = getFirestore(app);

// Exporta o Firestore pra poder usar no `seeds.js`
export { db };

