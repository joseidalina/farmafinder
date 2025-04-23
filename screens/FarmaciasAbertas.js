import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import * as Location from 'expo-location';

// Função para verificar se a farmácia está aberta
import estaAbertaAgora from '../utils/estaAbertaAgora';

const FarmaciasAbertas = () => {
  const [farmacias, setFarmacias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchFarmacias = async () => {
      setLoading(true);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permissão de localização negada');
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);

        const querySnapshot = await getDocs(collection(db, "farmacias"));
        const farmaciasData = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (estaAbertaAgora(data)) {
            farmaciasData.push({ id: doc.id, ...data });
          }
        });

        // Se quiser ordenar por distância, podemos adicionar aqui depois
        setFarmacias(farmaciasData);
      } catch (error) {
        console.error("Erro ao buscar farmácias:", error);
      }
      setLoading(false);
    };

    fetchFarmacias();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando farmácias abertas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={farmacias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.endereco}>{item.endereco}</Text>
            <Text style={styles.status}>Aberta agora</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FarmaciasAbertas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  endereco: {
    fontSize: 14,
    color: '#555',
  },
  status: {
    marginTop: 8,
    color: 'green',
    fontWeight: 'bold',
  },
});

  