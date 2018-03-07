import { handleActions } from 'redux-actions'
import * as updatePasswordActionTypes from './UpdatePasswordActionTypes'

const initialState = {
    updatePassword: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [updatePasswordActionTypes.change_Password_success]: (state, action) => {
        return {
            ...state,
            updatePassword: {
                ...initialState.updatePassword,
                isResultStatus: 2
            }
        }
    },
    [updatePasswordActionTypes.change_Password_waiting]: (state, action) => {
        return {
            ...state,
            updatePassword: {
                ...initialState.updatePassword,
                isResultStatus: 1,
            }
        }
    },
    [updatePasswordActionTypes.change_Password_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            updatePassword: {
                ...initialState.updatePassword,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [updatePasswordActionTypes.change_Password_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updatePassword: {
                ...initialState.updatePassword,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)