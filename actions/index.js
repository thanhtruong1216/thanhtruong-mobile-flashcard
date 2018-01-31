export const ADD_DECK = "ADD_DECK";
export const GET_DECKS = "GET_DECKS"
export const GET_DECK = "GET_DECK";

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
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