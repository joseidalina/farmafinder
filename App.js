import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState([]);

  const pesquisarMedicamentos = () => {
    // Aqui no futuro vamos fazer uma requisição à API
    // Por enquanto é simulado
    const resultadosSimulados = [
      {
        id: '1',
        nome: 'Paracetamol',
        farmacia: 'Farmácia Central',
        quantidade: 10
      },
      {
        id: '2',
        nome: 'Amoxicilina',
        farmacia: 'Farmácia Popular',
        quantidade: 5
      }
    ];
    setResultados(resultadosSimulados);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>FarmaFinder 💊</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do medicamento"
        value={busca}
        onChangeText={setBusca}
      />
      <Button title="Pesquisar" onPress={pesquisarMedicamentos} />

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultado}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>Farmácia: {item.farmacia}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10
  },
  resultado: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 8
  },
  nome: {
    fontWeight: 'bold'
  }
});

