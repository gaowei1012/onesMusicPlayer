'use strict'
import types from '../../actionTypes/index'
import {request} from '../../../expand/request'
import {handleData, handleErrorData} from '../../../utils/asyncActionHandle'
/**
 * 获取轮播图数据
 * @param {string} url 
 */
export function onLoadBannerData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.banners;
        handleData(dispatch, data, types.BANNER_LOAD_SUCCESS)
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.BANNER_LOAD_FAIL)
      })
  }
}
