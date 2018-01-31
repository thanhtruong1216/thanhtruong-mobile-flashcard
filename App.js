import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Decks from './components/Decks';
import Deck from './components/Deck';
import QuizPage from './components/QuizPage';
import CreateDeck from './components/CreateDeck';
import { TabNavigator } from 'react-navigation';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import reducer from '../reducers';

import { NativeRouter, Route, Link, Router, Stack, Scene} from 'react-router-native';
import { StackNavigator } from 'react-navigation';

function Desk() {
  return(
    <View style={styles.container}>
      <Decks />
    </View>
  );
}

function NewDesk() {
  return(
    <View style={styles.container}>
      <CreateDeck />
    </View>
  );
}

const Tabs = TabNavigator({
  'Decks': {
    screen: Desk,
  },
  'New Deck': {
    screen: NewDesk,
  },
});
class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <Tabs/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App;