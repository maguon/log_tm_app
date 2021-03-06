import httpRequest from '../util/HttpRequest.js'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const bindTruck = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
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

export const unBindTruck = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
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

export const bindDriver = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()

    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/drive/${param.requiredParam.driverId}/bind`
    dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_SUCCESS, payload: { data: { driverId: param.driverId, driver: param.driver } } })
        } else {
            dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_ERROR, payload: { data: err } })
    }
}

export const unBindDriver = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
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

export const cleanAddTruckSecondDate = () => (dispatch) => {
    dispatch({ type: actionTypes.addTruckSecondTypes.CLEAN_AddTruckSecondReducer, payload: {} })
}

export const bindViceDriver = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/viceDrive/${param.requiredParam.viceDriverId}/bind`
    dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindViceDriver_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, param.putParam)
        if (res.success) {
            dispatch({
                type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindViceDriver_SUCCESS, payload: {
                    data:
                    {
                        viceDriverId: param.viceDriverId,
                        viceDriver: param.viceDriver
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindViceDriver_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindViceDriver_ERROR, payload: { data: err } })
    }
}

export const resetBindViceDriver = (param) => (dispatch) => {
    dispatch({ type: actionTypes.addTruckSecondTypes.RESET_CREATE_TruckSecondBindViceDriver, payload: { data: param } })
}

export const unBindViceDriver = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/viceDrive/${param.requiredParam.viceDriverId}/unbind`
    dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindViceDriver_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, param.putParam)
        if (res.success) {
            dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindViceDriver_SUCCESS, payload: {} })
        } else {
            dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindViceDriver_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindViceDriver_ERROR, payload: { data: err } })
    }
}

export const resetUnBindViceDriver = (param) => (dispatch) => {
    dispatch({ type: actionTypes.addTruckSecondTypes.RESET_CREATE_TruckSecondUnBindViceDriver, payload: { data: param } })
}
