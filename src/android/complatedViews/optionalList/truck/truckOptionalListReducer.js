import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actions/actionTypes'

const initialState = {
    data: {
        truckOptionalList: []
    },
    getTruckOptionalList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.truckOptionalList.get_truckOptionalList_success]: (state, action) => {
        const { payload: { truckOptionalList } } = action
        return {
            data: {
                truckOptionalList
            },
            getTruckOptionalList: {
                ...state.getTruckOptionalList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.truckOptionalList.get_truckOptionalList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTruckOptionalList: {
                ...state.getTruckOptionalList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.truckOptionalList.get_truckOptionalList_waiting]: (state, action) => {
        return {
            ...state,
            getTruckOptionalList: {
                ...state.getTruckOptionalList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.truckOptionalList.get_truckOptionalList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTruckOptionalList: {
                ...state.getTruckOptionalList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)