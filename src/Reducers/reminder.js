import {ADD_REMINDER, GET_REMINDER} from '../Actions/types';

const initalState = {
  reminder: {},
};

export default function(state = initalState, action) {
  switch (action.type) {
    case ADD_REMINDER:
      return {
        ...state,
        reminder: action.payload,
      };
    case GET_REMINDER:
      return {
        ...state,
        reminder: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
