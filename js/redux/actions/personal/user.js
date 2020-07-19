
import types from '../../actionTypes/index';
import {request} from '../../../expand/request';
import {handleData, handleErrorData} from '../../../utils/asyncActionHandle';

// 发送验证码
export function onGetCodeData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.data;
        handleData(dispatch, data, types.GET_CODE_DATA_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.GET_CODE_DATA_FAIL);
      });
  };
}

// 登录
export function onLoginData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        handleData(dispatch, data, types.LOGIN_LOAD_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.LOGIN_LOAD_FAIL);
      });
  };
}

// 获取用户信息
export function onUserInfoData(url) {
  // console.log('用户信息', url)
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        handleData(dispatch, data, types.USER_LOAD_INFO_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.USER_LOAD_INFO_FAIL);
      });
  };
}

// 用户关注列表
export function onFollowsData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        handleData(dispatch, data, types.USER_LOAD_FOLLOWS_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.USER_LOAD_FOLLOWS_FAIL);
      });
  };
}

// 签到
export function onSignindata(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.data;
        handleData(dispatch, data, types.SIGNIN_LOAD_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.SIGNIN_LOAD_FAIL);
      });
  };
}

// 设置
export function onSettingData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.data
        handleData(dispatch, data, types.SETTING_DATA_SUCCESS)
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.SETTING_DATA_SUCCESS)
      })
  }
}

// 获取用户歌单
export function onPlayListData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.playlist;
        handleData(dispatch, data, types.get_user_play_list_success)
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.get_user_play_list_fail)
      })
  }
}