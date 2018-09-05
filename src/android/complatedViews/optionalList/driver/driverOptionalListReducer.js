import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actions/actionTypes'

const initialState = {
    data: {
        driverOptionalList: []
    },
    getDriverOptionalList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.driverOptionalList.get_driverOptionalList_success]: (state, action) => {
        const { payload: { driverOptionalList } } = action
        return {
            data: {
                driverOptionalList
            },
            getDriverOptionalList: {
                ...state.getDriverOptionalList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.driverOptionalList.get_driverOptionalList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDriverOptionalList: {
                ...state.getDriverOptionalList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.driverOptionalList.get_driverOptionalList_waiting]: (state, action) => {
        return {
            ...state,
            getDriverOptionalList: {
                ...state.getDriverOptionalList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.driverOptionalList.get_driverOptionalList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDriverOptionalList: {
                ...state.getDriverOptionalList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)