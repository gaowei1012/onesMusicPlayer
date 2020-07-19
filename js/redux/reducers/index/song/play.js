import types from '../../../actionTypes/index';
import { initState } from '../../../../utils/asyncActionHandle';

export default function onPlayListAction(state = initState, action) {
  switch (action.type) {
    case types.GET_PLAY_LIST_SUCCESS:
      return {
        ...state,
        item: action.item,
        loading: false,
      };
    case types.GET_PLAY_LIST_FAIL:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
