'use strict'
import types from '../../actionTypes/index'
import { request } from '../../../expand/request'
import {handleData,handleErrorData} from '../../../utils/asyncActionHandle'

// 精选歌单
export function onLoadTopPlayListHigh(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.playlists
        console.log('获取精选歌单', data)
        handleData(dispatch, data, types.TOP_PlAY_HIGH_LOAD_SUCCESS)
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.TOP_PlAY_HIGH_LOAD_FAIL)
      })
  }
}
