import * as httpRequest from '../../../../util/HttpRequest'
import * as actionTypes from '../../../../actions/actionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getInsureCompanyOptionalList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/truckInsure`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.insureCompanyOptionalList.get_insureCompanyOptionalList_success, payload: { insureCompanyOptionalList: res.result } })
        } else {
            dispatch({ type: actionTypes.insureCompanyOptionalList.get_insureCompanyOptionalList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.insureCompanyOptionalList.get_insureCompanyOptionalList_error, payload: { errorMsg: err } })
    }
}


export const getInsureCompanyOptionalListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.insureCompanyOptionalList.get_insureCompanyOptionalList_waiting, payload: {} })
}