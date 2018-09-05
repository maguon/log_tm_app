import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actions/actionTypes'

const initialState = {
    data: {
        repairStationOptionalList: []
    },
    getRepairStationOptionalList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.repairStationOptionalList.get_repairStationOptionalList_success]: (state, action) => {
        const { payload: { repairStationOptionalList } } = action
        return {
            data: {
                repairStationOptionalList
            },
            getRepairStationOptionalList: {
                ...state.getRepairStationOptionalList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.repairStationOptionalList.get_repairStationOptionalList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRepairStationOptionalList: {
                ...state.getRepairStationOptionalList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.repairStationOptionalList.get_repairStationOptionalList_waiting]: (state, action) => {
        return {
            ...state,
            getRepairStationOptionalList: {
                ...state.getRepairStationOptionalList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.repairStationOptionalList.get_repairStationOptionalList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRepairStationOptionalList: {
                ...state.getRepairStationOptionalList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)