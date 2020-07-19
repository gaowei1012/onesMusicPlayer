import types from '../../actionTypes/index';
import {request} from '../../../expand/request';
import {handleData, handleErrorData} from '../../../utils/asyncActionHandle';

// 视频列表
export function onLoadVideoGroupData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        handleData(dispatch, data, types.VIDEO_LOAD_MENU_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.VIDEO_LOAD_MENU_FAIL);
      });
  };
}

// 相关详情
export function onLoadVideoRelateData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        handleData(dispatch, data, types.VIDEO_LOAD_RELATE_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.VIDEO_LOAD_RELATE_FAIL);
      });
  };
}

// 视频详情
export function onLoadVideoDetailData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        handleData(dispatch, data, types.VIDEO_LOAD_DETAIL_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.VIDEO_LOAD_DETAIL_FAIL);
      });
  };
}
