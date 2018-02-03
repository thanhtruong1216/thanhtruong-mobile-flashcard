import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import { Notifications, Permissions } from 'expo';

export const NOTIFICATION_KEY = 'mobileflashcard:notifications';
export const STORAGE_KEY = "thanhtruong:mobileflashcard";

let decksImfomation = {
  React: {
    title: 'React',
    questions: [
      {
        question: "The stylesheet API allows us to define multiple in a single place?",
        answer: 'Yes!'
      },
      {
        question: 'Using CSS in JS gives us access application state or props in the component?',
        answer: 'Yes!'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'Both the <head> section and the <body> section are the correct place to insert a JavaScript?',
        answer: 'Yes!'
      },
      {
        question: 'The external JavaScript file must contain the <script> tag?',
        answer: 'No!'
      }
    ]
  },
  Python: {
    title: 'Python',
    questions: [
      {
        question: 'Python is a high level programming language?',
        answer: 'Yes!'
      },
      {
        question: 'Variable name can start with an underscore?',
        answer: 'Yes!'
      },
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
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

export function saveDeckTitle(title) {
  const newDeck = {
    [title]: {
      title: title,
      questions: []
    }
  }
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(newDeck))
}

export function addCardToDeck(card, title) {
  return AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
    let decks = JSON.parse(result);
    const deck = decks[title] || { questions: [] };
    const newQuestions = [
      ...deck.questions,
      card
    ];

    const value = JSON.stringify({[title]: {title: title, questions: newQuestions}});
    AsyncStorage.mergeItem(STORAGE_KEY, value);
  });
}


export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Let study!',
    body: "👋 don't forget to learn today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}