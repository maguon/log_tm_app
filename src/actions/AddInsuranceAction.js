import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const createInsurance = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truckFirst`
    dispatch({ type: actionTypes.addTruckFirstTypes.CREATE_TruckFirst_WAITING, payload: {} })
    try {
        let res = await httpRequest.post(url, param.postParam)
        if (res.success) {
            dispatch({ type: actionTypes.addTruckFirstTypes.CREATE_TruckFirst_SUCCESS, payload: { data: res.id } })
        } else {
            dispatch({ type: actionTypes.addTruckFirstTypes.CREATE_TruckFirst_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addTruckFirstTypes.CREATE_TruckFirst_ERROR, payload: { data: err } })
    }
}

export const resetCreateInsurance = () => (dispatch) => {
    dispatch({ type: actionTypes.addInsuranceTypes.RESET_CREATE_Insurance, payload: {} })
}

export const changeInsuranceField = (param) => (dispatch) => {
    dispatch({ type: actionTypes.addInsuranceTypes.CHANGE_Insurance_FIELD, payload: { data: param } })
}