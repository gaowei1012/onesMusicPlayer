import types from '../../../actionTypes/index';
import { initState } from '../../../../utils/asyncActionHandle';

export default function onPrivateAction(state = initState, action) {
  switch (action.type) {
    case types.MSG_LOAD_INFO_SUCCESS:
      return {
        ...state,
        item: action.item,
      };
    case types.MSG_LOAD_INFO_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
