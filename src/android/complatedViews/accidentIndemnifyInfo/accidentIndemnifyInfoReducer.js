import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    data: {
        accidentInsureLoan: null
    },
    getAccidentInsureLoan: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.accidentIndemnifyInfo.get_accidentInsureLoan_success)]: (state, action) => {
        const { payload: { accidentInsureLoan } } = action
        return {
            ...state,
            data: {
                accidentInsureLoan
            },
            getAccidentInsureLoan: {
                ...state.getAccidentInsureLoan,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentIndemnifyInfo.get_accidentInsureLoan_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentInsureLoan: {
                ...state.getAccidentInsureLoan,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.accidentIndemnifyInfo.get_accidentInsureLoan_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAccidentInsureLoan: {
                ...state.getAccidentInsureLoan,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.accidentIndemnifyInfo.get_accidentInsureLoan_waiting)]: (state, action) => {
        return {
            ...initialState,
            getAccidentInsureLoan: {
                ...initialState.getAccidentInsureLoan,
                isResultStatus: 1
            }
        }
    }
}, initialState)