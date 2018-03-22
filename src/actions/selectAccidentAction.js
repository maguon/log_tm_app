import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getTruckAccidentList = (param) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.selectAccidentTypes.get_selectAccidentList_waiting, payload: {} })
        const url = `${base_host}/truckAccident?${ObjectToUrl(param.OptionalParam)}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectAccidentTypes.get_selectAccidentList_success, payload: { accidentList: res.result } })
        } else {
            dispatch({ type: actionTypes.selectAccidentTypes.get_selectAccidentList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectAccidentTypes.get_selectAccidentList_error, payload: { errorMsg: err } })
    }
}