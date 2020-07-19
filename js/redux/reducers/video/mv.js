import types from '../../actionTypes/index';
import { initState } from '../../../utils/asyncActionHandle';

export default function onMvAction(state = initState, action) {
  switch (action.type) {
    case types.VIDEO_LOAD_SUCCESS:
      return {
        ...state,
        item: action.item,
      };
    case types.VIDEO_LOAD_FAIL:
      return {...state};
    default:
      return state;
  }
}
