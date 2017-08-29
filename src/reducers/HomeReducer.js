import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        operateTypeCount: {
            zCount: 0,
            gCount: 0,
            cCount: 0,
            wCount: 0
        },
        waitingInspectCount: 0,
        truckRepairRelCount:0
    },
    operateTypeCount: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    waitingInspectCount: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getTruckRepairRelCount:{
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
    [(actionTypes.homeTypes.GET_OperateTypeCount_SUCCESS)]: (state, action) => {
        
        const { payload: { data } } = action
        let operateTypeCount = {
            zCount: 0,
            wCount: 0,
            gCount: 0,
            cCount: 0
        }
        data.forEach((item) => {
            if (item.operate_type == 1) {
                operateTypeCount.zCount = item.truck_count
            }
            if (item.operate_type == 2) {
                operateTypeCount.wCount = item.truck_count
            }
            if (item.operate_type == 3) {
                operateTypeCount.gCount = item.truck_count
            }
            if (item.operate_type == 4) {
                operateTypeCount.cCount = item.truck_count
            }
        })
        return {
            ...state,
            data: {
                ...state.data,
                operateTypeCount
            },
            operateTypeCount: {
                ...state.operateTypeCount,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.GET_OperateTypeCount_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            operateTypeCount: {
                ...state.operateTypeCount,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.GET_OperateTypeCount_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            operateTypeCount: {
                ...state.operateTypeCount,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.GET_OperateTypeCount_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            operateTypeCount: {
                ...state.operateTypeCount,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.GET_OperateTypeCount_WAITING)]: (state, action) => {
        return {
            ...state,
            operateTypeCount: {
                ...state.operateTypeCount,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.homeTypes.RESET_GET_OperateTypeCount)]: (state, action) => {
  
        return {
            ...state,
            operateTypeCount: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.homeTypes.GET_WaitingInspectCount_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                waitingInspectCount: data[0].driving_count
            },
            waitingInspectCount: {
                ...state.waitingInspectCount,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.GET_WaitingInspectCount_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            waitingInspectCount: {
                ...state.waitingInspectCount,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.GET_WaitingInspectCount_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            waitingInspectCount: {
                ...state.waitingInspectCount,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.GET_WaitingInspectCount_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            waitingInspectCount: {
                ...state.waitingInspectCount,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.GET_WaitingInspectCount_WAITING)]: (state, action) => {
        return {
            ...state,
            waitingInspectCount: {
                ...state.waitingInspectCount,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.homeTypes.RESET_GET_WaitingInspectCount)]: (state, action) => {      
        return {
            ...state,
            waitingInspectCount: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.homeTypes.GET_TruckRepairRelCount_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckRepairRelCount: data[0].repair_count
            },
            getTruckRepairRelCount: {
                ...state.getTruckRepairRelCount,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.GET_TruckRepairRelCount_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckRepairRelCount: {
                ...state.getTruckRepairRelCount,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.GET_TruckRepairRelCount_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckRepairRelCount: {
                ...state.getTruckRepairRelCount,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.GET_TruckRepairRelCount_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckRepairRelCount: {
                ...state.getTruckRepairRelCount,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.GET_TruckRepairRelCount_WAITING)]: (state, action) => {
        return {
            ...state,
            getTruckRepairRelCount: {
                ...state.getTruckRepairRelCount,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.homeTypes.RESET_GET_TruckRepairRelCount)]: (state, action) => {      
        return {
            ...state,
            getTruckRepairRelCount: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    }


}, initialState)