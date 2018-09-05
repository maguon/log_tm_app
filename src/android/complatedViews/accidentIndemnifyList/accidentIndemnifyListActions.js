import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actions/actionTypes'
import * as actions from '../../../actions'
import { objectExceptNull, ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'


export const getAccidentIndemnifyList = param => async (dispatch, getState) => {
    // console.log('getState', getState())
    try {
        const url = `${base_host}/truckAccidentInsure?${ObjectToUrl({
            accidentId: param.accidentId
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.accidentIndemnifyList.get_accidentIndemnifyList_success, payload: { accidentIndemnifyList: res.result } })
        } else {
            dispatch({ type: actionTypes.accidentIndemnifyList.get_accidentIndemnifyList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.accidentIndemnifyList.get_accidentIndemnifyList_error, payload: { errorMsg: err } })
    }
}

export const getAccidentIndemnifyListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.accidentIndemnifyList.get_accidentIndemnifyList_waiting, payload: {} })
}