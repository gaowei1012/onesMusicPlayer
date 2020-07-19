import types from '../../actionTypes/index';
import {request} from '../../../expand/request';
import {handleData, handleErrorData} from '../../../utils/asyncActionHandle';
// 签到
export function onDailySinger(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        console.log('data===签到', data);
        handleData(dispatch, data, types.DAILY_SINGER_LOAD_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.DAILY_SINGER_LOAD_FAIL);
      });
  };
}
