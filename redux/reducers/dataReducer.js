import { UPDATE_USER, LOADING_STATE, UPDATE_ACCENT_COLOR, UPDATE_FONT, UPDATE_THEME } from "../actionTypes"


const initialState = {
    isLoading: true,
    user: null,
    accentColour: '#5C4DF8',
    systemFont: null,
    systemTheme: "light"
}


export default function(state = initialState, action) {
    if (UPDATE_USER == action.type) {
        return { ...state, user: action.payload}
    }else if(LOADING_STATE == action.type){
        return { ...state, isLoading:action.payload}
    }else if(UPDATE_ACCENT_COLOR == action.type){
        return { ...state, accentColour:action.payload}
    }else if(UPDATE_FONT == action.type){
        return { ...state, systemFont:action.payload}
    }else if(UPDATE_THEME == action.type){
        return { ...state, systemTheme:action.payload}
    }
    return state
}
