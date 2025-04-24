import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function BuscaMedicamentos() {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const navigation = useNavigation();

  const buscarMedicamentos = async (textoBusca) => {
    setCarregando(true);
    setBusca(textoBusca);

    if (textoBusca.length < 2) {
      setResultados([]);
      setCarregando(false);
      return;
    }

    try {
      const snapshotFarmacias = await getDocs(collection(db, "farmacias"));
      const resultadosTemp = [];

      for (const farmaciaDoc of snapshotFarmacias.docs) {
        const farmaciaData = farmaciaDoc.data();
        const medicamentosRef = collection(db, "farmacias", farmaciaDoc.id, "medicamentos");
        const snapshotMedicamentos = await getDocs(medicamentosRef);

        snapshotMedicamentos.forEach((med) => {
          const medData = med.data();
          if (medData.nome.toLowerCase().includes(textoBusca.toLowerCase())) {
            resultadosTemp.push({
              id: med.id,
              nome: medData.nome,
              gramas: medData.gramas,
              quantidade: medData.quantidade,
              foto: medData.foto || '',
              farmacia: {
                nome: farmaciaData.nome,
                endereco: farmaciaData.endereco,
                aberta: farmaciaData.aberta ?? true,
                localizacao: farmaciaData.localizacao ?? { lat: 0, lng: 0 }
              }
            });
          }
        });
      }

      setResultados(resultadosTemp);
    } catch (error) {
      console.error("Erro ao buscar medicamentos:", error);
    }

    setCarregando(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do medicamento"
          value={busca}
          onChangeText={buscarMedicamentos}
        />

        {carregando ? (
          <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={resultados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Detalhes', { medicamento: item })}
                style={styles.resultado}
              >
                {item.foto ? (
                  <Image
                    source={{ uri: item.foto }}
                    style={styles.imagem}
                    resizeMode="cover"
                  />
                ) : null}
                <Text style={styles.titulo}>{item.nome} - {item.gramas}</Text>
                <Text>Quantidade: {item.quantidade}</Text>
                <Text>Farmácia: {item.farmacia.nome}</Text>
                <Text>Endereço: {item.farmacia.endereco}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  input: {
    height: 45,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#fff'
  },
  resultado: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f3f3f3'
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  imagem: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8
  }
});


