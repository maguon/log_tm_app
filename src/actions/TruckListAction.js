import httpRequest from '../util/HttpRequest.js'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getTruckList = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    let url
    if (param.OptionalParam.truckType == 1) {
        url = `${base_host}/truckFirst?${ObjectToUrl(param.OptionalParam)}`
    } else {
        url = `${base_host}/truckTrailer?${ObjectToUrl(param.OptionalParam)}`
    }
    dispatch({ type: actionTypes.truckListTypes.GET_TruckList_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckListTypes.GET_TruckList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckListTypes.GET_TruckList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckListTypes.GET_TruckList_ERROR, payload: { data: err } })
    }
}