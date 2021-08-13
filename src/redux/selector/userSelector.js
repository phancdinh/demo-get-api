export const getUsername = (state) => {
  return state.userReducer.userInfo.sub;
};

export const getIdToken = (state) => {
  return state.userReducer.idToken;
};
