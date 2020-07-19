'use strict'

import types from '../../actionTypes/index'
import { initState } from '../../../utils/asyncActionHandle'

// 首页天气
export default function onWeatherAction(state = initState, action) {
  switch(action.type) {
    case types.INDEX_WEATHER_LOAD_SUCCESS:
      return {
        ...state,
        item: action.item
      }
    case types.INDEX_WEATHER_LOAD_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}
