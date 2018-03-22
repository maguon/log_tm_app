import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        repairStationList: []
    },
    getRepairStationList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [(actionTypes.selectRepairStationTypes.get_selectRepairStationList_success)]: (state, action) => {
        const { payload: { repairStationList } } = action
        return {
            ...state,
            data: {
                repairStationList
            },
            getRepairStationList: {
                ...initialState.getRepairStationList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.selectRepairStationTypes.get_selectRepairStationList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRepairStationList: {
                ...initialState.getRepairStationList,
                isResultStatus: 3,
                failedMsg
            }
        }
    },
    [(actionTypes.selectRepairStationTypes.get_selectRepairStationList_waiting)]: (state, action) => {
        return {
            ...state,
            getRepairStationList: {
                ...initialState.getRepairStationList,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.selectRepairStationTypes.get_selectRepairStationList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action 
        return {
            ...state,
            getRepairStationList: {
                ...initialState.getRepairStationList,
                isResultStatus: 4,
                errorMsg
            }
        }
    }
}, initialState)