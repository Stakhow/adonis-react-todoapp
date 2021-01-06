import axios from 'axios';
import Cookie from 'js-cookie';
import * as Constants from '../constants';

export default class ApiService {
  constructor() {
    // axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    this.instance = axios.create({
      // baseURL: process.env.REACT_APP_API_URL,
      ...this.config,
    });

    this.instance.interceptors.request.use( conf => {
      const token = Cookie.get(Constants.APP_ACCESS_TOKEN);

      if (!!token) {
        conf.headers.common['Authorization'] = `Bearer ${token}`;
      }

      return conf;
    });

    this.instance.interceptors.response.use(response => response,
      async error => {
      if (error.response.status === 401) {
        try {
          const {token, refreshToken} = await this.refreshToken();

          Cookie.set(Constants.APP_ACCESS_TOKEN, token);
          Cookie.set(Constants.APP_REFRESH_TOKEN, refreshToken);

          return await this.getUser();

        } catch (e) {

          Cookie.remove(Constants.APP_ACCESS_TOKEN);
          Cookie.remove(Constants.APP_REFRESH_TOKEN);

          return Promise.reject(new Error(e));
        }
      }

      return Promise.reject(error);
    });
  }

  config = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  /* auth */
  async register (data) {

    return await axios.post(`/api/v1/register`, data, this.config)
      .then(({data}) => {

        const {token, refreshToken} = data.token;

        Cookie.set(Constants.APP_ACCESS_TOKEN, token);
        Cookie.set(Constants.APP_REFRESH_TOKEN, refreshToken);

        return data
      })
      .catch(({response}) => Promise.reject(response.data))
  }

  async login (data) {

    return await axios.post(`/api/v1/login`, data, this.config)
      .then(({data}) => {

        const {token, refreshToken} = data.token;

        Cookie.set(Constants.APP_ACCESS_TOKEN, token);
        Cookie.set(Constants.APP_REFRESH_TOKEN, refreshToken);

        return data
      })
      .catch(({response}) => Promise.reject(response.data))
  }

  async getUser () {

      return await this.instance.get(`/api/v1/getUser`, this.config)
        .then(response => response)
        .catch(e => Promise.reject(new Error(e)));

  }

  async logout () {

    return await this.instance.post(`/api/v1/logout`, {
        refresh_token: Cookie.get(Constants.APP_REFRESH_TOKEN)
      }, this.config)
      .then(response => response)
      .catch(e => Promise.reject(new Error(e)))
      .finally(()=> {
        Cookie.remove(Constants.APP_ACCESS_TOKEN);
        Cookie.remove(Constants.APP_REFRESH_TOKEN);
      })
  }

  async refreshToken () {
    return await axios.post(`/api/v1/refreshToken`, {
      refresh_token: Cookie.get(Constants.APP_REFRESH_TOKEN)
    }, this.config).then(({data}) => data);
  }

  /* /auth */

  /* todos */

  async getTodos () {

    return await this.instance.get(`/api/v1/todos`, this.config)
      .then( res => ({data: res.data.todos}))
      .catch(({res}) => Promise.reject(res.data))
  }

  async createTodo ({todo}) {

    return await this.instance.post(`/api/v1/todos`, {body: todo}, this.config)
      .then( ({data}) => ({data: data.todo}))
      .catch(({res}) => Promise.reject(res.data))
  }

  async deleteTodo (id) {

    return await this.instance.delete(`/api/v1/todos/${id}`, this.config)
      .then( ({data}) => ({data: data.id}))
      .catch(({res}) => Promise.reject(res.data))
  }

  async updateTodo ({id, data: {body, completed}}) {

    return await this.instance.put(`/api/v1/todos/${id}`, {body, completed}, this.config)
      .then( (res) => res)
      .catch(({res}) => Promise.reject(res.data))
  }

  /* /todos */
}



