import { CREATE_USER } from './index';

const infoUser = (email) => ({
  type: CREATE_USER,
  payload: email,
});

export default infoUser;
//
