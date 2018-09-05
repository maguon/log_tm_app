import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    createPeccancy: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.createPeccancy.create_peccancy_success)]: (state, action) => {
        return {
            ...state,
            createPeccancy: {
                ...state.createPeccancy,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.createPeccancy.create_peccancy_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            createPeccancy: {
                ...state.createPeccancy,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.createPeccancy.create_peccancy_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            createPeccancy: {
                ...state.createPeccancy,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.createPeccancy.create_peccancy_waiting)]: (state, action) => {
        return {
            ...initialState,
            createPeccancy: {
                ...initialState.createPeccancy,
                isResultStatus: 1
            }
        }
    }
}, initialState)