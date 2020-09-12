import Database from '../Database';
import {
  GET_ALL_MEMORIES,
  ADD_MEMORIES,
  GET_LOADER,
  GET_SINGLE_MEMORIES,
  GET_ERROR,
  STOP_LOADER,
  TOGGLE_LIKE,
  SEARCH_MEMORIES,
  GET_MONTH_WISE_MEMORIES,
  GET_PHOTOS,
} from './types';
import Toast from '../NativeModules/Toast';
const db = new Database();
export const getAllMemories = () => dispatch => {
  dispatch({
    type: GET_LOADER,
    payload: {name: GET_ALL_MEMORIES, value: true},
  });
  db.listMemories()
    .then(data => {
      dispatch({
        type: STOP_LOADER,
        payload: {name: GET_ALL_MEMORIES, value: false},
      });
      dispatch({
        type: GET_ALL_MEMORIES,
        payload: data,
      });
    })
    .catch(error => {
      //consolelog(error);
      dispatch({
        type: STOP_LOADER,
        payload: {name: GET_ALL_MEMORIES, value: false},
      });
    });
};

export const getMonthWiseMemories = month => dispatch => {
  dispatch({
    type: GET_LOADER,
    payload: {name: GET_MONTH_WISE_MEMORIES, value: true},
  });
  db.getMemoriesByMonthName(month)
    .then(data => {
      Toast.show('Memories fetched!', Toast.SHORT);
      dispatch({
        type: STOP_LOADER,
        payload: {name: GET_MONTH_WISE_MEMORIES, value: false},
      });
      dispatch({
        type: GET_MONTH_WISE_MEMORIES,
        payload: data,
      });
    })
    .catch(error => {
      //consolelog(error);
      dispatch({
        type: STOP_LOADER,
        payload: {name: GET_ALL_MEMORIES, value: false},
      });
    });
};

export const addMemories = data => dispatch => {
  dispatch({
    type: GET_LOADER,
    payload: {name: ADD_MEMORIES, value: true},
  });

  db.addMemories(data)
    .then(data1 => {
      Toast.show('Sucessfully added!', Toast.SHORT);
      dispatch({
        type: STOP_LOADER,
        payload: {name: ADD_MEMORIES, value: false},
      });
      dispatch({
        type: ADD_MEMORIES,
        payload: data,
      });
    })
    .catch(err => {
      //consolelog(err);
      dispatch({
        type: STOP_LOADER,
        payload: {name: ADD_MEMORIES, value: false},
      });
    });
};

export const togglelikeMemories = data => dispatch => {
  db.toggleLikeMemories(data.primaryId, data)
    .then(data1 => {
      dispatch({
        type: TOGGLE_LIKE,
        payload: data,
      });
    })
    .catch(error => consolelog(error));
};

export const searchMemories = searchText => dispatch => {
  db.search(searchText)
    .then(data => {
      dispatch({
        type: SEARCH_MEMORIES,
        payload: data,
      });
    })
    .catch(err => {
      //consolelog(err);
    });
};

export const getPhotos = id => dispatch => {
  db.getPhotos(id)
    .then(res => {
      dispatch({
        type: GET_PHOTOS,
        payload: res,
      });
    })
    .catch(err => {
      //consolelog(err);
    });
};
