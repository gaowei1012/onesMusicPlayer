import qs from 'qs';
import axios from 'axios';
import {base_url} from './api';

export function request(url, token) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      baseURL: base_url,
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      method: "GET",
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
