import qs from 'qs';
import axios from 'axios';
import {base_url} from './api';
import AsyncStorage from '@react-native-community/async-storage';

export function request(url, data = {}, method) {
  //let token = AsyncStorage.getItem('token');
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      baseURL: base_url,
      data: qs.stringify(data),
      headers: {
        'Content-Type': 'application/json',
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
