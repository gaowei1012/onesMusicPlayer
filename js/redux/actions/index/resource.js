import types from '../../actionTypes/index';
import {request} from '../../../expand/request';
import {handleData, handleErrorData} from '../../../utils/asyncActionHandle';

/// 每日推荐歌单
export function onLoadResourceData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        handleData(dispatch, data, types.GET_RECOMMEND_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.GET_RECOMMEND_FAIL);
      });
  };
}
