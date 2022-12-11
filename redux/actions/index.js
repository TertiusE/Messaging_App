import { UPDATE_USER, LOADING_STATE, UPDATE_ACCENT_COLOR, UPDATE_FONT, UPDATE_THEME, UPDATE_DATE_OF_BIRTH } from "../actionTypes"


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

export const setSystemFont = (i) => {
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

export const setTheme = (i) => {
    return {
    type: UPDATE_THEME,
    payload:  i
    }
}

export const setDateOfBirth = (i) => {
    return {
    type: UPDATE_DATE_OF_BIRTH,
    payload:  i
    }
}