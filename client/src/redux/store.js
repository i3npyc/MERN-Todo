import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { headerReducer } from '../reducers/headerReducer';
import { todoReducer } from '../reducers/todoReducer';
import thunkMiddleware from 'redux-thunk';

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const redusers = combineReducers({
  header: headerReducer,
  todo: todoReducer
});

export const store = createStore(
  redusers,
  enhancer(applyMiddleware(thunkMiddleware))
);
