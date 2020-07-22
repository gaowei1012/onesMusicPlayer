import types from '../../../actionTypes/index'
import { initState } from '../../../../utils/asyncActionHandle'

export default function onCatlistAction(state = initState, action) {
    switch(action.type) {
        case types.get_cat_list_detail_success:
          return {
            ...state,
            item: action.item,
          }
        case types.get_cat_list_detail_fail:
          return {
            ...state
          }
        default:
          return state
      }
}