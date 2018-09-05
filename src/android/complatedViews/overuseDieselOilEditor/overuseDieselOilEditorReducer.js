import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    modifyOveruseDieselOil: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.overuseDieselOilEditor.modify_overuseDieselOil_success)]: (state, action) => {
        return {
            ...state,
            modifyOveruseDieselOil: {
                ...state.modifyOveruseDieselOil,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.overuseDieselOilEditor.modify_overuseDieselOil_failed)]: (state, action) => {
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
    [(actionTypes.overuseDieselOilEditor.modify_overuseDieselOil_error)]: (state, action) => {
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
    [(actionTypes.overuseDieselOilEditor.modify_overuseDieselOil_waiting)]: (state, action) => {
        return {
            ...initialState,
            modifyPeccancy: {
                ...initialState.modifyPeccancy,
                isResultStatus: 1
            }
        }
    }
}, initialState)