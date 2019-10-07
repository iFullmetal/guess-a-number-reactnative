import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView
} from 'react-native';
//SafeAreaView - для избежания перекрывания контента бровями смартфона
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guesRounds, setGuesRounbds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    //лоадинг скрин пока не загрузил ресурсы
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={setDataLoaded.bind(this, true)}
      onError={(e) => { console.log(e) }}
    />;
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuesRounbds(0);
  }

  const gameOverHandler = rounds => {
    setGuesRounbds(rounds);
  }

  const configureNewGame = () => {
    setGuesRounbds(0);
    setUserNumber(undefined);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a number" />
      {
        userNumber ?
          (guesRounds === 0 ? <GameScreen userChoise={userNumber} onGameOver={gameOverHandler} /> :
            <GameOverScreen rounds={guesRounds} userNumber={userNumber} onRestart={configureNewGame} />) :
          <StartGameScreen onStartGame={startGameHandler} />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    //root-элемент будет занимать 100% экрана
    flex: 1
  }
});
