import types from '../../../actionTypes/index';
import { initState } from '../../../../utils/asyncActionHandle';

// 推荐歌单
export default function onPersonalizAction(state = initState, action) {
  switch (action.type) {
    case types.GET_PERSONALIZ_SUCCESS:
      return {
        ...state,
        item: action.item,
        loading: false,
      };
    case types.GET_PERSONALIZ_FAIL:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
