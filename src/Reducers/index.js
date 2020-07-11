import {combineReducers} from 'redux';
import errorReducer from './ErrorandLoader';
import authReducer from './Auth';
import memoriesreducer from './memories';
import reminderReducer from './reminder';
export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  memories: memoriesreducer,
  reminder: reminderReducer,
});
