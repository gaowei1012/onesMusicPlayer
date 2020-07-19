import types from '../../../actionTypes/index';
import { initState } from '../../../../utils/asyncActionHandle';

export default function onPlayListAction(state = initState, action) {
  switch (action.type) {
    case types.get_user_play_list_success:
      return {
        ...state,
        item: action.item,
      };
    case types.get_user_play_list_fail:
      return {
        ...state,
      };

    default:
      return state;
  }
}
