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

import axios from 'axios';

import { CONFIG } from '../config';

import { decodeIdToken, getCodeVerifier, initAuthenticatedSession, setCodeVerifier } from './session';
import getPKCE from './pkce';

/**
 * Sends an authorization request.
 */
export const sendAuthorizationRequest = () => {
  const pkceValues = getPKCE();
  const { codeChallenge } = pkceValues;
  setCodeVerifier(pkceValues.codeVerifier);
  window.location.href =
    `${CONFIG.AUTHORIZE_ENDPOINT}?response_type=${CONFIG.RESPONSE_TYPE}` +
    `&scope=${CONFIG.SCOPE}&redirect_uri=${CONFIG.REDIRECT_URI}&client_id=${CONFIG.CLIENT_ID}` +
    `&code_challenge=${codeChallenge}&code_challenge_method=S256`;
};

/**
 * Sends a token request.
 *
 * @param code Authorization code
 * @return {Promise<AxiosResponse<T> | never>}
 */
export const sendTokenRequest = (code) => {
  const codeVerifier = getCodeVerifier();
  const body = [];
  body.push(`client_id=${CONFIG.CLIENT_ID}`);
  body.push(`client_secret=${CONFIG.CLIENT_SECRET}`);
  body.push(`code=${code}`);
  body.push(`grant_type=${CONFIG.GRANT_TYPE}`);
  body.push(`redirect_uri=${CONFIG.REDIRECT_URI}`);
  body.push(`code_verifier=${codeVerifier}`);

  return axios
    .post(`${CONFIG.TOKEN_ENDPOINT}`, body.join('&'), getTokenRequestHeaders())
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject(
          new Error(`Invalid status code received in the token response: ${response.status}`),
        );
      }
      // Store the response in the session storage
      initAuthenticatedSession(response.data);
      return [response.data, decodeIdToken(response.data.id_token)];
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const sendTokenRequestByRefreshToken = (refreshToken) => {
  const body = [];
  body.push(`refresh_token=${refreshToken}`);
  body.push(`grant_type=refresh_token`);
  body.push(`scope=${CONFIG.SCOPE}`);
  console.log('generate token by refresh');
  return axios
    .post(`${CONFIG.TOKEN_ENDPOINT}`, body.join('&'), {
      auth: {
        username: CONFIG.CLIENT_ID,
        password: CONFIG.CLIENT_SECRET,
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject(
          new Error(`Invalid status code received in the token response: ${response.status}`),
        );
      }
      initAuthenticatedSession(response.data);
      return [response.data, decodeIdToken(response.data.id_token)];
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

/**
 * Helper to set request headers.
 *
 * @return {{headers: {Accept: string, "Access-Control-Allow-Origin": string, "Content-Type": string}}}
 */
const getTokenRequestHeaders = () => {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
};
