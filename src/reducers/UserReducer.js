import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        user: {
            userId: "38",
            userType: "21",
            mobile: "18888"
        }
    }
}

export default handleActions({

}, initialState)