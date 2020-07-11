import Database from '../Database';
import {GET_LOADER, GET_REMINDER, ADD_REMINDER, STOP_LOADER} from './types';
import Toast from '../NativeModules/Toast';
const db = new Database();

export const addReminder = data => dispatch => {
  dispatch({
    type: GET_LOADER,
    payload: {name: ADD_REMINDER, value: true},
  });
  db.addReminder(data)
    .then(calender => {
      Toast.show('Reminder added to calender', Toast.SHORT);
      dispatch({
        type: STOP_LOADER,
        payload: {name: ADD_REMINDER, value: false},
      });
      dispatch({
        type: ADD_REMINDER,
        payload: data,
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: STOP_LOADER,
        payload: {name: ADD_REMINDER, value: false},
      });
    });
};

export const getReminder = data => dispatch => {
  dispatch({
    type: GET_LOADER,
    payload: {name: GET_REMINDER, value: true},
  });
  db.getReminder()
    .then(calender => {
      console.log(calender);

      dispatch({
        type: STOP_LOADER,
        payload: {name: GET_REMINDER, value: false},
      });
      dispatch({
        type: GET_REMINDER,
        payload: calender,
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: STOP_LOADER,
        payload: {name: GET_REMINDER, value: false},
      });
    });
};
