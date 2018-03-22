import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    modifyRepairInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [(actionTypes.repairEditorTypes.modify_RepairInfo_success)]: (state, action) => {
        return {
            ...state,
            modifyRepairInfo: {
                ...initialState.modifyRepairInfo,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.repairEditorTypes.modify_RepairInfo_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            modifyRepairInfo: {
                ...initialState.modifyRepairInfo,
                isResultStatus: 3,
                failedMsg
            }
        }
    },
    [(actionTypes.repairEditorTypes.modify_RepairInfo_waiting)]: (state, action) => {
        return {
            ...state,
            modifyRepairInfo: {
                ...initialState.modifyRepairInfo,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.repairEditorTypes.modify_RepairInfo_rror)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            modifyRepairInfo: {
                ...initialState.modifyRepairInfo,
                isResultStatus: 4,
                errorMsg
            }
        }
    }
}, initialState)