import {request} from '../../../../expand/request'
import {handleData,handleErrorData} from '../../../../utils/asyncActionHandle'

export const get_lyric_success = 'get_lyric_success';
export const get_lyric_fail = 'get_lyric_fail';


function getLyricData(url) {
    return dispatch => {
        console.log('lyrics url', url)
        request(url)
            .then(res => {
                let data = res.lrc;
                handleData(dispatch, data, get_lyric_success)
            })
            .catch(err => {
                handleErrorData(dispatch, err, get_lyric_fail)
            })
    }
}

export default {
    getLyricData
}
