import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { List, Avatar, Card} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setIsValid, setCurrentBoard, setInitBoard, autoSolve } from '../store/actions';
import AsyncStorage from '@react-native-community/async-storage'


export default function FinishScreen({ navigation, route }) {
  const STORAGE_KEY = '@save_leaderboard_ferdian'
  const username = route.params.username
  const difficulty = route.params.difficulty
  const [leaderboard, setLeaderboard] = useState([])
  const score = route.params.score
  const dispatch = useDispatch()

  function goToHome () {
    navigation.push(('home'))
  }

  const readData = async () => {
    try {
      const leaderboardData = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY))
      if (leaderboardData !== null) {
        await leaderboardData.sort((a, b) => b.score - a.score)
        setLeaderboard(leaderboardData)
        console.log(leaderboardData, 'ini dari storage')
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  useEffect (() => {
    console.log(leaderboard)
  }, [leaderboard])

  useEffect(() => {
    readData()
    dispatch(setIsValid('unsolved'))
    dispatch(setCurrentBoard([]))
    dispatch(setInitBoard([]))
  }, []);

  if (leaderboard.length == 0) {
    return (
      <View style={styles.loadercontainer}>
        <ActivityIndicator size="large" color="#20232a" />
      </View>
      )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.title}>CONGRATS {username.toUpperCase()}! YOUR SCORE: {score}!</Text>
      <Text style={{...styles.buttontext, margin: 20}}>LEADERBOARD:</Text>
      {
        leaderboard.map((item, index) => (
          // <Card key={item.id}>
          //   <Card.Title
          //   title={item.username}
          //   subtitle={item.score}
          //   left={props => <Avatar.Text size={24} label={index + 1} />}
          //   />
          // </Card>

          <View key={item.id}
          style={styles.leaderboard}>
            <Avatar.Text style={styles.info} size={60} label={index + 1} />
            <TouchableOpacity
              style={styles.info}
            >
              <Text style={styles.buttontext}>{item.username}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.info}
            >
              <Text style={styles.buttontext}>{item.score}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.info}
            >
              <Text style={styles.buttontext}>{item.difficulty}</Text>
            </TouchableOpacity>
          </View>
        ))
      }


      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={goToHome}
        >
          <Text style={styles.buttontext}>Play again!</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
    paddingTop: 50,
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
  info: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffcc99",
    padding: 6,
    // marginHorizontal: 5,
    borderRadius: 5,
    // marginVertical: 10,
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
  scrollView: {
  },
  leaderboard: { 
    flexDirection: "row",
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 2,
    marginBottom: 5,
    color: "#20232a",
    backgroundColor: "#ffcc99",
    marginHorizontal: 10,
    height: 80,
    // width: 200,
    padding: 10,
    flex: 1
  }
});
