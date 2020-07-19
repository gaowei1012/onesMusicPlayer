import types from '../../../actionTypes/index';
import { initState } from '../../../../utils/asyncActionHandle';

// 获取音乐url
export default function onSongAction(state = initState, action) {
  switch (action.type) {
    case types.GET_SONG_URL_SUCCESS:
      return {
        ...state,
        item: action.item,
      };
    case types.GET_SONG_URL_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
