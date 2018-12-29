import httpRequest from '../util/HttpRequest.js'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getInsuranceList = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const url = `${base_host}/truckInsure`
    dispatch({ type: actionTypes.selectInsuranceTypes.GET_InsuranceList_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectInsuranceTypes.GET_InsuranceList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.selectInsuranceTypes.GET_InsuranceList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectInsuranceTypes.GET_InsuranceList_ERROR, payload: { data: err } })
    }
}

export const resetGetInsuranceList = () => (dispatch) => {
    dispatch({ type: actionTypes.selectInsuranceTypes.RESET_GET_InsuranceList, payload: {} })
}