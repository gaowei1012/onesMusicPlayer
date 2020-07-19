'use strict'
import types from '../../actionTypes/index'
import { initState } from '../../../utils/asyncActionHandle'

/**
 * 电台详情
 * @param {state} state 
 * @param {action} action 
 */
export default function onRadioDetailAction(state = initState, action) {
  switch(action.type) {
    case types.RADIO_DETAIL_SUCCESS:
      return {
        ...state,
        item: action.item
      }
    case types.RADIO_DETAIL_FAIL:
      return {
        ...state,
      }
    default:
      return state
  }
}