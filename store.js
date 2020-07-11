import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/Reducers';

export default function configureStore() {
  let store = createStore(reducers, applyMiddleware(thunk));
  return store;
}
