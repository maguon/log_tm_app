import httpRequest from '../util/HttpRequest.js'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getDriverList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_WAITING, payload: {} })
        const url = `${base_host}/drive?driveStatus=1`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_ERROR, payload: { data: err } })
    }
}


export const getDriverListWaiting = () => async (dispatch) => {
    dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_WAITING, payload: {} })
}