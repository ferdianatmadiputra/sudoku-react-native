import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { useSelector } from 'react-redux';
// import { fetchBoard } from './store/actions'
// import store from './store'
// import theme from './CustomProperties/Theme'
// import { Table, Row, Rows } from 'react-native-table-component'

const theme = {
  ...DefaultTheme,
  dark: true,
  mode: 'adaptive'
}

export default function App() {
  // const initBoard = useSelector(state => state.board.initBoard)
  // const currentBoard = useSelector(state => state.board.currentBoard)

  // useEffect(() => {
  //   dispatch(fetchBoard(difficulty));
  // }, []);


  
  ////// versi sementara di app js semua tanpa storeee //////
  const [initBoard, setInitBoard] = useState([])
  const [currentBoard, setCurrentBoard] = useState([])
  const [isValidBoard, setIsValid] = useState(false)
  
  useEffect(() => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=easy`)
    .then( response => {
      if (!response.ok) {
        console.log(response, 'ini response not oke dari fetch')
        throw Error(response.statusText)
      } else {
        return response.json()
      }
    })
    .then(data => {
      setInitBoard(JSON.parse(JSON.stringify(data.board)))
      setCurrentBoard(JSON.parse(JSON.stringify(data.board)))
    })
    .catch (err => {
      console.log(err)
    })
  }, [])
  
  console.log(initBoard, '<<< isi initboard')

  function newInputBoard(val) {
    console.log(val)
  }

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');


  function validate() {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({board: currentBoard }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then( response => {
      if (!response.ok) {
        console.log(response, 'ini response not oke dari fetch')
        throw Error(response.statusText)
      } else {
        return response.json()
      }
    })
    .then(data => {
      alert(data.status)
      console.log(data.status)
    })
    .catch (err => {
      console.log(err)
    })
  }

  function autoSolve () {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams({ board: currentBoard }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then( response => {
      if (!response.ok) {
        console.log(response, 'ini response not oke dari fetch')
        throw Error(response.statusText)
      } else {
        return response.json()
      }
    })
    .then(data => {
      setCurrentBoard(data.solution)
      console.log(data, 'ini returnan autosolve<<<')
      // setInitBoard
    })
    .catch (err => {
      console.log(err)
    })
  }
  if (initBoard.length < 1) {
    return <Text>Loading...</Text>
  }
  return (
    <PaperProvider theme={theme}>
      {/* <Provider store={store}> */}
        <View style={styles.container}>
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
                          defaultValue={cell.toString()}
                          onChangeText={newInputBoard}
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
        <Button title="Validate" onPress={validate}/>
        <Button title="AutoSolve" onPress={autoSolve}/>
        </View>
      {/* </Provider> */}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  }
});
