import axios from 'axios';
const instance = axios.create({
  baseURL: `http://localhost:8080/api`
});

instance.interceptors.request.use(function (config) {
    if (localStorage.getItem('token')) {
      config.headers.authorization = localStorage.getItem('token');
    } else if (sessionStorage.getItem('token')) {
      config.headers.authorization = sessionStorage.getItem('token');
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
  }, err => {
    if ( err && err.response && err.response.status === 401 && err.config && !err.config.__isRetryRequest ) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.pathname = '/login'
    } else if ( err && err.response && err.response.status === 500 ) {
        // history.push({pathname:'/pages/errors/error-500'});
        console.log(err.response.data)
    }
    return Promise.reject(err);
});

export default instance;
