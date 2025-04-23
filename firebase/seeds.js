import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

const farmacias = [
  {
    id: "farmacia_central",
    nome: "Farmácia Central",
    endereco: "Av. Eduardo Mondlane",
    aberta: true,
    localizacao: { lat: -25.9655, lng: 32.5832 },
    horario: {
      semana: "08h-19h",
      sabado: "08h-13h",
      domingo: "fechado"
    },
    medicamentos: [
      {
        id: "paracetamol_500",
        nome: "Paracetamol",
        gramas: "500mg",
        quantidade: "+10",
        foto: ""
      },
      {
        id: "ibuprofeno_400",
        nome: "Ibuprofeno",
        gramas: "400mg",
        quantidade: "+5",
        foto: ""
      }
    ]
  },
  {
    id: "farmacia_benfica",
    nome: "Farmácia Benfica",
    endereco: "Rua de Benfica",
    aberta: false,
    localizacao: { lat: -25.9700, lng: 32.5800 },
    horario: {
      semana: "08h-18h",
      sabado: "08h-12h",
      domingo: "fechado"
    },
    medicamentos: [
      {
        id: "amoxilina_250",
        nome: "Amoxilina",
        gramas: "250mg",
        quantidade: "3",
        foto: ""
      }
    ]
  }
];

async function adicionarDados() {
  for (const farmacia of farmacias) {
    const farmaciaRef = doc(db, "farmacias", farmacia.id);
    await setDoc(farmaciaRef, {
      nome: farmacia.nome,
      endereco: farmacia.endereco,
      aberta: farmacia.aberta,
      localizacao: farmacia.localizacao,
      horario: farmacia.horario,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });

    for (const med of farmacia.medicamentos) {
      const medicamentoRef = doc(collection(farmaciaRef, "medicamentos"), med.id);
      await setDoc(medicamentoRef, {
        nome: med.nome,
        gramas: med.gramas,
        quantidade: med.quantidade,
        foto: med.foto,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
  }

  console.log("Farmácias e medicamentos adicionados com segurança e timestamps!");
}

adicionarDados();


