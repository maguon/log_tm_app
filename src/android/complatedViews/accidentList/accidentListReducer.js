import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    data: {
        accidentList: [],
        search: null,
        isComplete: false
    },
    getAccidentList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getAccidentListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.accidentList.get_accidentList_success)]: (state, action) => {
        const { payload: { accidentList, isComplete, search } } = action
        return {
            ...state,
            data: {
                accidentList,
                isComplete,
                search
            },
            getAccidentList: {
                ...state.getAccidentList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentList.get_accidentList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentList: {
                ...state.getAccidentList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.accidentList.get_accidentList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAccidentList: {
                ...state.getAccidentList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.accidentList.get_accidentList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getAccidentList: {
                ...initialState.getAccidentList,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.accidentList.get_accidentListMore_success]: (state, action) => {
        const { payload: { accidentList, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                accidentList: [...state.data.accidentList, ...accidentList],
                isComplete
            },
            getAccidentListMore: {
                ...initialState.getAccidentListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.accidentList.get_accidentListMore_waiting]: (state, action) => {
        return {
            ...state,
            getAccidentListMore: {
                ...initialState.getAccidentListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.accidentList.get_accidentListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentListMore: {
                ...initialState.getAccidentListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.accidentList.get_accidentListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAccidentListMore: {
                ...initialState.getAccidentListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    // [actionTypes.accidentList.clean_peccancyList]: (state, action) => {
    //     return {
    //         ...initialState
    //     }
    // },


    [actionTypes.accidentList.modify_accidentForAccidentList]: (state, action) => {
        const { payload: { accident } } = action
        return {
            ...state,
            data: {
                ...state.data,
                accidentList: state.data.accidentList.map(item => {
                    if (item.id == accident.accidentId) {
                        return {
                            ...item,
                            ...accident
                        }
                    } else {
                        return item
                    }
                })
            }
        }
    }
}, initialState)