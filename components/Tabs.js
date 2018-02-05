import React from 'react';
import { TabNavigator } from 'react-navigation';
import DecksList from './DecksList';
import CreateDeck from './CreateDeck';
import { FontAwesome, IonIcons, Entypo } from '@expo/vector-icons';
import { Platform } from 'react-native';

export const Tabs = TabNavigator({
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
      backgroundColor: Platform.OS === 'ios' ? 'white' : 'purple',
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
