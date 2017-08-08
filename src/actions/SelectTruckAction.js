import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getTruckList = (param) => async (dispatch) => {
    let url
    if (param.OptionalParam.truckType === 1) {
        url = `${base_host}/truckFirst?${ObjectToUrl(param.OptionalParam)}`
    } else if (param.OptionalParam.truckType === 2) {
        url = `${base_host}/truckTrailer?${ObjectToUrl(param.OptionalParam)}`
    }

    dispatch({ type: actionTypes.selectTruckTypes.GET_TruckList_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectTruckTypes.GET_TruckList_SUCCESS, payload: { data: res.result, type: param.OptionalParam.truckType } })
        } else {
            dispatch({ type: actionTypes.selectTruckTypes.GET_TruckList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectTruckTypes.GET_TruckList_ERROR, payload: { data: err } })
    }
}