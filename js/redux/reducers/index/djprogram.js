import types from '../../actionTypes/index';
import { initState } from '../../../utils/asyncActionHandle'

export default function onDjprogramAction(state = initState, action) {
  switch (action.type) {
    case types.GET_DJPROGRAM_SUCCESS:
      return {
        ...state,
        item: action.item,
        loading: false,
      };
    case types.GET_DJPROGRAM_FAIL:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
