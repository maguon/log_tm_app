import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    data: {
        accidentList: []
    },
    getAccidentListForInsure: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.accidentIndemnifyDetail.get_accidentListForInsure_success)]: (state, action) => {
        const { payload: { accidentList } } = action
        return {
            ...state,
            data: {
                accidentList
            },
            getAccidentListForInsure: {
                ...state.getAccidentListForInsure,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentIndemnifyDetail.get_accidentListForInsure_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentListForInsure: {
                ...state.getAccidentListForInsure,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.accidentIndemnifyDetail.get_accidentListForInsure_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAccidentListForInsure: {
                ...state.getAccidentListForInsure,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.accidentIndemnifyDetail.get_accidentListForInsure_waiting)]: (state, action) => {
        return {
            ...initialState,
            getAccidentListForInsure: {
                ...initialState.getAccidentListForInsure,
                isResultStatus: 1
            }
        }
    }
}, initialState)