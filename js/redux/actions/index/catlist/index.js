import types from '../../../actionTypes/index';
import {request} from '../../../../expand/request';
import { handleData, handleErrorData } from '../../../../utils/asyncActionHandle';

// 获取分类
export function getCatlistData(url) {
    console.log('url', url)
    return dispatch => {
        request(url)
            .then(res => {
                handleData(dispatch, res, types.get_cat_list_success)
            })
            .catch(err => {
                handleErrorData(dispatch, err, types.get_cat_list_fail)
            })
    }
}
