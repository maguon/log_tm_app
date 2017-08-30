import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getOperateTypeCount = (param) => async (dispatch) => {
    const url = `${base_host}/operateTypeCount?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.homeTypes.GET_OperateTypeCount_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.homeTypes.GET_OperateTypeCount_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.homeTypes.GET_OperateTypeCount_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.homeTypes.GET_OperateTypeCount_ERROR, payload: { data: err } })
    }
}

export const getWaitingInspectCount = (param) => async (dispatch) => {
    const url = `${base_host}/drivingCount?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.homeTypes.GET_WaitingInspectCount_WAITING, payload: {} })
    try {  
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.homeTypes.GET_WaitingInspectCount_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.homeTypes.GET_WaitingInspectCount_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.homeTypes.GET_WaitingInspectCount_ERROR, payload: { data: err } })
    }
}

export const getTruckRepairRelCount = () => async (dispatch) => {
    const url = `${base_host}/truckRepairRelCount?repairStatus=0`
    dispatch({ type: actionTypes.homeTypes.GET_TruckRepairRelCount_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.homeTypes.GET_TruckRepairRelCount_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.homeTypes.GET_TruckRepairRelCount_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.homeTypes.GET_TruckRepairRelCount_ERROR, payload: { data: err } })
    }
}

export const resetGetOperateTypeCount = () => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.RESET_GET_OperateTypeCount, payload: {} })
}

export const resetGetWaitingInspectCount = () => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.RESET_GET_WaitingInspectCount, payload: {} })
}

export const resetGetTruckRepairRelCount = () => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.RESET_GET_TruckRepairRelCount, payload: {} })
}


export const getDriverlicenseCount = (param) => async (dispatch) => {
    const url = `${base_host}/licenseCount?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.homeTypes.GET_DriverlicenseCount_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        console.log('res',res)
        if (res.success) {
            dispatch({ type: actionTypes.homeTypes.GET_DriverlicenseCount_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.homeTypes.GET_DriverlicenseCount_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.homeTypes.GET_DriverlicenseCount_ERROR, payload: { data: err } })
    }
}

export const resetGetDriverlicenseCount = () => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.RESET_GET_DriverlicenseCount, payload: {} })
}
