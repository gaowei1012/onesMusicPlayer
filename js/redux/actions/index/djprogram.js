import types from '../../actionTypes/index';
import {request} from '../../../expand/request';
import {handleData, handleErrorData} from '../../../utils/asyncActionHandle';

// 推荐电台
export function onLoadDjprogramData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        console.log('获取电台', data);
        handleData(dispatch, data, types.GET_DJPROGRAM_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.GET_DJPROGRAM_FAIL);
      });
  };
}
