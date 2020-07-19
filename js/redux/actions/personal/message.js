import types from '../../actionTypes/index';
import {request} from '../../../expand/request';
import {handleData, handleErrorData} from '../../../utils/asyncActionHandle';

// 通知 信息
export function onLoadPrivateData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        handleData(dispatch, data, types.MSG_LOAD_INFO_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.MSG_LOAD_INFO_FAIL);
      });
  };
}
