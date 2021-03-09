import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-community/picker'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { useDispatch } from 'react-redux';
import { setIsValid, setCurrentBoard, setInitBoard } from '../store/actions';


export default function FinishScreen({ navigation, route }) {

const username = route.params.username
const difficulty = route.params.difficulty
const score = route.params.score
const dispatch = useDispatch()
  function goToHome () {
    dispatch(setIsValid('unsolved'))
    dispatch(setCurrentBoard([]))
    dispatch(setInitBoard([]))
    navigation.push(('home'))
  }

  if (false) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONGRATS! {username.toUpperCase()} YOU HAVE FINISHED YOUR SUDOKU!</Text>
      <Text>YOUR SCORE: {score}</Text>
      <Text>LEADERBOARD:</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={goToHome}
        >
          <Text style={styles.buttontext}>Play again!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadercontainer: {
    flex: 1,
    // paddingTop: 20,
    alignItems: 'center',
    backgroundColor: "#FFEDC3",
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: "#FFEDC3",
    justifyContent: 'center',
  },
  square: {
    width: 40,
    height: 40,
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    backgroundColor: "#ffff",
  },
  givensquare: {
    width: 40,
    height: 40,
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    backgroundColor: "#ffcc99",
  },
  button: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffcc99",
    padding: 10,
    marginHorizontal: 70,
    marginVertical: 30,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#20232a",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  buttontext: {
    fontSize: 18,
    fontWeight: "bold"
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    // borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#ffcc99",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});
