import {initState} from '../../../../utils/asyncActionHandle'
import {get_lyric_fail,get_lyric_success} from '../action'

export default function onLyricsAction(state = initState, action) {
    switch(action.type) {
        case get_lyric_success:
            return {
                ...state,
                item: action.item,
            }
        case get_lyric_fail:
            return {
                ...state
            }
        default:
            return state
    }
}
