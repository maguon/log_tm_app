import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    modifyPeccancy: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.peccancyEditor.modify_peccancy_success)]: (state, action) => {
        return {
            ...state,
            modifyPeccancy: {
                ...state.modifyPeccancy,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.peccancyEditor.modify_peccancy_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            modifyPeccancy: {
                ...state.modifyPeccancy,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.peccancyEditor.modify_peccancy_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            modifyPeccancy: {
                ...state.modifyPeccancy,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.peccancyEditor.modify_peccancy_waiting)]: (state, action) => {
        return {
            ...initialState,
            modifyPeccancy: {
                ...initialState.modifyPeccancy,
                isResultStatus: 1
            }
        }
    }
}, initialState)