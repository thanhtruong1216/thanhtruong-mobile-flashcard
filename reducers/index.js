import { ADD_DECK, GET_DECKS, GET_DECK } from '../actions';

function decks(state = {}, action) {
  switch(action.type) {
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case GET_DECK:
      return {
        ...state,
        ...action.title
      }
    default:
      return state
  }
}
export default decks;