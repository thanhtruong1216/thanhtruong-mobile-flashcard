export const ADD_DECK = "ADD_DECK";
export const FETCH_DECKS = "FETCH_DECKS";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";
export const ADD_RIGHT_ANSWER = "ADD_RIGHT_ANSWER";
export const ADD_WRONG_ANSWER = "ADD_WRONG_ANSWER";
export const RESET = "RESET";

export function addDeck({title}) {
  return {
    type: ADD_DECK,
    deck: {
      title,
    }
  }
}

export function fetchDecks({decks}) {
  return {
    type: FETCH_DECKS,
    decks
  }
}

export function addCard({card, title}) {
  return {
    type: ADD_CARD_TO_DECK,
    card,
    title
  }
}

export function addRightAnswer({title, question}) {
  return {
    type: ADD_RIGHT_ANSWER,
    title,
    question
  }
}

export function addWrongAnswer({title, question}) {
  return {
    type: ADD_WRONG_ANSWER,
    title,
    question
  }
}

export function reset({title}) {
  return {
    type: RESET,
    title
  }
}