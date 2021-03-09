import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoard, autoSolve, setCurrentBoard, validate } from '../store/actions'
import CountDown from 'react-native-countdown-component';
// import store from './store'
// import theme from './CustomProperties/Theme'
// import { Table, Row, Rows } from 'react-native-table-component'



export default function GameScreen(props) {
  const difficulty = props.route.params.difficulty
  const username = props.route.params.username
  const initBoard = useSelector(state => state.board.initBoard)
  const currentBoard = useSelector(state => state.board.currentBoard)
  const isValid = useSelector(state => state.board.isValid)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBoard('easy'));
  }, []);

  useEffect(() => {
    if (isValid === 'solved') {
      props.navigation.push('finish', {difficulty, username, score: 100})
    }
  }, [isValid]);

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

  if (initBoard.length < 1) {
    return (
      <View style={styles.loadercontainer}>
        <ActivityIndicator size="large" color="#20232a" />
      </View>
      )
  }

  return (
    <View style={styles.container}>
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
              until={100}
              onFinish={() => alert('finished')}
              onPress={() => alert('hello')}
              size={20}
              digitStyle={{backgroundColor: '#ffcc99', borderWidth: 0}}
              // digitTxtStyle={{color: '#1CC625'}}
              // timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
              // separatorStyle={{color: '#1CC625'}}
              timeToShow={['S']}
              timeLabels={{m: null, s: null}}
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
                      <View style={styles.square}>
                        <TextInput
                          // style={styles.square}
                          keyboardType="numeric"
                          defaultValue={cell === 0 ? '' : cell.toString()}
                          onChangeText={(text) => newInputBoard(text, line_index, cell_index)}
                          />
                      </View>

:
                      <View style={styles.givensquare}>
                        <Text>
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
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: "#FFEDC3",

    // justifyContent: 'center',
  },
  board: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#20232a",
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
    fontWeight: "bold",
    margin: 0,
    backgroundColor: "#FFEDC3",
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
    elevation: 2,
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
  }
});
