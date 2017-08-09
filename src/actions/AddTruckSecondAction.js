import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const bindTruck = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/trail/${param.requiredParam.trailId}/bind`
    dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindTruck_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({
                type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindTruck_SUCCESS, payload: {
                    data: {
                        type: param.type,
                        truck: param.truck,
                        truckId: param.truckId
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindTruck_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindTruck_ERROR, payload: { data: err } })
    }
}

export const unBindTruck = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/trail/${param.requiredParam.trailId}/unbind`
    dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindTruck_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindTruck_SUCCESS, payload: {} })
        } else {
            dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindTruck_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindTruck_ERROR, payload: { data: err } })
    }
}

export const bindDriver = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/drive/${param.requiredParam.driverId}/bind`
    dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_SUCCESS, payload: {} })
        } else {
            dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_ERROR, payload: { data: err } })
    }
}

export const unBindDriver = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/drive/${param.requiredParam.driverId}/unbind`
    dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindDriver_SUCCESS, payload: {} })
        } else {
            dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindDriver_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindDriver_ERROR, payload: { data: err } })
    }
}

export const resetBindTruck = () => (dispatch) => {
    dispatch({ type: actionTypes.addTruckSecondTypes.RESET_CREATE_TruckSecondBindTruck, payload: {} })
}

export const resetUnBindTruck = () => (dispatch) => {
    dispatch({ type: actionTypes.addTruckSecondTypes.RESET_CREATE_TruckSecondUnBindTruck, payload: {} })
}

export const resetBindDriver = () => (dispatch) => {
    dispatch({ type: actionTypes.addTruckSecondTypes.RESET_CREATE_TruckSecondBindDriver, payload: {} })
}

export const resetUnBindDriver = () => (dispatch) => {
    dispatch({ type: actionTypes.addTruckSecondTypes.RESET_CREATE_TruckSecondUnBindDriver, payload: {} })
}