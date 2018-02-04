import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import {setLocalNotification} from './utils/api';
import MobileFlashCardStatusBar from './components/MobileFlashCardStatusBar'
import { MainNavigator } from './components/MainStackNavigator';
import { purple } from './utils/colors';

class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <MobileFlashCardStatusBar backgroundColor={purple} barStyle="light-content"/>
          <MainNavigator/>
        </View>
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