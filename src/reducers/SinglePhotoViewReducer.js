import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


const initialState = {
    data: {
        photo: []
    }
}

export default handleActions({
    [(actionTypes.singlePhotoViewTypes.SET_PHOTO)]: (state, action) => {
        const { payload: { data } } = action
        console.log('data',data)
        return {
            data: {
                photo: [data]
            }
        }
    }
}, initialState)