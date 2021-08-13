import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';

import { UPDATE_TOKEN_INFO, UPDATE_USER_INFO } from '../../redux/actions/actions';
import {
  sendAuthorizationRequest,
  sendTokenRequest,
  sendTokenRequestByRefreshToken,
} from '../../actions/sign-in';
import {
  decodeIdToken,
  getAllSessionParameters,
  getRefreshToken,
  isValidSession,
} from '../../actions/session';
import {
  ACCESS_TOKEN_PARAM,
  EXPIRES_IN_PARAM,
  HOME_URL,
  ID_TOKEN_PARAM,
  REFRESH_TOKEN_PARAM,
  SCOPE_PARAM,
  TOKEN_TYPE_PARAM,
} from '../../constants/authentication';

function Login(props) {
  const { t } = useTranslation();

  const isSessionValid = isValidSession();
  const [checked, setChecked] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { updateToken } = props;

  useEffect(() => {
    // See if there is a valid session.
    if (isSessionValid) {
      const session = getAllSessionParameters();
      const tokenResponse = {
        access_token: session[ACCESS_TOKEN_PARAM],
        refresh_token: session[REFRESH_TOKEN_PARAM],
        scope: session[SCOPE_PARAM],
        id_token: session[ID_TOKEN_PARAM],
        token_type: session[TOKEN_TYPE_PARAM],
        expires_in: parseInt(session[EXPIRES_IN_PARAM], 10),
      };
      updateToken(tokenResponse, decodeIdToken(session[ID_TOKEN_PARAM]));
      setIsLoggedIn(true);
      setChecked(true);
    } else {
      generateNewToken();
    }
  }, [isSessionValid, updateToken]);

  function handleLoginBtnClick() {
    sendAuthorizationRequest();
  }

  function generateNewToken() {
    const code = new URL(window.location.href).searchParams.get('code');
    const refreshToken = getRefreshToken();
    // If a authorization code exists, sends a token request.
    if (code) {
      sendTokenRequest(code)
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log('TOKEN REQUEST SUCCESS', response);
          updateToken(response[0], response[1]);
          setChecked(true);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setChecked(true);
        });
    } else if (refreshToken) {
      sendTokenRequestByRefreshToken(refreshToken)
        .then((response) => {
          updateToken(response[0], response[1]);
          setChecked(true);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setChecked(true);
        });
    } else {
      setChecked(true);
    }
  }

  const queryParams = queryString.parse(window.location.search);
  const redirectUrl = queryParams.ref || HOME_URL;
  if (isLoggedIn) {
    return <Redirect to={redirectUrl} noThrow />;
  }
  return (
    <div className="row justify-content-center col-12 mt-4 justify-content-center">
      {checked && (
        <div className="col-4 m-auto">
          <button type="button" className="btn btn-primary col-12" onClick={handleLoginBtnClick}>
            {t('logIn')}
          </button>
        </div>
      )}
    </div>
  );
}

export default connect(
  () => ({}),
  (dispatch) => ({
    updateToken: (tokenResponse, idToken) =>
      dispatch({
        type: UPDATE_TOKEN_INFO,
        payload: {
          tokenResponse,

          idToken,
        },
      }),
    loadUserInfo: (token) => dispatch({ type: UPDATE_USER_INFO, payload: { token } }),
  }),
)(Login);
