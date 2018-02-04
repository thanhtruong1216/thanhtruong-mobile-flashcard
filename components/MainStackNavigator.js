import React from 'react';
import { StackNavigator } from 'react-navigation';
import {FontAwesome, IonIcons, Entypo} from '@expo/vector-icons';
import { Tabs } from './Tabs';
import Deck from './Deck';
import QuizPage from './QuizPage';
import AddCardToDeck from './AddCard';
import { white, purple } from '../utils/colors';

export const MainNavigator =  StackNavigator({
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