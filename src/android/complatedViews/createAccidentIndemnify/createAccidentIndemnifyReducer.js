import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    createAccidentIndemnify: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.createAccidentIndemnify.create_accidentIndemnify_success)]: (state, action) => {
        return {
            ...state,
            createAccidentIndemnify: {
                ...state.createAccidentIndemnify,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.createAccidentIndemnify.create_accidentIndemnify_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            createAccidentIndemnify: {
                ...state.createAccidentIndemnify,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.createAccidentIndemnify.create_accidentIndemnify_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            createAccidentIndemnify: {
                ...state.createAccidentIndemnify,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.createAccidentIndemnify.create_accidentIndemnify_waiting)]: (state, action) => {
        return {
            ...initialState,
            createAccidentIndemnify: {
                ...initialState.createAccidentIndemnify,
                isResultStatus: 1
            }
        }
    }
}, initialState)