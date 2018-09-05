import * as httpRequest from '../../../../util/HttpRequest'
import { base_host } from '../../../../config/Host'
import * as actionTypes from '../../../../actions/actionTypes'


export const getTruckOptionalList = () => async (dispatch) => {
    try {
        const url = `${base_host}/truckFirst`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.truckOptionalList.get_truckOptionalList_success, payload: { truckOptionalList: res.result } })
        } else {
            dispatch({ type: actionTypes.truckOptionalList.get_truckOptionalList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckOptionalList.get_truckOptionalList_error, payload: { errorMsg: err } })
    }
}

export const getTruckOptionalListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.truckOptionalList.get_truckOptionalList_waiting, payload: {} })
}