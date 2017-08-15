import * as actionTypes from './actionTypes'

export const initPhotoList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.customPhotoViewTypes.INIT_PHOTOLIST, payload: { data: param } })
}

export const delPhoto = (param) => (dispatch) => {
    dispatch({ type: actionTypes.customPhotoViewTypes.DEL_PHOTO, payload: { data: param } })
}