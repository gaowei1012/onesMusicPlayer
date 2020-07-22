import types from '../../../actionTypes/index';
import {request} from '../../../../expand/request';
import { handleData, handleErrorData } from '../../../../utils/asyncActionHandle';

// 获取分类
export function getCatlistData(url) {
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

// 歌单详情
export function getCatlistDetailData(url) {
    return dispatch => {
        request(url)
            .then(res => {
                handleData(dispatch, res, types.get_cat_list_detail_success)
            })
            .catch(err => {
                handleErrorData(dispatch, err, types.get_cat_list_detail_fail)
            })
    }
}