import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    modifyAccidentIndemnify: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [actionTypes.accidentIndemnifyEditor.modify_accidentIndemnify_success]: (state, action) => {
        return {
            ...state,
            modifyAccidentIndemnify: {
                ...initialState.modifyAccidentIndemnify,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.accidentIndemnifyEditor.modify_accidentIndemnify_waiting]: (state, action) => {
        return {
            ...state,
            modifyAccidentIndemnify: {
                ...initialState.modifyAccidentIndemnify,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.accidentIndemnifyEditor.modify_accidentIndemnify_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            modifyAccidentIndemnify: {
                ...initialState.modifyAccidentIndemnify,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.accidentIndemnifyEditor.modify_accidentIndemnify_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            modifyAccidentIndemnify: {
                ...initialState.modifyAccidentIndemnify,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [actionTypes.accidentIndemnifyEditor.modify_accidentIndemnify_success]: (state, action) => {
        return {
            ...state,
            modifyAccidentIndemnify: {
                ...initialState.modifyAccidentIndemnify,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.accidentIndemnifyEditor.modify_accidentIndemnify_waiting]: (state, action) => {
        return {
            ...state,
            modifyAccidentIndemnify: {
                ...initialState.modifyAccidentIndemnify,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.accidentIndemnifyEditor.modify_accidentIndemnify_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            modifyAccidentIndemnify: {
                ...initialState.modifyAccidentIndemnify,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.accidentIndemnifyEditor.modify_accidentIndemnify_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            modifyAccidentIndemnify: {
                ...initialState.modifyAccidentIndemnify,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)