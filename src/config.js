import { LOGIN_URL, LOGOUT_URL } from './constants/authentication';

const IS_HOST = process.env.REACT_APP_IS_HOST_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const CLIENT_URL = window.location.origin;

export const CONFIG = {
  AUTHORIZE_ENDPOINT: `${IS_HOST}/oauth2/authorize`,
  TOKEN_ENDPOINT: `${IS_HOST}/oauth2/token`,
  LOGOUT_URL: `${IS_HOST}/oidc/logout`,
  RESPONSE_TYPE: 'code',
  SCOPE: 'openid',
  REDIRECT_URI: `${CLIENT_URL}${LOGIN_URL}`,
  LOGOUT_REDIRECT_URI: `${CLIENT_URL}${LOGOUT_URL}`,
  CLIENT_ID,
  CLIENT_SECRET,
  GRANT_TYPE: 'authorization_code',
  CLIENT_URL,
  COOKIE_PATH: '/',
};
