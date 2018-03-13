import httpRequest from '../util/HttpRequest'
import { base_host, record_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getUserInfo = param => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user?userId=${uid}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.settingTypes.get_userInfo_success, payload: { userInfo: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.settingTypes.get_userInfo_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.settingTypes.get_userInfo_error, payload: { errorMsg: err } })
    }
}

export const getUserInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.settingTypes.get_userInfo_waiting, payload: {} })
}