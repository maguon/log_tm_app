import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    createAccidentDispose: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}


export default handleActions({
    [(actionTypes.createAccidentDispose.create_accidentDispose_success)]: (state, action) => {
        return {
            ...state,
            createAccidentDispose: {
                ...state.createAccidentDispose,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.createAccidentDispose.create_accidentDispose_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            createAccidentDispose: {
                ...state.createAccidentDispose,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.createAccidentDispose.create_accidentDispose_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            createAccidentDispose: {
                ...state.createAccidentDispose,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.createAccidentDispose.create_accidentDispose_waiting)]: (state, action) => {
        return {
            ...initialState,
            createAccidentDispose: {
                ...initialState.createAccidentDispose,
                isResultStatus: 1
            }
        }
    }
}, initialState)