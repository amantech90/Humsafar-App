import {
  GET_ERROR,
  CLEAR_ERROR,
  GET_LOADER,
  STOP_LOADER,
} from '../Actions/types';

const initialState = {
  error: {},
  loader: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERROR:
      let newError = {...state.error};
      newError[action.payload.name] = action.payload.value;
      return {
        ...state,
        error: newError,
      };
    case CLEAR_ERROR:
      let clearError = {...state.error};
      delete clearError[action.payload.name];
      return {
        ...state,
        error: clearError,
      };
    case GET_LOADER:
      let newLoader = {...state.loader};
      newLoader[action.payload.name] = action.payload.value;
      return {
        ...state,
        loader: newLoader,
      };
    case STOP_LOADER:
      let stopLoader = {...state.loader};
      stopLoader[action.payload.name] = action.payload.value;
      return {
        ...state,
        loader: stopLoader,
      };
    default:
      return state;
  }
}
