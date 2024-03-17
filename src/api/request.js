import axios from 'axios';
import AppConfig from '../constants/appConfig';

const responseLog = (res) => {
  const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
    Math.random() * 255
  )},${Math.round(Math.random() * 255)})`;

  console.log(
    '%c┍------------------------------------------------------------------┑',
    `color:${randomColor};`
  );
  console.log('| Url:', res.request._url);
  console.log('| Method:', res.config.method);
  console.log('| Headers:', res.config.headers);
  console.log('| Date:', res.headers.date);
  if (res.config.data !== undefined) console.log('| Body:', res.config.data);
  console.log('| Response:', res.data);
  console.log(
    '%c┕------------------------------------------------------------------┙',
    `color:${randomColor};`
  );
};

const instance = axios.create({
  baseURL: AppConfig.baseUrl,
  timeout: 1000 * 5,
  withCredentials: true,
});
instance.defaults.headers['Content-Type'] = 'application/json';

// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    // Add api_key to params
    config.params = config.params || {};
    config.params.api_key = AppConfig.apiKey;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    response && responseLog(response); // release to remove
    if (response && response.status === 200) {
      return response.data;
    }
    return response.data;
  },
  function (error) {
    console.warn('error', error);
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ msg: '网络超时' });
    }
    switch (error.response.status) {
      case 401:
        return Promise.reject({ msg: '用户未登录' });
      case 404:
        return Promise.reject({ msg: '请求接口异常 404 not found' });
      case 400:
      case 500:
        return Promise.reject({ msg: '服务端异常' });
      case 502:
        return Promise.reject({ msg: '服务器异常' });
      default:
        return Promise.reject(error.response);
    }
  }
);

export default instance;
