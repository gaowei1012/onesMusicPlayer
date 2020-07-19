'use strict'

import types from '../../actionTypes/index'
import {request} from '../../../expand/request'
import { handleData, handleErrorData } from '../../../utils/asyncActionHandle'

// 搜索
export function onLoadSearchData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.result.songs
        console.log('data===data', data)
        handleData(dispatch, data, types.SEARCH_LOAD_SUCCESS)
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.SEARCH_LOAD_SUCCESS)
      })
  }
} 
