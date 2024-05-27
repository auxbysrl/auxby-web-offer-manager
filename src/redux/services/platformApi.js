import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://auxby.ro:8080/api/v1/',
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default instance;