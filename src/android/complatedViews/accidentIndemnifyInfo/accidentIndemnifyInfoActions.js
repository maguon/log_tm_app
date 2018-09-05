import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actions/actionTypes'
import * as actions from '../../../actions'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'


export const getAccidentInsureLoan = param => async (dispatch) => {
    try {
        const url = `${base_host}/truckAccidentInsureLoan?${ObjectToUrl({ accidentInsureId: param.accidentInsureId })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.accidentIndemnifyInfo.get_accidentInsureLoan_success, payload: { accidentInsureLoan: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.accidentIndemnifyInfo.get_accidentInsureLoan_failed, payload: { errorMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.accidentIndemnifyInfo.get_accidentInsureLoan_error, payload: { errorMsg: err } })
    }
}

export const getAccidentInsureLoanWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.accidentIndemnifyInfo.get_accidentInsureLoan_waiting, payload: { } })

}

