/**
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import jwtDecode from 'jwt-decode';

import { getCookie, removeCookie, setCookie } from '../helpers/cookies';
import {
  ACCESS_TOKEN_PARAM,
  CODE_VERIFIER_PARAM,
  EXPIRES_IN_PARAM,
  ID_TOKEN_PARAM,
  REF_LOGOUT_URL_PARAM,
  REFRESH_TOKEN_PARAM,
  SCOPE_PARAM,
  TOKEN_TYPE_PARAM,
} from '../constants/authentication';

/**
 * Initialize authenticated user session.\
 */
export const initAuthenticatedSession = (data) => {
  const parsedToken = jwtDecode(data.access_token);
  const expiredDate = new Date(parsedToken.exp * 1000);

  setCookie(ACCESS_TOKEN_PARAM, data.access_token, {
    expires: expiredDate,
  });
  setCookie(REFRESH_TOKEN_PARAM, data.refresh_token, {
    expires: expiredDate,
  });
  setCookie(SCOPE_PARAM, data.scope, {
    expires: expiredDate,
  });
  setCookie(ID_TOKEN_PARAM, data.id_token, {
    expires: expiredDate,
  });
  setCookie(TOKEN_TYPE_PARAM, data.token_type, {
    expires: expiredDate,
  });
  setCookie(EXPIRES_IN_PARAM, data.expires_in, {
    expires: expiredDate,
  });
};

/**
 * Get session parameter from cookie storage.
 *
 * @param key
 * @return {string}
 */
export const getSessionParameter = (key) => {
  return getCookie(key);
};

/**
 * Reset authenticated session.
 */
export const resetAuthenticatedSession = () => {
  removeCookie(ACCESS_TOKEN_PARAM);
  removeCookie(REFRESH_TOKEN_PARAM);
  removeCookie(REFRESH_TOKEN_PARAM);
  removeCookie(ID_TOKEN_PARAM);
  removeCookie(TOKEN_TYPE_PARAM);
  removeCookie(EXPIRES_IN_PARAM);
  removeCookie(CODE_VERIFIER_PARAM);
};

/**
 * Returns whether session is valid.
 *
 * @return {boolean}
 */
export const isValidSession = () => {
  const token = getCookie('ACCESS_TOKEN');
  // check token.
  return Boolean(token);
};

/**
 * Get all session parameters.
 *
 * @returns {{}}
 */
export const getAllSessionParameters = () => {
  const session = {};

  session[ACCESS_TOKEN_PARAM] = getCookie(ACCESS_TOKEN_PARAM);
  session[REFRESH_TOKEN_PARAM] = getCookie(REFRESH_TOKEN_PARAM);
  session[SCOPE_PARAM] = getCookie(SCOPE_PARAM);
  session[ID_TOKEN_PARAM] = getCookie(ID_TOKEN_PARAM);
  session[TOKEN_TYPE_PARAM] = getCookie(TOKEN_TYPE_PARAM);
  session[EXPIRES_IN_PARAM] = getCookie(EXPIRES_IN_PARAM);

  return session;
};

/**
 * Base64 decodes the ID token
 *
 * @param token id token
 * @return {any}
 */
export const decodeIdToken = (token) => {
  return jwtDecode(token);
};

export const setCodeVerifier = (codeVerifier) => {
  setCookie(CODE_VERIFIER_PARAM, codeVerifier);
};

export const getCodeVerifier = () => {
  return getCookie(CODE_VERIFIER_PARAM);
};

export const getRefreshToken = () => {
  return getCookie(REFRESH_TOKEN_PARAM);
};

export const addRefLogoutUrl = () => {
  return setCookie(REF_LOGOUT_URL_PARAM, window.location.pathname);
};

export const getRefLogoutUrl = () => {
  return getCookie(REF_LOGOUT_URL_PARAM);
};
