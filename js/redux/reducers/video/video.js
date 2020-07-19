import types from '../../actionTypes/index';
import {initState} from '../../../utils/asyncActionHandle';

// 视频菜单列表
function onLoadVideoGroupAction(state = initState, action) {
  switch (action.type) {
    case types.VIDEO_LOAD_MENU_SUCCESS:
      return {
        ...state,
        item: action.item,
      };
    case types.VIDEO_LOAD_MENU_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}

// 视频详情
function onLoadVideoDetailAction(state = initState, action) {
  switch (action.type) {
    case types.VIDEO_LOAD_DETAIL_SUCCESS:
      return {
        ...state,
        item: action.item,
      };
    case types.VIDEO_LOAD_DETAIL_FAIL:
      return {...state};
    default:
      return state;
  }
}

// 相关视频
function onLoadVideoRelateAction(satte = initState, action) {
  switch (action.type) {
    case types.VIDEO_LOAD_RELATE_SUCCESS:
      return {
        ...satte,
        item: action.item,
      };
    case types.VIDEO_LOAD_RELATE_FAIL:
      return {...state};
    default:
      return satte;
  }
}

export default {
  onLoadVideoGroupAction,
  onLoadVideoRelateAction,
  onLoadVideoDetailAction,
};
