import qs from 'qs';
import axios from 'axios';
import {base_url} from './api';

export function request(url, data = {}, method, token) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      baseURL: base_url,
      data: qs.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      method: method,
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
