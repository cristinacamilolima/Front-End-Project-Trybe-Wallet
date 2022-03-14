import { SET_USER } from '../reducers/user';

const infoUser = (email) => ({ type: SET_USER, payload: email });

export default infoUser;
