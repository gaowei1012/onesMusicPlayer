'use strict'

import types from '../../actionTypes/index'
// 签到
export default function onDailySingerAction(state = {}, action) {
  switch(action.type) {
    case types.DAILY_SINGER_LOAD_SUCCESS:
      return {
        ...state,
        item: action.item
      }
    case types.DAILY_SINGER_LOAD_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}
