import httpRequest from '../util/HttpRequest'
import { base_host, record_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getUserInfo = param => async (dispatch, getState) => {
    console.log('getState()', getState())
    try {
        const { userReducer: { user: { userId } } } = getState()
        const url = `${base_host}/user?userId=${userId}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
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