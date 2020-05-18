import axios from 'axios';

const API_URL = 'http://sipola-sixab.herokuapp.com/api/auth/';
const API_URL_LOCAL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL_LOCAL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL_LOCAL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      noHP: user.noHP,
      alamat: user.alamat,
      name: user.name
    });
  }
}

export default new AuthService();