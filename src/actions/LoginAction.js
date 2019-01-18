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
import * as android_app from '../android_app.json'
import * as initializationActionTypes from '../actions/actionTypes/InitializationTypes'

//登录
export const login = (tryCount = 1) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.loginTypes.login_waiting, payload: {} })
    let { mobile, password, server } = getFormValues('loginForm')(getState())
    server = `${server}`.replace(/\s*/g, "")
    mobile = `${mobile}`.replace(/\s*/g, "")
    const base_host = `http://api.${server}/api`

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


//第一步：获取最新version信息
export const validateVersion = () => async (dispatch, getState) => {
    const currentStep = 1
    try {
        // console.log(getState())
        let { mobile, password, server } = getFormValues('loginForm')(getState())
        // console.log()
        server = `${server}`.replace(/\s*/g, "")
        mobile = `${mobile}`.replace(/\s*/g, "")

        // console.log('server', server)
        // console.log('mobile', mobile)

        const base_host = `http://api.${server}/api`
        console.log('base_host', base_host)
        // const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/app?${ObjectToUrl({ app: android_app.type, type: android_app.android })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res',res)
        if (res.success) {
            const data = {
                currentVersion: android_app.version,
                newestVersion: '',
                url: '',
                remark: '',
                force_update: 0
            }
            const currentVersionArr = android_app.version.split('.')
            let versionList = res.result
                .filter(item => {
                    const itemArr = item.version.split('.')
                    if (currentVersionArr[0] < itemArr[0]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] < itemArr[1]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] == itemArr[1] && currentVersionArr[2] < itemArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })

            if (versionList.length > 0) {
                if (versionList.some(item => item.force_update == 1)) {
                    data.force_update = 1
                } else {
                    data.force_update = 2
                }
                versionList = versionList.sort((a, b) => {
                    const aArr = a.version.split('.')
                    const bArr = b.version.split('.')
                    if (aArr[0] < bArr[0]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] < bArr[1]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] == bArr[1] && aArr[2] < bArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })
                data.newestVersion = versionList[0].version
                data.url = versionList[0].url
                data.remark = versionList[0].remark

            } else {
                data.force_update = 0
                data.newestVersion = data.currentVersion
            }
            dispatch({ type: initializationActionTypes.Valdate_Version_Success, payload: { data, step: currentStep } })
            if (data.force_update != 1) {
                dispatch(login())
            }
        } else {
            dispatch({ type: initializationActionTypes.Valdate_Version_Failed, payload: { failedMsg: res.msg, step: currentStep } })
        }
    } catch (err) {
        console.log('err',err)
        if (err.message == 'Network request failed') {
            //尝试20次
            // if (tryCount < 20) {
            //     await sleep(1000)
            //     dispatch(initApp(currentStep, tryCount + 1))
            // } else {
            ToastAndroid.show(`登陆失败：网络链接失败！`, 10)
            dispatch({ type: initializationActionTypes.Valdate_Version_NetWorkError, payload: { step: currentStep } })
            // }
        } else {
            dispatch({ type: initializationActionTypes.Valdate_Version_Error, payload: { errorMsg: err.message, step: currentStep } })
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