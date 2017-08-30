import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getTruckHomeFilterList = (param) => async (dispatch) => {
    const url = `${base_host}/truckFirst?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.truckHomeFilterListTypes.GET_TruckHomeFilterList_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckHomeFilterListTypes.GET_TruckHomeFilterList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckHomeFilterListTypes.GET_TruckHomeFilterList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckHomeFilterListTypes.GET_TruckHomeFilterList_ERROR, payload: { data: err } })
    }
}

export const resetGetTruckHomeFilterList = () => (dispatch) => {
    dispatch({ type: actionTypes.truckHomeFilterListTypes.RESET_GET_TruckHomeFilterList, payload: { } })
}