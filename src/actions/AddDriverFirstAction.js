import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const createDriver = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/drive`
    dispatch({ type: actionTypes.addDriverFirstTypes.CREATE_Driver_WAITING, payload: {} })
    try {
        let res = await httpRequest.post(url, param.postParam)
        if (res.success) {
            dispatch({ type: actionTypes.addDriverFirstTypes.CREATE_Driver_SUCCESS, payload: { data: res.id } })
        } else {
            dispatch({ type: actionTypes.addDriverFirstTypes.CREATE_Driver_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addDriverFirstTypes.CREATE_Driver_ERROR, payload: { data: err } })
    }
}

export const resetCreateDriver = () => (dispatch) => {
    dispatch({ type: actionTypes.addDriverFirstTypes.RESET_CREATE_Driver, payload: {} })
}

export const changeDriverField = (param) => (dispatch) => {
    dispatch({ type: actionTypes.addDriverFirstTypes.CHANGE_Driver_FIELD, payload: { data: param } })
}
