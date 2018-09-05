import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    data: {
        dpRouteTask: null
    },
    getDpRouteTaskForAccidentEditor: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    modifyAccident: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.accidentEditor.get_dpRouteTaskForAccidentEditor_success)]: (state, action) => {
        const { payload: { dpRouteTask } } = action
        return {
            ...state,
            data: {
                dpRouteTask
            },
            getDpRouteTaskForAccidentEditor: {
                ...state.getDpRouteTaskForAccidentEditor,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentEditor.get_dpRouteTaskForAccidentEditor_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDpRouteTaskForAccidentEditor: {
                ...state.getDpRouteTaskForAccidentEditor,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.accidentEditor.get_dpRouteTaskForAccidentEditor_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDpRouteTaskForAccidentEditor: {
                ...state.getDpRouteTaskForAccidentEditor,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.accidentEditor.get_dpRouteTaskForAccidentEditor_waiting)]: (state, action) => {
        return {
            ...initialState,
            getDpRouteTaskForAccidentEditor: {
                ...initialState.getDpRouteTaskForAccidentEditor,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.accidentEditor.modify_accident_success]: (state, action) => {
        return {
            ...state,
            modifyAccident: {
                ...initialState.modifyAccident,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.accidentEditor.modify_accident_waiting]: (state, action) => {
        return {
            ...state,
            modifyAccident: {
                ...initialState.modifyAccident,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.accidentEditor.modify_accident_failed]: (state, action) => {
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
    [actionTypes.accidentEditor.modify_accident_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            modifyAccident: {
                ...initialState.modifyAccident,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)