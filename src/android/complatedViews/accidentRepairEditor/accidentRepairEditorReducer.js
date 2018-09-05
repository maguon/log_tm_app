import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    modifyAccidentRepair:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '' 
    }
}

export default handleActions({
    [(actionTypes.accidentRepairEditor.modify_accidentRepair_success)]: (state, action) => {
        return {
            ...state,
            modifyAccidentRepair: {
                ...state.modifyAccidentRepair,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentRepairEditor.modify_accidentRepair_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            modifyAccidentRepair: {
                ...state.modifyAccidentRepair,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.accidentRepairEditor.modify_accidentRepair_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            modifyAccidentRepair: {
                ...state.modifyAccidentRepair,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.accidentRepairEditor.modify_accidentRepair_waiting)]: (state, action) => {
        return {
            ...initialState,
            modifyAccidentRepair: {
                ...initialState.modifyAccidentRepair,
                isResultStatus: 1
            }
        }
    }
}, initialState)