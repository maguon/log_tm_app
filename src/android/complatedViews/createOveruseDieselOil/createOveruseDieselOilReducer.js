import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    createOveruseDieselOil: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.createOveruseDieselOil.create_overuseDieselOil_success)]: (state, action) => {
        return {
            ...state,
            createOveruseDieselOil: {
                ...state.createOveruseDieselOil,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.createOveruseDieselOil.create_overuseDieselOil_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            createOveruseDieselOil: {
                ...state.createOveruseDieselOil,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.createOveruseDieselOil.create_overuseDieselOil_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            createOveruseDieselOil: {
                ...state.createOveruseDieselOil,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.createOveruseDieselOil.create_overuseDieselOil_waiting)]: (state, action) => {
        return {
            ...initialState,
            createOveruseDieselOil: {
                ...initialState.createOveruseDieselOil,
                isResultStatus: 1
            }
        }
    }
}, initialState)