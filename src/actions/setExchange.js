import { SET_EXCHANGE } from '../reducers/wallet';

const setexchange = (currencies) => ({ type: SET_EXCHANGE, payload: currencies });

export default setexchange;
