import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    data: {
        accidentRepairList: [],
        // search: null,
        isComplete: false
    },
    getAccidentRepairList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    createAccidentRepair: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.accidentRepairList.get_accidentRepairList_success)]: (state, action) => {
        const { payload: { accidentRepairList, isComplete } } = action
        return {
            ...state,
            data: {
                accidentRepairList,
                isComplete
            },
            getAccidentRepairList: {
                ...state.getAccidentRepairList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentRepairList.get_accidentRepairList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentRepairList: {
                ...state.getAccidentRepairList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.accidentRepairList.get_accidentRepairList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAccidentRepairList: {
                ...state.getAccidentRepairList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.accidentRepairList.get_accidentRepairList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getAccidentRepairList: {
                ...initialState.getAccidentRepairList,
                isResultStatus: 1
            }
        }
    },



    [(actionTypes.accidentRepairList.create_accidentRepair_success)]: (state, action) => {
        return {
            ...state,
            createAccidentRepair: {
                ...state.createAccidentRepair,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentRepairList.create_accidentRepair_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            createAccidentRepair: {
                ...state.createAccidentRepair,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.accidentRepairList.create_accidentRepair_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            createAccidentRepair: {
                ...state.createAccidentRepair,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.accidentRepairList.create_accidentRepair_waiting)]: (state, action) => {
        return {
            ...initialState,
            createAccidentRepair: {
                ...initialState.createAccidentRepair,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.accidentRepairList.modify_accidentRepairForList]: (state, action) => {
        const { payload: { accidentRepair, accidentRepairId } } = action
        return {
            ...state,
            data: {
                ...state.data,
                accidentRepairList: state.data.accidentRepairList.map(item => {
                    if (item.id == accidentRepairId) {
                        return {
                            ...item,
                            ...accidentRepair
                        }
                    } else {
                        return item
                    }
                })
            }
        }
    }
}, initialState)