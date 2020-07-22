import types from '../../../actionTypes/index';
import {request} from '../../../../expand/request';
import {handleData, handleErrorData} from '../../../../utils/asyncActionHandle';

// 获取歌单详情
export function onLoadPlayListData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        handleData(dispatch, data, types.GET_PLAY_LIST_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.GET_PLAY_LIST_FAIL);
      });
  };
}

// 获取音乐url
export function onLoadSongUrl(url) {
  console.log('song url', url)
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.data;
        handleData(dispatch, data, types.GET_SONG_URL_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.GET_SONG_URL_FAIL);
      });
  };
}

// 获取歌词
export function onLoadLyricData(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res.lrc;
        console.log('获取歌词', data);
        handleData(dispatch, data, types.GET_LIKE_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.GET_LYRIC_FAIL);
      });
  };
}

// 检查音乐是否可用
export function onCheckMusic(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        handleData(dispatch, data, types.CHECK_MUSIC_SCUUESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.CHECK_MUSIC_FAIL);
      });
  };
}

// 喜欢音乐
export function onLikeMusic(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        handleData(dispatch, data, types.GET_LIKE_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.GET_LIKE_FAIL);
      });
  };
}

// 喜欢音乐列表
export function onLikeListMusic(url) {
  return dispatch => {
    request(url)
      .then(res => {
        let data = res;
        handleData(dispatch, data, types.GET_LIKE_LIST_SUCCESS);
      })
      .catch(err => {
        handleErrorData(dispatch, err, types.GET_LIKE_LIST_FAIL);
      });
  };
}
