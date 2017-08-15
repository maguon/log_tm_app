import * as actionTypes from './actionTypes'

export const setPhoto = (param) => (dispatch) => {
    console.log(param)
    dispatch({ type: actionTypes.singlePhotoViewTypes.SET_PHOTO, payload: { data: param } })
}
