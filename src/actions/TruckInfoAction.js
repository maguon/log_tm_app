import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getTruckInfo = (param) => async (dispatch) => {
    const url = `${base_host}/truckFirst?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_ERROR, payload: { data: err } })
    }
}

export const getTruckRecord = (param) => async (dispatch) => {
    const url = `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckNum}/record`
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_ERROR, payload: { data: err } })
    }
}

export const getTruckInsureRel = (param) => async (dispatch) => {
    const url = `${base_host}/truckInsureRel?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsureRel_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsureRel_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsureRel_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsureRel_ERROR, payload: { data: err } })
    }
}

export const resetGetTruckInfo = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckInfo, payload: {} })
}

export const resetGetTruckRecord = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckRecord, payload: {} })
}

export const resetGetTruckInsureRel = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckInsureRel, payload: {} })
}

export const updateTruckInfo = (param) => async (dispatch) => {
    const url = `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}`
    console.log(url)
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, param.putParam)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_ERROR, payload: { data: err } })
    }
}

export const resetUpdateTruckInfo = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_UpdateTruckInfo, payload: {} })
}