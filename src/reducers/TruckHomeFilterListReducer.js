import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


const initialState = {
    data: {
        truckList:[],
        isComplete: false
    },
    getTruckHomeFilterList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getTruckHomeFilterListMore:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterList_success]: (state, action) => {
        const { payload: { truckList,isComplete } } = action
        return {
            ...state,
            data: {
                truckList
            },
            getTruckHomeFilterList: {
                ...initialState.getTruckHomeFilterList,
                isResultStatus: 2,
            }
        }
    },
    [actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTruckHomeFilterList: {
                ...initialState.getTruckHomeFilterList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterList_waiting]: (state, action) => {
        return {
            ...state,
            getTruckHomeFilterList: {
                ...initialState.getTruckHomeFilterList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTruckHomeFilterList: {
                ...initialState.getTruckHomeFilterList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterListMore_success]: (state, action) => {
        const { payload: { truckList, isComplete } } = action
        return {
            ...state,
            data: {
                truckList: [...state.data.truckList, ...truckList],
                isComplete
            },
            getTruckHomeFilterListMore: {
                ...initialState.getTruckHomeFilterListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterListMore_waiting]: (state, action) => {
        return {
            ...state,
            getTruckHomeFilterListMore: {
                ...initialState.getTruckHomeFilterListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTruckHomeFilterListMore: {
                ...initialState.getTruckHomeFilterListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTruckHomeFilterListMore: {
                ...initialState.getTruckHomeFilterListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
}, initialState)