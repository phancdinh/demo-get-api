export const getUsername = (state) => {
  return state.userReducer.userInfo.sub;
};

export const getIdToken = (state) => {
  return state.userReducer.idToken;
};
export const getTokenResponse = (state) => {
  return state.userReducer.tokenResponse;
};
