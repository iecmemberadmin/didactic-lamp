import {AUTHENTICATED} from '../actions/authActions';

export default function authReducer(state=false, {type, payload}) {
  switch(type) {
    case AUTHENTICATED:
      return payload.auth;
    default:
      return state;
  }
}