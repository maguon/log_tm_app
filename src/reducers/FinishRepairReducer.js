import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    finishRepair: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [(actionTypes.finishRepairTypes.finish_Repair_success)]: (state, action) => {
        return {
            ...state,
            finishRepair: {
                ...initialState.finishRepair,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.finishRepairTypes.finish_Repair_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            finishRepair: {
                ...initialState.finishRepair,
                isResultStatus: 3,
                failedMsg
            }
        }
    },
    [(actionTypes.finishRepairTypes.finish_Repair_waiting)]: (state, action) => {
        return {
            ...state,
            finishRepair: {
                ...initialState.finishRepair,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.finishRepairTypes.finish_Repair_error)]: (state, action) => {
        const { payload: { errorMsg } } = action 
        return {
            ...state,
            finishRepair: {
                ...initialState.finishRepair,
                isResultStatus: 4,
                errorMsg
            }
        }
    }
}, initialState)