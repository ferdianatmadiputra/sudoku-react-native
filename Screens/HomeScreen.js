import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-community/picker'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { useSelector } from 'react-redux';
import { Snackbar } from 'react-native-paper'

// import LottieView from 'lottie-react-native';

export default function HomeScreen({ navigation }) {
  
  const [difficulty, setDifficulty] = useState('random')
  const [username, setUsername] = useState('')
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const popupMessage = 'please fill all required fields!'

  function goToGame () {
    if (username.length > 0 && difficulty.length > 0) {
      navigation.push('game', { difficulty: difficulty, username: username })
    } else {
      setVisible(true)
    }
  }
  if (false) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={styles.container}>
      {/* <LottieView
        source={require('../assets/lottie/plane_window.json')}
        loop={true}
        autoPlay={true}
        progress={0} 
        style={{ width: 150, height: 150 }}
      /> */}
      <Text style={styles.title}>SUDOKU!</Text>
      <Text style={{marginBottom: 20}}>Your commute companion</Text>
      <Text>Username:</Text>
      <TextInput
        style={styles.square}
        autoFocus={true}
        // keyboardType="numeric"
        // defaultValue={cell.toString()}
        onChangeText={(text) => setUsername(text)}
      />
      <Text>Difficulty:</Text>
      <Picker
        selectedValue={difficulty}
        style={styles.square}
        onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}
      >
        <Picker.Item label="Random" value="random" />
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={goToGame}
        >
          <Text style={styles.buttontext}>Start The Game!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.snackbar}>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'OK',
            onPress: () => {
              // Do something
            },
          }}>
          {popupMessage}
        </Snackbar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: "#FFEDC3",
    justifyContent: 'center',
    textDecorationColor: '#ffffff'
  },
  square: {
    padding: 10,
    height: 50,
    width: 300,
    // borderColor: "#20232a",
    // borderWidth: 0.4,
    // borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
    marginBottom: 30
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
  },
  snackbar: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "flex-end"
  }
});
