'use strict'
import types from '../../actionTypes/index'
import { request } from '../../../expand/request';
import { handleData, handleErrorData } from '../../../utils/asyncActionHandle';

// 首页天气
export function onLoadWeatherData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.HeWeather6
        //console.log('res--weather', data)
        handleData(dispatch, data, types.INDEX_WEATHER_LOAD_SUCCESS)
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.INDEX_WEATHER_LOAD_FAIL)
      })
  }
}
