import types from '../../actionTypes/index';
import { initState } from '../../../utils/asyncActionHandle'

// 每日推荐歌单
export default function onResoucreAction(state = initState, action) {
  switch (action.type) {
    case types.GET_RECOMMEND_SUCCESS:
      return {
        ...state,
        item: action.item,
        loading: false,
      };
    case types.GET_RECOMMEND_FAIL:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
