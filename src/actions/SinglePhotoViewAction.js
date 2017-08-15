import * as actionTypes from './actionTypes'

export const setPhoto = (param) => (dispatch) => {
    dispatch({ type: actionTypes.singlePhotoViewTypes.SET_PHOTO, payload: { data: param } })
}
