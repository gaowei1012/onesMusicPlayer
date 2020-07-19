'use strict'
import types from '../../actionTypes/index'
import { initState } from '../../../utils/asyncActionHandle'

export default function onBannerAction(state = initState, action) {
  switch(action.type) {
    case types.BANNER_LOAD_SUCCESS:
      return {
        ...state,
        item: action.item, // banners
      }
    case types.BANNER_LOAD_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}