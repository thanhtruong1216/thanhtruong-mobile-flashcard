import { combineReducers } from 'redux';

import { ADD_DECK, FETCH_DECKS, ADD_CARD_TO_DECK , ADD_RIGHT_ANSWER, ADD_WRONG_ANSWER, RESET } from '../actions';

function decks(state = {}, action) {
  switch(action.type) {
    case FETCH_DECKS:
      return action.decks
    case ADD_CARD_TO_DECK:
      return (() => {
        const {title, card} = action;

        const deck = state[title];
        const newDeck = {
          ...deck,
          questions: [
            ...deck.questions,
            card
          ]
        }
        return {
          ...state,
          [title]: newDeck,
        };
      })()
    case ADD_DECK:
      return (() => {
        const { title } = action.deck;
        return {
          ...state,
          [title]: {
            title,
            questions: []
          }
        }
      })()
    default:
      return state
  }
}


// function checkIncludesQuestion(array, object) {
//   return array.find(obj => {
//     return obj.title === object.title && obj.question === object.question;
//   }) > -1;
// }


function checkIncludesQuestion(array, object) {
  const result = array.some(obj => 
    obj.title === object.title && obj.question === object.question
  );
  return result;
}

function addAnswerToState(state, answer) {
  if(checkIncludesQuestion(state, answer)) {
    return state;
  }
  return [
    ...state,
    answer
  ]
}

function removeAnswerFromState(state, answer) {
  return state.filter(obj => obj.title !== answer.title || obj.question !== answer.question)
}

function rightAnswers(state = [], action ) {
  switch(action.type) {
    case ADD_RIGHT_ANSWER:
      return addAnswerToState(state, {title: action.title, question: action.question})
    case ADD_WRONG_ANSWER:
      return removeAnswerFromState(state, {title: action.title, question: action.question})
    case RESET:
      return []
    default:
      return state
  }
}

function wrongAnswers(state = [], action ) {
  switch(action.type) {
    case ADD_WRONG_ANSWER:
      return addAnswerToState(state, {title: action.title, question: action.question})
    case ADD_RIGHT_ANSWER:
      return removeAnswerFromState(state, {title: action.title, question: action.question})
    case RESET:
      return []
    default:
      return state
  }
}


export default combineReducers({ decks, rightAnswers, wrongAnswers });



// a = [1, 2, 3]
// b = [
//   a
// ]

// b = [
//   [1, 2, 3]
// ]

// b = [
//   ...a
// ]

// c = {a: 1, b: 2, c: 3}
// d = {c}

// d = {c}

// d = {
//   c: c
// }

// d = {
//   c: {
//     a: 1, 
//     b: 2, 
//     c: 3
//   }
// }


// d = {
//   a: 1, 
//   b: 2, 
//   c: 3
// }

// d = {
//  ...C
// }

// const wrongAns = action.questions
// action.wrongAns
