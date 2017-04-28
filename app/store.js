import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers/index';

const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))));

export default store;
