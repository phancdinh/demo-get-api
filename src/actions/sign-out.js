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
import { addRefLogoutUrl, getSessionParameter } from './session';
import { CONFIG } from '../config';
import { ID_TOKEN_PARAM } from '../constants/authentication';

/**
 * Logs out from the session.
 */
export const dispatchLogout = () => {
  const token = getSessionParameter(ID_TOKEN_PARAM);
  if (token) {
    addRefLogoutUrl();
    // Clear the session storage
    const logout = `${CONFIG.LOGOUT_URL}?id_token_hint=${token}&post_logout_redirect_uri=${CONFIG.LOGOUT_REDIRECT_URI}&state=abcxyz`;
    console.log(logout);
    // eslint-disable-next-line no-debugger
    window.location.href = logout;
  } else {
    window.location.href = '/';
  }
};
