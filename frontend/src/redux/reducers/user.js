import { CLEAR_DATA, LOADING_USER, SET_CURRENT_USER } from "../constants";
const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      }
    case CLEAR_DATA:
      return initialState
    default:
      return state;
  }
}