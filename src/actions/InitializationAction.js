/**
 * Created by lingxue on 2017/4/21.
 */
import { Actions } from 'react-native-router-flux'
import * as actionTypes from './actionTypes'
import localStorageKey from '../util/LocalStorageKey'
import localStorage from '../util/LocalStorage'
import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import { ObjectToUrl } from '../util/ObjectToUrl'
import requestHeaders from '../util/RequestHeaders'


//获取最新version信息
export const getAppLastVersion = (param) => async (dispatch) => {
    const url = `${base_host}/app?${ObjectToUrl(param.optionalParam)}`
    dispatch({ type: actionTypes.initializationTypes.GET_VERSION_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.initializationTypes.GET_VERSION_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.initializationTypes.GET_VERSION_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.initializationTypes.GET_VERSION_ERROR, payload: { data: err } })
    }
}

//验证localStorage中的token，请求更换token,请求更新userInformation
export const validateToken = () => (dispatch) => {
     //console.log(localStorage)
    localStorage.loadKey(localStorageKey.USER, (localStorageErr, localStorageRes) => {
        if (localStorageErr) {
            if (localStorageErr.name == 'NotFoundError') {
             //   console.log('NotFoundError')
                //跳转到登录页面
                dispatch({ type: actionTypes.initializationTypes.VALIDATE_TOKEN_FAILED, payload: {} })
            }
            else if (localStorageErr.name == 'ExpiredError') {
                //未知错误处理,删除本地缓存
                localStorage.removeKey(localStorageKey.USER)
                dispatch({ type: actionTypes.initializationTypes.VALIDATE_TOKEN_FAILED, payload: {} })
            }
        }
        else {
            if (localStorageRes.token && localStorageRes.userId) {
                //判断userId与token是否为空，如果都不为空,请求更换token 
                httpRequest
                    .getCallBack(`${base_host}/user/${localStorageRes.userId}/token/${localStorageRes.token}`, (changeTokenErr, changeTokenRes) => {
                        if (changeTokenErr) {
                            //判断网络连接层是否有问题，如果有问题提醒用户
                            //console.log('changeTokenErr', changeTokenErr)
                        }
                        else {
                            if (changeTokenRes.success) {
                                //判断请求是否成功，如果成功，更新token
                                localStorage.saveKey(localStorageKey.USER, {
                                    userId: changeTokenRes.result.userId,
                                    token: changeTokenRes.result.accessToken,
                                    userType: changeTokenRes.result.type,
                                    userStatus: changeTokenRes.result.userStatus,
                                    mobile:changeTokenRes.result.phone,
                                })
                                requestHeaders.set('auth-token', changeTokenRes.result.accessToken)
                                requestHeaders.set('user-type', changeTokenRes.result.type)
                                requestHeaders.set('user-name', changeTokenRes.result.phone)
                                dispatch({
                                    type: actionTypes.loginTypes.LOGIN_SUCCESS, payload: {
                                        data: {
                                            userId: changeTokenRes.result.userId,
                                            token: changeTokenRes.result.accessToken,
                                            userType: changeTokenRes.result.type,
                                            userStatus: changeTokenRes.result.userStatus,
                                            mobile: changeTokenRes.result.phone
                                        }
                                    }
                                })
                                dispatch({ type: actionTypes.initializationTypes.VALIDATE_TOKEN_SUCCESS, payload: {} })
                            }
                            else {
                                //判断请求是否成功，如果失败，跳转到登录页
                                // console.log('changeTokenResfailed', changeTokenRes)
                                dispatch({ type: actionTypes.initializationTypes.VALIDATE_TOKEN_FAILED, payload: {} })
                            }
                        }
                    })
            }
            else {
                //判断userId与token是否为空，如果有一个为空，跳转到登录页面
                dispatch({ type: actionTypes.initializationTypes.VALIDATE_TOKEN_FAILED, payload: {} })
            }
        }
    })
}

export const resetInitialization = () => (dispatch) => {
    dispatch({ type: actionTypes.initializationTypes.RESET_INITIALIZATION, payload: {} })
}

export const resetGetVersion = () => (dispatch) => {
    dispatch({ type: actionTypes.initializationTypes.RESET_GETVERSION, payload: {} })
}
