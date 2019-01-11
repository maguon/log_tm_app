import * as httpRequest from '../util/HttpRequest'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { sleep } from '../util/util'
import { getFormValues } from 'redux-form'
import { Actions } from 'react-native-router-flux'
import { ToastAndroid } from 'react-native'
import requestHeaders from '../util/RequestHeaders'
import localStorageKey from '../util/LocalStorageKey'
import localStorage from '../util/LocalStorage'
import * as communicationSettingActions from '../android/complatedViews/communicationSetting/communicationSettingActions'

//登录
export const login = (tryCount = 1) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.loginTypes.login_waiting, payload: {} })
    const { mobile, password, server } = getFormValues('loginForm')(getState())
    const base_host =`http://api.${server}/api`
    try {
        // const { communicationSettingReducer: { data: { base_host } } } = getState()
        // console.log('base_host', base_host)
        const url = `${base_host}/userLogin`
        const res = await httpRequest.post(url, {
            mobile: mobile,
            password
        })
        // console.log('res', res)
        if (res.success) {
            if (res.result.type == 11 || res.result.type == 19) {
                const getUserInfoUrl = `${base_host}/user?${ObjectToUrl({ userId: res.result.userId })}`
                const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
                if (getUserInfoRes.success) {
                    const { uid, mobile, real_name, type, gender, avatar_image, status } = getUserInfoRes.result[0]
                    const user = {
                        uid, mobile, real_name, type, gender, avatar_image, status,
                        token: res.result.accessToken,
                    }
                    requestHeaders.set('auth-token', res.result.accessToken)
                    requestHeaders.set('user-type', type)
                    requestHeaders.set('user-name', mobile)
                    localStorage.save({
                        key: localStorageKey.USER,
                        data: user
                    })
                    await dispatch(communicationSettingActions.saveCommunicationSetting({ url: server }))
                    await dispatch({ type: actionTypes.loginTypes.login_success, payload: { user } })
                    Actions.main()
                } else {
                    ToastAndroid.show(`登陆失败：无法获取用户信息！`, 10)
                    dispatch({ type: actionTypes.loginTypes.login_failed, payload: { failedMsg: '无法获取用户信息！' } })
                }
            }
            else {
                ToastAndroid.show(`登陆失败：身份错误！`, 10)
                dispatch({ type: actionTypes.loginTypes.login_failed, payload: { failedMsg: '身份错误！' } })
            }
        } else {
            //登录失败重新登录
            ToastAndroid.show(`登陆失败：${res.msg}`, 10)
            dispatch({ type: actionTypes.loginTypes.login_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        if (err.message == 'Network request failed') {
            //尝试20次
            // if (tryCount < 20) {
            //     await sleep(1000)
            //     dispatch(login(tryCount + 1))
            // } else {
                ToastAndroid.show(`登陆失败：网络链接失败！`, 10)
                dispatch({ type: actionTypes.loginTypes.login_error, payload: { errorMsg: err } })
            // }
        } else {
            ToastAndroid.show(`登陆失败：${err}`, 10)
            dispatch({ type: actionTypes.loginTypes.login_error, payload: { errorMsg: err } })
        }
    }

}

export const cleanLogin = () => (dispatch, getState) => {
    const { loginReducer: { data: { user: { mobile } } } } = getState()
    localStorage.save({
        key: localStorageKey.USER,
        data: { mobile }
    })
    dispatch({ type: actionTypes.loginTypes.Set_UserInfo, payload: { user: { mobile } } })
    // Actions.popTo('main')
}