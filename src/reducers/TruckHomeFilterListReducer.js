import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


const initialState = {
    data: {
        truckList:[]
    },
    getTruckHomeFilterList: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [(actionTypes.truckHomeFilterListTypes.GET_TruckHomeFilterList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckList: data
            },
            getTruckHomeFilterList: {
                ...state.getTruckHomeFilterList,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckHomeFilterListTypes.GET_TruckHomeFilterList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckHomeFilterList: {
                ...state.getTruckHomeFilterList,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckHomeFilterListTypes.GET_TruckHomeFilterList_WAITING)]: (state, action) => {
        return {
            ...state,
            getTruckHomeFilterList: {
                ...state.getTruckHomeFilterList,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckHomeFilterListTypes.GET_TruckHomeFilterList_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
             ...state,
            getTruckHomeFilterList: {
                ...state.getTruckHomeFilterList,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckHomeFilterListTypes.GET_TruckHomeFilterList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckHomeFilterList: {
                ...state.getTruckHomeFilterList,
                isResultStatus: 1,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckHomeFilterListTypes.RESET_GET_TruckHomeFilterList)]: (state, action) => {
        return {
            ...state,
            getTruckHomeFilterList: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    }
}, initialState)