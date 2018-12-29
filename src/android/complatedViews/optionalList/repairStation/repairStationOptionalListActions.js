import * as httpRequest from '../../../../util/HttpRequest'
import * as actionTypes from '../../../../actions/actionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getRepairStationOptionalList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/repairStation`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.repairStationOptionalList.get_repairStationOptionalList_success, payload: { repairStationOptionalList: res.result } })
        } else {
            dispatch({ type: actionTypes.repairStationOptionalList.get_repairStationOptionalList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.repairStationOptionalList.get_repairStationOptionalList_error, payload: { errorMsg: err } })
    }
}


export const getRepairStationOptionalListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.repairStationOptionalList.get_repairStationOptionalList_waiting, payload: {} })
}