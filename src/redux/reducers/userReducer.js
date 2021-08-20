import * as actions from '../actions/actions';

const defaultUserState = {
  userInfo: null,
  isAuthenticated: false,
  tokenResponse: {},
  idToken: {},
};

const userReducer = (state = defaultUserState, { type, payload }) => {
  switch (type) {
    case actions.UPDATE_TOKEN_INFO: {
      console.log('UPDATE_TOKEN_INFO', payload);
      return {
        ...state,
        isAuthenticated: true,
        tokenResponse: payload.tokenResponse,
        idToken: payload.idToken,
      };
    }
    case actions.REMOVE_TOKEN_INFO: {
      return {
        ...state,
        isAuthenticated: false,
        tokenResponse: {},
        idToken: {},
      };
    }
    default:
      return state;
  }
};

export default userReducer;
