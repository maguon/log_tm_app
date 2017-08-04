import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const createTruckFirst = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truckFirst`
    dispatch({ type: actionTypes.addTruckFirstTypes.CREATE_TruckFirst_WAITING, payload: {} })
    try {
        let res = await httpRequest.post(url, param.postParam)
        if (res.success) {
            dispatch({ type: actionTypes.addTruckFirstTypes.CREATE_TruckFirst_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.addTruckFirstTypes.CREATE_TruckFirst_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addTruckFirstTypes.CREATE_TruckFirst_ERROR, payload: { data: err } })
    }
}

export const createTruckTrailer = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truckTrailer`
    dispatch({ type: actionTypes.addTruckFirstTypes.CREATE_TruckTrailer_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url, param.postParam)
        if (res.success) {
            dispatch({ type: actionTypes.addTruckFirstTypes.CREATE_TruckTrailer_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.addTruckFirstTypes.CREATE_TruckTrailer_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addTruckFirstTypes.CREATE_TruckTrailer_ERROR, payload: { data: err } })
    }
}

export const resetCreateTruckFirst = () => (dispatch) => {
    dispatch({ type: actionTypes.addTruckFirstTypes.RESET_CREATE_TruckFirst, payload: {} })
}

export const resetCreateTruckTrailer = () => (dispatch) => {
    dispatch({ type: actionTypes.addTruckFirstTypes.RESET_CREATE_TruckTrailer, payload: {} })

}

export const changeTruckFirstField = (param) => (dispatch) => {
    console.log('param', param)
    dispatch({ type: actionTypes.addTruckFirstTypes.CHANGE_TruckFirst_FIELD, payload: { data: param } })
}