import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        tractorList: [],
        trailerList: []
    },
    getTruckList: {
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
    [(actionTypes.selectTruckTypes.GET_TruckList_SUCCESS)]: (state, action) => {
        const { payload: { data, type } } = action
        let ReturnValue
        if (type === 1) {
            ReturnValue = {
                ...state,
                data: {
                    ...state.data,
                    truckList: data
                },
                getTruckList: {
                    ...state.getTruckList,
                    isResultStatus: 0,
                    isExecStatus: 2
                }
            }
        } else if (type === 2) {
            ReturnValue = {
                ...state,
                data: {
                    ...state.data,
                    trailerList: data
                },
                getTruckList: {
                    ...state.getTruckList,
                    isResultStatus: 0,
                    isExecStatus: 2
                }
            }
        }
        return ReturnValue
    },
    [(actionTypes.selectTruckTypes.GET_TruckList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckList: {
                ...state.getTruckList,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectTruckTypes.GET_TruckList_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckList: {
                ...state.getTruckList,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectTruckTypes.GET_TruckList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckList: {
                ...state.getTruckList,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectTruckTypes.GET_TruckList_WAITING)]: (state, action) => {
        return {
            ...state,
            getTruckList: {
                ...state.getTruckList,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.selectTruckTypes.RESET_GET_TruckList)]: (state, action) => {

        return {
            ...state,
            getTruckList: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    }

}, initialState)