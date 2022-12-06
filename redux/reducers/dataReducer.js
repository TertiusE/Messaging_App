import { UPDATE_USER } from "../actionTypes"
import { LOADING_STATE } from "../actionTypes"

const initialState = {
    isLoading: true,
    user: null
}

export default function(state = initialState, action) {
    if (UPDATE_USER == action.type) {
        return { ...state, user: action.payload}
    }else if(LOADING_STATE == action.type){
        return { ...state, isLoading:action.payload}
    }
    return state
}