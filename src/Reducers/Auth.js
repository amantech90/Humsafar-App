import {SET_CURRENT_USER, REMOVE_CURRENT_USER} from '../Actions/types';

const initalState = {
  isAuthenticated: false,
  user: {},
};

export default function(state = initalState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
