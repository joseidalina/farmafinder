// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BuscaMedicamentos from './screens/BuscaMedicamentos'; // ou ./screens/BuscaMedicamentos
import FarmaciasAbertas from './screens/FarmaciasAbertas'; // ou pode ser outra tela qualquer

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Buscar" component={BuscaMedicamentos} />
        <Tab.Screen name="Farmácias" component={FarmaciasAbertas} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}




