import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data:{
        driverInfo:{},
        driverId:''
    },
    createDriverFirst:{
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
    [(actionTypes.addDriverFirstTypes.CREATE_Driver_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                driverId: data
            },
            createDriverFirst: {
                ...state.createDriverFirst,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverFirstTypes.CREATE_Driver_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createDriverFirst: {
                ...state.createDriverFirst,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverFirstTypes.CREATE_Driver_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createDriverFirst: {
                ...state.createDriverFirst,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverFirstTypes.CREATE_Driver_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createDriverFirst: {
                ...state.createDriverFirst,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverFirstTypes.CREATE_Driver_WAITING)]: (state, action) => {
        return {
            ...state,
            createDriverFirst: {
                ...state.createDriverFirst,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addDriverFirstTypes.RESET_CREATE_Driver)]: (state, action) => {
        return {
            ...state,
            createDriverFirst: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },
    [(actionTypes.addDriverFirstTypes.CHANGE_Driver_FIELD)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                driverInfo: {
                    ...state.data.driverInfo,
                    ...data
                }
            }
        }
    },

}, initialState)