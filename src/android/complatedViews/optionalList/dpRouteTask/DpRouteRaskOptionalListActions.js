import * as httpRequest from '../../../../util/HttpRequest'
import * as actionTypes from '../../../../actions/actionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'
import { change } from 'redux-form'

export const getDpRouteRaskOptionalList = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        dispatch({ type: actionTypes.dpRouteRaskOptionalList.get_dpRouteRaskOptionalList_waiting, payload: {} })
        const url = `${base_host}/dpRouteTask?${ObjectToUrl({ dpRouteTaskId: param.dpRouteTaskId })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.dpRouteRaskOptionalList.get_dpRouteRaskOptionalList_success, payload: { dpRouteRask: res.result[0] } })
            if (res.result[0]) {
                param.onSelect(res.result[0])
            }
        } else {
            dispatch({ type: actionTypes.dpRouteRaskOptionalList.get_dpRouteRaskOptionalList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.dpRouteRaskOptionalList.get_dpRouteRaskOptionalList_error, payload: { errorMsg: err } })
    }
}