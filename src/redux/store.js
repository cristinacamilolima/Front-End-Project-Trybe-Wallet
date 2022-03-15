import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import fontReducer from '../reducers';

const store = createStore(
  fontReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
