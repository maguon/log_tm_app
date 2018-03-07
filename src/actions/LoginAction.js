import * as httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from './actionTypes'
// import * as loginActionTypes from './LoginActionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { getFormValues, blur } from 'redux-form'
import { Actions } from 'react-native-router-flux'
import { ToastAndroid } from 'react-native'
import requestHeaders from '../util/RequestHeaders'
import localStorageKey from '../util/LocalStorageKey'
import localStorage from '../util/LocalStorage'

//登录
export const login = (tryCount = 1) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.loginTypes.login_waiting, payload: {} })
    const { mobile, password } = getFormValues('loginForm')(getState())
    try {
        const url = `${base_host}/userLogin`
        const res = await httpRequest.post(url, {
            mobile: mobile,
            password
        })
        if (res.success) {
            if (res.result.type == 11 || res.result.type == 19) {
                const getUserInfoUrl = `${base_host}/user${ObjectToUrl({ userId: res.result.userId })}`
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
                    dispatch({ type: actionTypes.loginTypes.login_success, payload: { user } })
                    Actions.main()
                } else {
                    ToastAndroid.showWithGravity(`登陆失败：无法获取用户信息！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.loginTypes.login_failed, payload: { failedMsg: '无法获取用户信息！' } })
                }
            }
            else {
                ToastAndroid.showWithGravity(`登陆失败：身份错误！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.loginTypes.login_failed, payload: { failedMsg: '身份错误！' } })
            }
        } else {
            //登录失败重新登录
            ToastAndroid.showWithGravity(`登陆失败：${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.loginTypes.login_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        if (err.message == 'Network request failed') {
            //尝试20次
            if (tryCount < 20) {
                await sleep(1000)
                dispatch(login(tryCount + 1))
            } else {
                ToastAndroid.showWithGravity(`登陆失败：网络链接失败！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.loginTypes.login_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.showWithGravity(`登陆失败：${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
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

    dispatch({ type: loginActionTypes.Set_UserInfo, payload: { user: { mobile } } })
   // Actions.popTo('main')
}




// import * as actionTypes from './actionTypes'
// import httpRequest from '../util/HttpRequest.js'
// import localStorageKey from '../util/LocalStorageKey'
// import localStorage from '../util/LocalStorage'
// import { base_host } from '../config/Host'
// import requestHeaders from '../util/RequestHeaders'

// export const login = (params) => (dispatch) => {
//     httpRequest.postCallBack(`${base_host}/userLogin`, params.postParam, (err, res) => {
//         if (err) {
//             //登录失败重新登录
//             //console.log(err)
//             dispatch({ type: actionTypes.loginTypes.LOGIN_ERROR, payload: { data: err } })
//         } else {
//             if (res.success) {
//                 // console.log('success', res)
//                 //判断请求是否成功，如果成功，更新token
//                 if (res.result.type == 19 || res.result.type == 11) {
//                     let user = {
//                         userId: res.result.userId,
//                         token: res.result.accessToken,
//                         userType: res.result.type,
//                         userStatus: res.result.userStatus,
//                         mobile: res.result.phone
//                     }
//                     requestHeaders.set('auth-token', res.result.accessToken)
//                     requestHeaders.set('user-type', res.result.type)
//                     requestHeaders.set('user-name', res.result.phone)
//                     localStorage.saveKey(localStorageKey.USER, user)
//                     dispatch({ type: actionTypes.loginTypes.LOGIN_SUCCESS, payload: { data: user } })
//                 }
//                 else {
//                     dispatch({ type: actionTypes.loginTypes.LOGIN_FAILED, payload: { data: '身份错误！' } })
//                 }
//             } else {
//                 //登录失败重新登录
//                 dispatch({ type: actionTypes.loginTypes.LOGIN_FAILED, payload: { data: res.msg } })
//             }
//         }
//     })
// }

// export const resetLogin = () => (dispatch) => {
//     dispatch({ type: actionTypes.loginTypes.RESET_LOGIN, payload: {} })
// }


// export const cleanLogin = () => (dispatch) => {
//     dispatch({ type: actionTypes.loginTypes.CLEAN_LOGIN, payload: {} })
// }
