import types from '../../actionTypes'
import { initState } from '../../../utils/asyncActionHandle';

export default function onPersoanlMvAction(state = initState, action) {
    switch(action.type) {
        case types.get_personal_mv_success:
            return {
                ...state,
                item: action.item,
            }
        case types.get_personal_mv_fail:
            return {
                ...state
            }
        default:
            return state
    }
} 
