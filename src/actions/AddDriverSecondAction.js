import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const bindTruck = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/drive/${param.requiredParam.driverId}/bind`
    dispatch({ type: actionTypes.addDriverSecondTypes.CREATE_DriverSecondBindTruck_WAITING, payload: {} })
    try {
        const res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({
                type: actionTypes.addDriverSecondTypes.CREATE_DriverSecondBindTruck_SUCCESS, payload: {
                    data: {
                        truckNum: param.truckNum,
                        truckId: param.truckId
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.addDriverSecondTypes.CREATE_DriverSecondBindTruck_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addDriverSecondTypes.CREATE_DriverSecondBindTruck_ERROR, payload: { data: err } })
    }
}

export const unBindTruck = (param) => async (dispatch) => {
     const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/drive/${param.requiredParam.driverId}/unbind`
    dispatch({ type: actionTypes.addDriverSecondTypes.CREATE_DriverSecondUnBindTruck_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.addDriverSecondTypes.CREATE_DriverSecondUnBindTruck_SUCCESS, payload: {} })
        } else {
            dispatch({ type: actionTypes.addDriverSecondTypes.CREATE_DriverSecondUnBindTruck_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addDriverSecondTypes.CREATE_DriverSecondUnBindTruck_ERROR, payload: { data: err } })
    }
}

export const resetBindTruck = () => (dispatch) => {
    dispatch({ type: actionTypes.addDriverSecondTypes.RESET_CREATE_DriverSecondBindTruck, payload: {} })
}

export const resetUnBindTruck = () => (dispatch) => {
    dispatch({ type: actionTypes.addDriverSecondTypes.RESET_CREATE_DriverSecondUnBindTruck, payload: {} })
}

export const cleanAddDriverSecondDate = () => (dispatch) => {
    dispatch({ type: actionTypes.addDriverSecondTypes.CLEAN_AddDriverSecondReducer, payload: {} })
}

