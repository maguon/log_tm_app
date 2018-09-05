import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actions/actionTypes'
import * as actions from '../../../actions'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const getAccidentListForInsure = param => async (dispatch) => {
    try {
        console.log('param', param)
        const url = `${base_host}/truckAccident?accidentInsureId=${param.accidentInsureId}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            const accidentList = res.result.filter(item => item.id != param.accidentId)
            console.log('accidentList', accidentList)
            dispatch({ type: actionTypes.accidentIndemnifyDetail.get_accidentListForInsure_success, payload: { accidentList } })
        } else {
            dispatch({ type: actionTypes.accidentIndemnifyDetail.get_accidentListForInsure_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.accidentIndemnifyDetail.get_accidentListForInsure_error, payload: {} })
    }
}

export const getAccidentListForInsureWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.accidentIndemnifyDetail.get_accidentListForInsure_waiting, payload: {} })
}