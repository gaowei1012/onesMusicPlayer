import types from '../../../actionTypes/index';
import { initState } from '../../../../utils/asyncActionHandle';

export default function onCheckMusicAction(state = initState, action) {
  switch (action.type) {
    case types.CHECK_MUSIC_SCUUESS:
      return {
        ...state,
        item: action.item,
      };
    case types.CHECK_MUSIC_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
