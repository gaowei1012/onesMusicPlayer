import types from '../../actionTypes'
import { initState } from '../../../utils/asyncActionHandle';

export default function onSettingAction(state = initState, action) {
    switch(action.type) {
        case types.SETTING_DATA_SUCCESS:
            return {
                ...state,
                item: action.item,
            }
        case types.SETTING_DATA_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}