import types from '../../../actionTypes/index';
import { initState } from '../../../../utils/asyncActionHandle';

/// 签到
export default function onSigninAction(state = initState, action) {
  switch (action.type) {
    case types.SIGNIN_LOAD_SUCCESS:
      return {
        ...state,
        item: action.item,
      };
    case types.SIGNIN_LOAD_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
