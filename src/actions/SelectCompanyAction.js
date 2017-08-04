import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCompanyList = (param) => async (dispatch) => {
    const url = `${base_host}/company?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.selectCompanyTypes.GET_CompanyList_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectCompanyTypes.GET_CompanyList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.selectCompanyTypes.GET_CompanyList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectCompanyTypes.GET_CompanyList_ERROR, payload: { data: err } })
    }
}