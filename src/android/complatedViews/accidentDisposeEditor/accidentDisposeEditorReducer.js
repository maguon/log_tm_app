import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    modifyAccidentDispose: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    finishAccidentDispose: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.accidentDisposeEditor.modify_accidentDispose_success)]: (state, action) => {
        return {
            ...state,
            modifyAccidentDispose: {
                ...state.modifyAccidentDispose,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentDisposeEditor.modify_accidentDispose_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            modifyAccidentDispose: {
                ...state.modifyAccidentDispose,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.accidentDisposeEditor.modify_accidentDispose_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            modifyAccidentDispose: {
                ...state.modifyAccidentDispose,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.accidentDisposeEditor.modify_accidentDispose_waiting)]: (state, action) => {
        return {
            ...initialState,
            modifyAccidentDispose: {
                ...initialState.modifyAccidentDispose,
                isResultStatus: 1
            }
        }
    },


    [(actionTypes.accidentDisposeEditor.finish_accidentDispose_success)]: (state, action) => {
        return {
            ...state,
            finishAccidentDispose: {
                ...state.finishAccidentDispose,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentDisposeEditor.finish_accidentDispose_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            finishAccidentDispose: {
                ...state.finishAccidentDispose,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.accidentDisposeEditor.finish_accidentDispose_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            finishAccidentDispose: {
                ...state.finishAccidentDispose,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.accidentDisposeEditor.finish_accidentDispose_waiting)]: (state, action) => {
        return {
            ...initialState,
            finishAccidentDispose: {
                ...initialState.finishAccidentDispose,
                isResultStatus: 1
            }
        }
    }



}, initialState)