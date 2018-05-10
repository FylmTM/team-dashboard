import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers';

const enhancer = applyMiddleware(logger, thunk);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
