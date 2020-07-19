'use strict'
import types from '../../actionTypes/index'
import { initState } from '../../../utils/asyncActionHandle'

/**
 * 推荐电台
 * @param {state} state 
 * @param {action} action 
 */
export default function onRadioAction(state = initState, action) {
  switch(action.type) {
    case types.RADIO_RAKING_SUCCESS:
      return {
        ...state,
        item: action.item
      }
    case types.RADIO_RAKING_FAIL:
      return {
        ...state,
      }
    default:
      return state
  }
}