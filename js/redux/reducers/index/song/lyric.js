import types from '../../../actionTypes/index';
import { initState } from '../../../../utils/asyncActionHandle';

// 获取歌词
export default function onLyricAction(state = initState, action) {
  switch (action.type) {
    case types.GET_LYRIC_SUCCESS:
      return {
        ...state,
        item: action.item,
        loading: false,
      };
    case types.GET_LYRIC_FAIL:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
