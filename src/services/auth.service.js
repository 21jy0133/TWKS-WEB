import axios from 'axios'
import authHeader from './auth-header'

const API_URL = import.meta.env.VITE_API_ENDPOINT

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'auth/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  my() {
    return axios
      .get(API_URL + 'user', { headers: authHeader() })
      .then(response => {
          localStorage.setItem('userDetail', JSON.stringify(response.data));
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userDetail');
  }

  /*

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }*/
}

export default new AuthService();