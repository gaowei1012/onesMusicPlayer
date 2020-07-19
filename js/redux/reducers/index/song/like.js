import types from '../../../actionTypes/index';
import { initState } from '../../../../utils/asyncActionHandle';

// 获取喜欢音乐
export default function onLikeAction(state = initState, action) {
  switch (action.type) {
    case types.GET_LIKE_SUCCESS:
      return {
        ...state,
        item: action.item,
        loading: false,
      };
    case types.GET_LIKE_FAIL:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
