import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import CreateDeck from './components/CreateDeck';
import Decks from './components/Decks';
import Deck from './components/Deck';
import { TabNavigator } from 'react-navigation';

// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import reducer from '../reducers';

import { NativeRouter, Route, Link, Router, Stack, Scene} from 'react-router-native';
import { StackNavigator } from 'react-navigation'
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
      <View style={styles.container}>
        <Tabs style={styles.tabs}/>
      </View>
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: 'red',
    color: 'green',
    backgroundColor: 'gray',
  }
})

export default App;
