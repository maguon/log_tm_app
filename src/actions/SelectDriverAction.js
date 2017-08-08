import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getTruckList = (param) => async (dispatch) => {
    let url = `${base_host}/drive?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_SUCCESS, payload: { data: res.result, type: param.OptionalParam.truckType } })
        } else {
            dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectDriverTypes.GET_SeletcDriverList_ERROR, payload: { data: err } })
    }
}