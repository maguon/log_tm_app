import { handleActions } from 'redux-actions'
import actionTypes from '../actions/actionTypes'
import reducerTemplate from './ReducerTemplate'

const initialState = {
    data: {
        operateTypeCount: {
            zCount: 0,
            gCount: 0,
            cCount: 0,
            wCount: 0
        },
        waitingInspectCount: 0
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
    }
}

const operateTypeCount = reducerTemplate(actionTypes.homeActionTypes.operateTypeCount, 'operateTypeCount')
const waitingInspectCount = reducerTemplate(actionTypes.homeActionTypes.waitingInspectCount, 'waitingInspectCount')

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    ...operateTypeCount,
    [(actionTypes.homeActionTypes.operateTypeCount.SUCCESS)]: (state, action) => {
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
    ...waitingInspectCount,
    [(actionTypes.homeActionTypes.waitingInspectCount.SUCCESS)]: (state, action) => {
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
                isExecStatus: 0
            }
        }
    }
}, initialState)