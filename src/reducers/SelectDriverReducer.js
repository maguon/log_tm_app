import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        driverList: []
    },
    getDriverList: {
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
    [(actionTypes.selectDriverTypes.GET_SeletcDriverList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                driverList: data
            },
            getDriverList: {
                ...state.getDriverList,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectDriverTypes.GET_SeletcDriverList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverList: {
                ...state.getDriverList,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectDriverTypes.GET_SeletcDriverList_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverList: {
                ...state.getDriverList,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectDriverTypes.GET_SeletcDriverList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverList: {
                ...state.getDriverList,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectDriverTypes.GET_SeletcDriverList_WAITING)]: (state, action) => {
        return {
            ...state,
            getDriverList: {
                ...state.getDriverList,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.selectDriverTypes.RESET_GET_SeletcDriverList)]: (state, action) => {
        return {
            ...state,
            getDriverList: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    }
}, initialState)