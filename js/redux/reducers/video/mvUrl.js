import types from '../../actionTypes'
import { initState } from '../../../utils/asyncActionHandle';

export default function onPlayerAction(state = initState, action) {
    switch(action.type) {
        case types.GET_VIDEO_PLAYER_SUCCESS:
            return {
                ...state,
                item: action.item,
            }
        case types.GET_VIDEO_PLAYER_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
} 