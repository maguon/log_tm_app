import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actions/actionTypes'

export const getAccidentDisposeInfo = param => async (dispatch,getState) => {
    try {
    const { communicationSettingReducer: { data: { base_host } } } = getState()

        const url = `${base_host}/truckAccidentCheck?truckAccidentId=${param.accidentId}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.accidentInfo.get_accidentDisposeInfo_success, payload: { accidentDisposeInfo: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.accidentInfo.get_accidentDisposeInfo_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.accidentInfo.get_accidentDisposeInfo_error, payload: { errorMsg: err } })
    }
}

export const getAccidentDisposeInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.accidentInfo.get_accidentDisposeInfo_waiting, payload: {} })
}