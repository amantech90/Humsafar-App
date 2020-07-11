import {
  GET_LOADER,
  STOP_LOADER,
  GET_ERROR,
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER,
} from './types';

export const setCurrentUser = userData => dispatch => {
  console.log(userData, 'from');
  if (userData) {
    dispatch({
      type: SET_CURRENT_USER,
      payload: userData,
    });
  } else {
    console.log('here');
    dispatch({
      type: REMOVE_CURRENT_USER,
      payload: userData,
    });
  }
};

export const isLoading = loader => dispatch => {
  if (loader) {
    dispatch({
      type: GET_LOADER,
      payload: loader,
    });
  } else {
    dispatch({
      type: STOP_LOADER,
      payload: loader,
    });
  }
};

export const logoutUser = () => dispatch => {};
