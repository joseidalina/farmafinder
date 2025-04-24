import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetalhesMedicamento from './screens/DetalhesMedicamento';
import BuscaMedicamentos from './screens/BuscaMedicamentos';
import FarmaciasAbertas from './screens/FarmaciasAbertas';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack apenas para a aba de busca
function BuscaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Buscar" component={BuscaMedicamentos} />
      <Stack.Screen name="Detalhes" component={DetalhesMedicamento} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Medicamentos" component={BuscaStack} />
        <Tab.Screen name="Farmácias" component={FarmaciasAbertas} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}





