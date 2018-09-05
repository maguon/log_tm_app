import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    finishAccidentRepair:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '' 
    }
}

export default handleActions({
    [(actionTypes.accidentRepairFinish.finish_accidentRepair_success)]: (state, action) => {
        return {
            ...state,
            finishAccidentRepair: {
                ...state.finishAccidentRepair,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentRepairFinish.finish_accidentRepair_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            finishAccidentRepair: {
                ...state.finishAccidentRepair,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.accidentRepairFinish.finish_accidentRepair_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            finishAccidentRepair: {
                ...state.finishAccidentRepair,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.accidentRepairFinish.finish_accidentRepair_waiting)]: (state, action) => {
        return {
            ...initialState,
            finishAccidentRepair: {
                ...initialState.finishAccidentRepair,
                isResultStatus: 1
            }
        }
    }
}, initialState)