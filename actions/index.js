export const ADD_DESK = "ADD_DESK";
export const GET_DECKS = "GET_DECKS"
export const GET_DECK = "GET_DECK";

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    desk
  }
}

export function fetchDecks(decks) {
  return {
    type: GET_DECKS,
    decks
  }
}

export function fetchDeck({title}) {
  return {
    type: GET_DECK,
    title
  }
}