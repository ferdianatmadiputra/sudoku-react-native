import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { useSelector } from 'react-redux';
import GameScreen from './screens/GameScreen'
import HomeScreen from './screens/HomeScreen'
import FinishScreen from './screens/FinishScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
// import { fetchBoard } from './store/actions'
import store from './store'
import theme from './CustomProperties/Theme'
// import { Table, Row, Rows } from 'react-native-table-component'

// const theme = {
//   ...DefaultTheme,
//   dark: true,
//   mode: 'adaptive'
// }

const Stack = createStackNavigator();

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer initialRouteName="home">
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="game" component={GameScreen} />
            <Stack.Screen name="finish" component={FinishScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})