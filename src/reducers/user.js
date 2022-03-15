import { CREATE_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_USER:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;

// Esse reducer será responsável por tratar as informações da pessoa usuária
