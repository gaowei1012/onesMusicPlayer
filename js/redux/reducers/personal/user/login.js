import types from '../../../actionTypes/index';
import { initState } from '../../../../utils/asyncActionHandle';

export default function onLoginAction(state = initState, action) {
  switch (action.type) {
    case types.LOGIN_LOAD_SUCCESS:
      return {
        ...state,
        item: action.item,
      };
    case types.LOGIN_LOAD_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}
