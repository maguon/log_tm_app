import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data:{
        truckId:null,
        truckNum:null
    },
    bindTruck:{
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    unBindTruck:{
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
    [(actionTypes.addDriverSecondTypes.CREATE_DriverSecondBindTruck_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                truckId: data.truckId,
                truckNum: data.truckNum
            },
            bindTruck: {
                ...state.bindTruck,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverSecondTypes.CREATE_DriverSecondBindTruck_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindTruck: {
                ...state.bindTruck,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverSecondTypes.CREATE_DriverSecondBindTruck_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindTruck: {
                ...state.bindTruck,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverSecondTypes.CREATE_DriverSecondBindTruck_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindTruck: {
                ...state.bindTruck,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverSecondTypes.CREATE_DriverSecondBindTruck_WAITING)]: (state, action) => {
        return {
            ...state,
            bindTruck: {
                ...state.bindTruck,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addDriverSecondTypes.RESET_CREATE_DriverSecondBindTruck)]: (state, action) => {
        return {
            ...state,
            bindTruck: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.addDriverSecondTypes.CREATE_DriverSecondUnBindTruck_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                bindDriverId: null,
                bindDriver: null
            },
            unBindDriver: {
                ...state.unBindDriver,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverSecondTypes.CREATE_DriverSecondUnBindTruck_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindTruck: {
                ...state.unBindTruck,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverSecondTypes.CREATE_DriverSecondUnBindTruck_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindTruck: {
                ...state.unBindTruck,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverSecondTypes.CREATE_DriverSecondUnBindTruck_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindTruck: {
                ...state.unBindTruck,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverSecondTypes.CREATE_DriverSecondUnBindTruck_WAITING)]: (state, action) => {
        return {
            ...state,
            unBindTruck: {
                ...state.unBindTruck,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addDriverSecondTypes.RESET_CREATE_DriverSecondUnBindTruck)]: (state, action) => {
        return {
            ...state,
            unBindTruck: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.addDriverSecondTypes.CLEAN_AddDriverSecondReducer)]: (state, action) => {
        const { payload: { data } } = action
        return {
            data: {
                truckId: null,
                truckNum: null
            },
            bindTruck: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            },
            unBindTruck: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    }

}, initialState)