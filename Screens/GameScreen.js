import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoard, autoSolve, setCurrentBoard, setIsValid, validate } from '../store/actions'
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-community/async-storage'
import { Snackbar } from 'react-native-paper'

export default function GameScreen(props) {
  const STORAGE_KEY = '@save_leaderboard_ferdian'
  const difficulty = props.route.params.difficulty
  const username = props.route.params.username
  const initBoard = useSelector(state => state.board.initBoard)
  const currentBoard = useSelector(state => state.board.currentBoard)
  const isValid = useSelector(state => state.board.isValid)
  const [timeLeft, setTimeLeft] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // snackbar
  // const [visible, setVisible] = useState(false);
  // const onToggleSnackBar = () => setVisible(!visible);
  // const onDismissSnackBar = () => setVisible(false);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBoard(difficulty));
  }, []);

  useEffect(() => {
    if (isValid === 'solved') {
      finished()
    }
  }, [isValid]);

  const finished = async () => {
    try {
      setIsLoading(true)
      await saveData()
      props.navigation.push('finish', {difficulty, username, score: timeLeft})
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const saveData = async () => {
    try {
      const id = new Date().valueOf()
      let newLeaderboard = await AsyncStorage.getItem(STORAGE_KEY)
      if(newLeaderboard) {
        newLeaderboard = JSON.parse(newLeaderboard)
        newLeaderboard.push({id, username, difficulty, score: timeLeft})
      } else {
        newLeaderboard = [{id, username, difficulty, score: timeLeft}]
      }
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newLeaderboard))
      console.log('Data successfully saved')
    } catch (e) {
      console.log(e)
      console.log('Failed to save the data to the storage')
    }
  }

  function onValidate() {
    dispatch(validate(currentBoard))
  }

  function onAutoSolve () {
    dispatch(autoSolve(initBoard))
  }

  function newInputBoard(val, i, j) {
    let newBoard = JSON.parse(JSON.stringify(currentBoard))
    newBoard[i][j] = +val
    dispatch(setCurrentBoard(newBoard))
  }
  
  if (initBoard.length < 1 || isLoading) {
    return (
      <View style={styles.loadercontainer}>
        <ActivityIndicator size="large" color="#20232a" />
      </View>
      )
  }

  function timeIsUp () {
    alert("Time's Out! you failed!")
    props.navigation.push('home')
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.info}
        >
          <Text>LEVEL:</Text>
          <Text style={styles.buttontext}>{difficulty}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.info}
        >
          <Text>time left</Text>
          <CountDown
            until={300}
            onFinish={timeIsUp}
            onChange={(time) => setTimeLeft(time)}
            size={20}
            digitStyle={{backgroundColor: '#ffcc99', borderWidth: 0}}
            separatorStyle={{color: '#161616'}}
            timeToShow={['M','S']}
            timeLabels={{m: null, s: null}}
            showSeparator
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.info}
        >
          <Text>player:</Text>
          <Text style={styles.buttontext}>{username}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.board}>

      {
        currentBoard.map((line, line_index) => (
          <View key={line_index} style={{ flexDirection: "row" }}>
          {
            line.map((cell, cell_index) => (
              <View key={cell_index}>
                { initBoard[line_index][cell_index] == 0
                  ?
                  <View 
                  style={[
                    ((line_index < 3 && cell_index < 3) ||
                    (line_index > 5 && cell_index < 3) ||
                    (line_index >= 3 && line_index <= 5 &&
                      cell_index >= 3 && cell_index <= 5) ||
                      (line_index < 3 && cell_index > 5) ||
                      (line_index > 5 && cell_index > 5))
                      ? {backgroundColor: "#FFEDC3"}
                      : {backgroundColor: "white"}
                      ,
                      styles.square
                  ]}>
                    <TextInput style={{textAlign:"center", fontWeight: "bold"}}
                      maxLength={1}
                      keyboardType="numeric"
                      defaultValue={cell === 0 ? '' : cell.toString()}
                      onChangeText={(text) => newInputBoard(text, line_index, cell_index)}
                      />
                  </View>
                  :
                  <View style={[
                    ((line_index < 3 && cell_index < 3) ||
                    (line_index > 5 && cell_index < 3) ||
                    (line_index >= 3 && line_index <= 5 &&
                      cell_index >= 3 && cell_index <= 5) ||
                      (line_index < 3 && cell_index > 5) ||
                      (line_index > 5 && cell_index > 5))
                      ? {backgroundColor: "#FFEDC3"}
                      : {backgroundColor: "white"}
                      ,
                      styles.givensquare
                  ]}>
                    <Text style={{fontWeight: "bold", color: "grey"}}>
                      {cell}
                    </Text>
                  </View>
                }
              </View>
            ))
          }
        </View>
        ))
      }
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={onValidate}
        >
          <Text style={styles.buttontext}>Check!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onAutoSolve}
        >
          <Text style={styles.buttontext}>AutoSolve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadercontainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#FFEDC3",
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: "#FFEDC3",
  },
  board: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#20232a",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  square: {
    width: 40,
    height: 40,
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    margin: 0,
  },
  givensquare: {
    width: 40,
    height: 40,
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    margin: 0,
    // backgroundColor: "#FFEDC3",
  },
  button: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffcc99",
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 30,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#20232a",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  buttontext: {
    fontSize: 18,
    fontWeight: "bold"
  },
  info: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffcc99",
    padding: 6,
    marginHorizontal: 5,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 3,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#FFEDC3",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  snackbar: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "flex-end"
  }
});
