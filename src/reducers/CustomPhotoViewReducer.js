import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


const initialState = {
    data: {
        photoList: []
    }
}

export default handleActions({
    [(actionTypes.customPhotoViewTypes.INIT_PHOTOLIST)]: (state, action) => {
        const { payload: { data } } = action
        return {
            data: {
                photoList: data
            }
        }
    },
    [(actionTypes.customPhotoViewTypes.DEL_PHOTO)]: (state, action) => {
        const { payload: { data } } = action
        return {
            data: {
                photoList: state.data.photoList.filter((item) => item != data)
            }
        }
    }
}, initialState)