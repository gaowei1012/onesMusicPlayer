import types from '../../../actionTypes/index';

export default function onUserInfoAction(state = {}, action) {
  switch (action.type) {
    case types.USER_LOAD_INFO_SUCCESS:
      return {
        ...state,
        item: action.item,
      };
    case types.USER_LOAD_INFO_FAIL:
      return {...state};
    default:
      return state;
  }
}
