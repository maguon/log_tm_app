import httpRequest from '../util/HttpRequest.js'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getDriverList = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const url = `${base_host}/drive?${ObjectToUrl(param.optionalParam)}`
    // console.log(url)
    dispatch({ type: actionTypes.driverListTypes.GET_DriverList_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.driverListTypes.GET_DriverList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.driverListTypes.GET_DriverList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverListTypes.GET_DriverList_ERROR, payload: { data: err } })
    }
}