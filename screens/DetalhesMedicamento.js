import React from 'react';
import { View, Text, StyleSheet, Button, Image, Linking } from 'react-native';

export default function DetalhesMedicamento({ route }) {
  const { medicamento } = route.params;

  const foto =
    medicamento.foto && medicamento.foto.length > 0
      ? medicamento.foto
      : 'https://via.placeholder.com/150'; // imagem padrão

  return (
    <View style={styles.container}>
      <Image source={{ uri: foto }} style={styles.imagem} />

      <Text style={styles.titulo}>{medicamento.nome}</Text>
      <Text style={styles.info}>Dosagem: {medicamento.gramas}</Text>
      <Text style={styles.info}>Quantidade: {medicamento.quantidade}</Text>

      <View style={styles.divisor} />

      <Text style={styles.info}>Farmácia: {medicamento.farmacia.nome}</Text>
      <Text style={styles.info}>Endereço: {medicamento.farmacia.endereco}</Text>
      <Text style={[styles.status, { color: medicamento.farmacia.aberta ? 'green' : 'red' }]}>
        {medicamento.farmacia.aberta ? 'Aberta agora' : 'Fechada'}
      </Text>

      <Button
        title="Ver no Mapa"
        onPress={() => {
          const { lat, lng } = medicamento.farmacia.localizacao;
          const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
          Linking.openURL(url);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  imagem: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
  },
  status: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
  divisor: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 12,
  },
});
