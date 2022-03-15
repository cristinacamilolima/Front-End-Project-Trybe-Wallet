import { GET_CURRENCIES_SUCESS } from './index';

const getCurrencySucess = (state) => ({
  type: GET_CURRENCIES_SUCESS,
  payload: state,
});

export default getCurrencySucess;
