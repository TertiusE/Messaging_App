import { UPDATE_USER } from "../actionTypes"
import { LOADING_STATE } from "../actionTypes"

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