import axios from 'axios';

import { getSessionParameter } from '../../actions/session';
import { ACCESS_TOKEN_PARAM } from '../../constants/authentication';

const apiService = axios.create();

apiService.interceptors.request.use(
  (config) => {
    const token = getSessionParameter(ACCESS_TOKEN_PARAM);
    return {
      ...config,
      headers: { Authorization: `Bearer ${token}`, ...config.headers },
    };
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  },
);

export default apiService;
