import * as httpRequest from '../../../../util/HttpRequest'
import { base_host } from '../../../../config/Host'
import * as actionTypes from '../../../../actions/actionTypes'


export const getDriverOptionalList = () => async (dispatch) => {
    try {
        const url = `${base_host}/drive`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.driverOptionalList.get_driverOptionalList_success, payload: { driverOptionalList: res.result } })
        } else {
            dispatch({ type: actionTypes.driverOptionalList.get_driverOptionalList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverOptionalList.get_driverOptionalList_error, payload: { errorMsg: err } })
    }
}

export const getDriverOptionalListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.driverOptionalList.get_driverOptionalList_waiting, payload: {} })
}