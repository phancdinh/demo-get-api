import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import queryString from 'query-string';

import { REMOVE_TOKEN_INFO } from '../../redux/actions/actions';

import { getRefLogoutUrl, resetAuthenticatedSession } from '../../actions/session';
import { LOGIN_URL } from '../../constants/authentication';

function Logout(props) {
  const { dispatchRemoveToken } = props;

  const queryParams = queryString.parse(window.location.search);
  // eslint-disable-next-line no-debugger
  const { error, state } = queryParams;
  console.log('state');
  console.log(state);
  if (error) {
    const refLogoutUrl = getRefLogoutUrl();
    return <Redirect to={refLogoutUrl} noThrow />;
  }
  resetAuthenticatedSession();
  dispatchRemoveToken();
  return <Redirect to={LOGIN_URL} noThrow />;
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    dispatchRemoveToken: () =>
      dispatch({
        type: REMOVE_TOKEN_INFO,
        payload: {},
      }),
  }),
)(Logout);
