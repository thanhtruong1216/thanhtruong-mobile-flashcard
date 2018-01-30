import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const STORAGE_KEY = 'deck-flash-cards';
let decksImfomation = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Python: {
    title: 'Python',
    questions: [
      {
        question: 'What is a while loop?',
        answer: 'Repeatedly executes a target statement as long as a given condition is true.'
      },
      {
        question: 'What is a function',
        answer: 'A function is a block of organized, reusable code that is used to perform a single, related action'
      },
      {
        question: 'What is Inheritance',
        answer: 'The transfer of the characteristics of a class to other classes that are derived from it.'
      }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(5).then(results => {
    if(results === null) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decksImfomation));
      return decksImfomation;
    }
    else {
      return JSON.parse(results)
    }
  });
}

export function getDeck(title) {
  return getDecks().then((data) => {
    let allDecks = Object.keys(data).map((key) => (data[key]))
    return allDecks.find((result) => result.title === title)
  })
}

export function saveDeckTitle(title){
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(title));
}

export function addCardToDeck(card, deckName) {
  return AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
    let decks = JSON.parse(result);
    let newQuestions = JSON.parse(JSON.stringify(decks[deckName].questions));
      newQuestions[newQuestions.length] = card;
    const value = JSON.stringify({
      [deckName]: {title: deckName, questions: newQuestions},
    });
    AsyncStorage.mergeItem(STORAGE_KEY, value);
  });
}

