import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import DecksList from './components/DecksList';
import QuizPage from './components/QuizPage';
import AddCardToDeck from './components/AddCard';
import CreateDeck from './components/CreateDeck';
import Deck from './components/Deck';
import { TabNavigator } from 'react-navigation';
import {setLocalNotification} from './utils/api';
import { Constants} from 'expo';
import { NativeRouter, Route, Link, Router, Stack, Scene} from 'react-router-native';
import { StackNavigator } from 'react-navigation';
import {FontAwesome, IonIcons, Entypo} from '@expo/vector-icons'
import { purple, white, blue} from './utils/colors';

function MobileFlashCardStatusBar({backgroundColor, ...props}) {
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  );
}
const Tabs = TabNavigator({
  'Decks': {
    screen: DecksList,
    tabBarLabel: 'Decks',
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <FontAwesome name='home' size={30} color={tintColor}/>
    }
  },
  'New Deck': {
    screen: CreateDeck,
    tabBarLabel: 'NewDeck',
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  }, 
}, 
{
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'purple': 'white',
    style: {
      height: 56,
      backgoundColor: Platform.OS === 'ios' ? 'white' : 'purple',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
    } 
  }
});

const MainNavigator =  StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  Quiz: {
    screen: QuizPage,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCardToDeck: {
    screen: AddCardToDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  BackToDeck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
})
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