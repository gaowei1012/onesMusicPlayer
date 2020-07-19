'use strict'

import types from '../../actionTypes/index'
import {request} from '../../../expand/request'
import {handleData,handleErrorData} from '../../../utils/asyncActionHandle'
/**
 * 电台
 * @param {string} url
 */
export function onLoadRadioData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.result
        //console.log(' 电台 res======data', data)
        handleData(dispatch, data, types.RADIO_LOAD_SUCCESS)
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.RADIO_LOAD_FAIL)
      })
  }
}

// 获取电台banner
export function onRadioBanner(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.data;
        handleData(dispatch, data, types.RADIO_BANNER_SUCCESS)
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.RADIO_BANNER_FAIL)
      })
  }
}

// 推荐电台
export function onRadioRaking(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.djRadios
        handleData(dispatch, data, types.RADIO_RAKING_SUCCESS)
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.RADIO_RAKING_FAIL)
      })
  }
}

// 电台详情
export function onRadioDetail(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.djRadio
        handleData(dispatch, data, types.RADIO_DETAIL_SUCCESS)
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.RADIO_DETAIL_FAIL)
      })
  }
}

// 电台分类
export function onRadioSelected(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.data
        handleData(dispatch, data)
      })
      .catch(err => {
        handleErrorData(dispatch, err)
      })
  }
}

