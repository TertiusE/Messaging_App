import { UPDATE_USER, LOADING_STATE, UPDATE_ACCENT_COLOR, UPDATE_FONT } from "../actionTypes"


export const setUser = (i) => {
    return {
    type: UPDATE_USER,
    payload:  i
    }
}

export const setLoading = (i) => {
    return {
    type: LOADING_STATE,
    payload:  i
    }
}

export const setFont = (i) => {
    return {
    type: UPDATE_FONT,
    payload:  i
    }
}

export const setAccentColour = (i) => {
    return {
    type: UPDATE_ACCENT_COLOR,
    payload:  i
    }
}