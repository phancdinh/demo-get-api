import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import last from 'lodash/last';
import axios from 'axios';

import { Link } from '@reach/router';
import logo from '../../assets/images/logo.svg';
import bodyIcon from '../../assets/images/body-icon.svg';
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
import Language from '../layout/language';
import LoginIcon from './images/log-in-btn.svg';

function TopBar() {
  function handleLoginBtnClick() {
    sendAuthorizationRequest();
  }
  return (
    <div className="top-menu d-flex col-12 justify-content-between px-3 py-2">
      <div className="d-flex logo">
        <Link className="logo" to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="d-flex px-2">
        <div className="px-4 d-flex align-items-center">
          <Language />
        </div>

        <div className="d-flex px-4 align-items-center">
          <button
            type="button"
            className="bg-transparent border-0 login-btn"
            onClick={() => handleLoginBtnClick()}
          >
            <img src={LoginIcon} alt="Login" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Login(props) {
  const { t } = useTranslation();

  const isSessionValid = isValidSession();
  const [checked, setChecked] = useState(null);
  const { updateToken, navigate } = props;
  const queryParams = queryString.parse(window.location.search);
  let refParam;
  const { ref } = queryParams;
  if (Array.isArray(ref)) {
    refParam = last(ref);
  } else {
    refParam = ref;
  }
  const redirectUrl = refParam || HOME_URL;

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
      setChecked(true);
      navigate(redirectUrl);
    } else {
      generateNewToken();
    }
  }, [isSessionValid, updateToken]);

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
          navigate(redirectUrl);
        })
        .catch(() => {
          setChecked(true);
        });
    } else if (refreshToken) {
      sendTokenRequestByRefreshToken(refreshToken)
        .then((response) => {
          updateToken(response[0], response[1]);
          setChecked(true);
          navigate(redirectUrl);
        })
        .catch(() => {
          setChecked(true);
        });
    } else {
      setChecked(true);
    }
  }
  let amToken = null;
  const sendGetRequest = async () => {
    try {
      await axios
        .post(
          'https://api-production.citizen.com.vn/api/auth/v4/client-access-token',
          {},
          {
            headers: {
              'Client-Id': 'lYi3ivEIfl5CKWse8A2GV07xfK0a',
              'Client-Secret': '2US2PB29HbpEzhIR8bQZfJ7REK0a',
            },
          },
        )
        .then((response) => {
          // eslint-disable-next-line no-debugger
          amToken = response.data.data.access_token;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
      console.log(amToken);
      axios
        .get('https://api-production.citizen.com.vn/api/profiles/v5/consent/purposes/relying-party', {
          headers: {
            Authorization: `Bearer ${amToken}`,
            'Client-Token': `Bearer ${amToken}`,
            'Client-Id': 'lYi3ivEIfl5CKWse8A2GV07xfK0a',
            'Client-Secret': '2US2PB29HbpEzhIR8bQZfJ7REK0a',
          },
        })
        .then((response) => {})
        .catch((error) => {
          return Promise.reject(error);
        });
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  sendGetRequest();

  return (
    <div className="row">
      {checked && (
        <div className="wrapper d-flex flex-row">
          <div className="main-content flex-fill">
            <TopBar />
            <div className="content py-1 py-sm-3 px-2 px-sm-4">
              <div className="col-12 flex-column d-flex align-items-center">
                <span className="text-3xl text-color-2 pb-5 mb-5">{t('logIn.message')}</span>
                <div>
                  <img src={bodyIcon} alt="Body Icon" />
                </div>
                <div className="text-5xl text-color-2 pt-4">{t('topenx.app')}</div>
              </div>
            </div>
          </div>
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
