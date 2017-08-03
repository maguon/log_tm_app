import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        user: {
            userId: 38
        }
    }
}

export default handleActions({

}, initialState)