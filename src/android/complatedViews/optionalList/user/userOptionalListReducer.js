import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actions/actionTypes'

const initialState = {
    data: {
        userOptionalList: []
    },
    getUserOptionalList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.userOptionalList.get_userOptionalList_success]: (state, action) => {
        const { payload: { userOptionalList } } = action
        return {
            data: {
                userOptionalList
            },
            getUserOptionalList: {
                ...state.getUserOptionalList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.userOptionalList.get_userOptionalList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getUserOptionalList: {
                ...state.getUserOptionalList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.userOptionalList.get_userOptionalList_waiting]: (state, action) => {
        return {
            ...state,
            getUserOptionalList: {
                ...state.getUserOptionalList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.userOptionalList.get_userOptionalList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getUserOptionalList: {
                ...state.getUserOptionalList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)