'use strict'

import types from '../../actionTypes/index'
import { initState } from '../../../utils/asyncActionHandle'

// 排行榜
export default function onTopListAction(state = initState, action) {
  switch (action.type) {
    case types.TOP_LIST_LOAD_SUCCESS:
      return {
        ...state,
        item: action.item
      }
    case types.TOP_LIST_LOAD_FAIL:
      return {...state}
    default:
      return state
  }
}