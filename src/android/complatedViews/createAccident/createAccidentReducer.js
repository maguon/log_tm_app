import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    data: {
        accidentId: 0,
        status: 0,
        vheNo: null
    },
    createAccident: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    modifyAccident: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }

}

export default handleActions({
    [(actionTypes.createAccident.create_accident_success)]: (state, action) => {
        const { payload: { accidentId, vheNo } } = action
        return {
            ...state,
            data: {
                accidentId,
                vheNo,
                status: 1
            },
            createAccident: {
                ...state.createAccident,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.createAccident.create_accident_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            createAccident: {
                ...state.createAccident,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.createAccident.create_accident_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            createAccident: {
                ...state.createAccident,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.createAccident.create_accident_waiting)]: (state, action) => {
        return {
            ...initialState,
            createAccident: {
                ...initialState.createAccident,
                isResultStatus: 1
            }
        }
    },






    [actionTypes.createAccident.modify_infoForCreateAccident_success]: (state, action) => {
        return {
            ...state,
            modifyAccident: {
                ...initialState.modifyAccident,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.createAccident.modify_infoForCreateAccident_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            modifyAccident: {
                ...initialState.modifyAccident,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.createAccident.modify_infoForCreateAccident_waiting]: (state, action) => {
        return {
            ...state,
            modifyAccident: {
                ...initialState.modifyAccident,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.createAccident.modify_infoForCreateAccident_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            modifyAccident: {
                ...initialState.modifyAccident,
                isResultStatus: 3,
                errorMsg
            }
        }
    },




    [actionTypes.createAccident.clean_infoForCreateAccident]: (state, action) => {
        return {
            ...initialState
        }
    },


    [actionTypes.createAccident.change_createAccidentStatus]: (state, action) => {
        const { payload: { accidentId, status, vheNo } } = action
        return {
            ...initialState,
            data: {
                accidentId, status, vheNo
            }
        }
    }
}, initialState)