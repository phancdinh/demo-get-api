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
  const expiredDate = new Date();
  expiredDate.setSeconds(expiredDate.getSeconds() + data.expires_in);
  setSessionParameter(ACCESS_TOKEN_PARAM, data.access_token, {
    expires: expiredDate,
  });
  setSessionParameter(REFRESH_TOKEN_PARAM, data.refresh_token);
  setSessionParameter(ID_TOKEN_PARAM, data.id_token, {
    expires: expiredDate,
  });
  setSessionParameter(TOKEN_TYPE_PARAM, data.token_type);
  setSessionParameter(EXPIRES_IN_PARAM, data.expires_in);
  setSessionParameter(SCOPE_PARAM, data.scope);
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

export const setSessionParameter = (key, value, options = {}) => {
  setCookie(key, value, {
    ...options,
  });
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
  const token = getSessionParameter(ACCESS_TOKEN_PARAM);
  return Boolean(token);
};

/**
 * Get all session parameters.
 *
 * @returns {{}}
 */
export const getAllSessionParameters = () => {
  const session = {};

  session[ACCESS_TOKEN_PARAM] = getSessionParameter(ACCESS_TOKEN_PARAM);
  session[REFRESH_TOKEN_PARAM] = getSessionParameter(REFRESH_TOKEN_PARAM);
  session[SCOPE_PARAM] = getSessionParameter(SCOPE_PARAM);
  session[ID_TOKEN_PARAM] = getSessionParameter(ID_TOKEN_PARAM);
  session[TOKEN_TYPE_PARAM] = getSessionParameter(TOKEN_TYPE_PARAM);
  session[EXPIRES_IN_PARAM] = getSessionParameter(EXPIRES_IN_PARAM);

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
  setSessionParameter(CODE_VERIFIER_PARAM, codeVerifier);
};

export const getCodeVerifier = () => {
  return getSessionParameter(CODE_VERIFIER_PARAM);
};

export const getRefreshToken = () => {
  return getSessionParameter(REFRESH_TOKEN_PARAM);
};

export const addRefLogoutUrl = () => {
  return setCookie(REF_LOGOUT_URL_PARAM, window.location.pathname);
};

export const getRefLogoutUrl = () => {
  return getCookie(REF_LOGOUT_URL_PARAM);
};
