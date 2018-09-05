import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    data: {
        accidentDisposeInfo: null,
    },
    getAccidentDisposeInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.accidentInfo.get_accidentDisposeInfo_success)]: (state, action) => {
        const { payload: { accidentDisposeInfo } } = action
        return {
            ...state,
            data: {
                accidentDisposeInfo: accidentDisposeInfo
            },
            getAccidentDisposeInfo: {
                ...state.getAccidentDisposeInfo,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentInfo.get_accidentDisposeInfo_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentDisposeInfo: {
                ...state.getAccidentDisposeInfo,
                failedMsg,
                isResultStatus: 4
            }
        }
    },
    [(actionTypes.accidentInfo.get_accidentDisposeInfo_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAccidentDisposeInfo: {
                ...state.getAccidentDisposeInfo,
                errorMsg,
                isResultStatus: 3
            }
        }
    },
    [(actionTypes.accidentInfo.get_accidentDisposeInfo_waiting)]: (state, action) => {
        return {
            ...state,
            getAccidentDisposeInfo: {
                ...state.getAccidentDisposeInfo,
                isResultStatus: 1
            }
        }
    }
}, initialState)