'use strict';

import types from '../../actionTypes/index';
import {request} from '../../../expand/request';
import {handleData, handleErrorData} from '../../../utils/asyncActionHandle';
// 今日推荐
export function onLoadRecommendData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.result;
        //console.log('--推荐--', data)
        handleData(dispatch, data, types.RECOMMED_LOAD_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.RECOMMED_LOAD_FAIL);
      });
  };
}

// 推荐歌单
export function onLoadPersonalizData(url, token) {
  return dispatch => {
    request(url, token)
      .then(res => {
        const data = res.data.dailySongs;
        // console.log('每日推荐', data)
        handleData(dispatch, data, types.GET_PERSONALIZ_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.GET_PERSONALIZ_FAIL);
      });
  };
}
