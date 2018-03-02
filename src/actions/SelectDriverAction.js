import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getDriverList = (param) => async (dispatch) => {
    const url = `${base_host}/drive?driveStatus=1`
    dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_WAITING, payload: {} })
    try {
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_ERROR, payload: { data: err } })
    }
}


export const getDriverListWaiting = (param) => async (dispatch) => {
    dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_WAITING, payload: {} })
}