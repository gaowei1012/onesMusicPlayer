import types from '../../../actionTypes/index';
import { initState } from '../../../../utils/asyncActionHandle';

// 发送验证码
export default function onGetCodeAction(state = initState, action) {
  switch (action.type) {
    case types.GET_CODE_DATA_SUCCESS:
      return {
        ...state,
        item: action.item,
      };
    case types.GET_CODE_DATA_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
