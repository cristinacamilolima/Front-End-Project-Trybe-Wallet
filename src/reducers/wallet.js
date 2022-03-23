// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES_SUCESS } from '../actions';

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SET_EXCHANGE = 'SET_EXCHANGE';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_EXCHANGE:
    return {
      ...state,
      currencies: action.payload,
    };
  case GET_CURRENCIES_SUCESS:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.reduce((acc, expense) => {
        if (expense.id === action.id) {
          return [...acc, action.payload];
        }
        return [...acc, expense];
      }, []),
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  default:
    return state;
  }
};

export default wallet;
