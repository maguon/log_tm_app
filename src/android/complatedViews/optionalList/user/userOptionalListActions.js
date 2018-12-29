import * as httpRequest from '../../../../util/HttpRequest'
import * as actionTypes from '../../../../actions/actionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getUserOptionalList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/user`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.userOptionalList.get_userOptionalList_success, payload: { userOptionalList: res.result } })
        } else {
            dispatch({ type: actionTypes.userOptionalList.get_userOptionalList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.userOptionalList.get_userOptionalList_error, payload: { errorMsg: err } })
    }
}


export const getUserOptionalListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.userOptionalList.get_userOptionalList_waiting, payload: {} })
}