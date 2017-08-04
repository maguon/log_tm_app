import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        makeList: []
    },
    getMakeList: {
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
    [(actionTypes.selectMakeTypes.GET_MakeList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                makeList: data
            },
            getMakeList: {
                ...state.getMakeList,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectMakeTypes.GET_MakeList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getMakeList: {
                ...state.getMakeList,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectMakeTypes.GET_MakeList_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getMakeList: {
                ...state.getMakeList,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectMakeTypes.GET_MakeList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getMakeList: {
                ...state.getMakeList,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectMakeTypes.GET_MakeList_WAITING)]: (state, action) => {
        return {
            ...state,
            getMakeList: {
                ...state.getMakeList,
                isExecStatus: 1
            }
        }
    }
}, initialState)