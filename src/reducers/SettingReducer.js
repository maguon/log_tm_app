import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        userInfo: {}
    },
    getUserInfo: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

export default handleActions({
    [actionTypes.settingTypes.get_userInfo_success]: (state, action) => {
        const { payload: { userInfo } } = action
        return {
            ...state,
            data: {
                userInfo
            },
            getUserInfo: {
                ...initialState.getUserInfo,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.settingTypes.get_userInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getUserInfo: {
                ...initialState.getUserInfo,
                isResultStatus: 4,
                failedMsg
            }

        }
    },
    [actionTypes.settingTypes.get_userInfo_waiting]: (state, action) => {
        return {
            ...state,
            getUserInfo: {
                ...initialState.getUserInfo,
                isResultStatus: 1
            }

        }
    },
    [actionTypes.settingTypes.get_userInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getUserInfo: {
                ...initialState.getUserInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)