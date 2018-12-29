import httpRequest from '../util/HttpRequest.js'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getRepairStationList = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/repairStation?repairSationStatus=1`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectRepairStationTypes.get_selectRepairStationList_success, payload: { repairStationList: res.result } })
        } else {
            dispatch({ type: actionTypes.selectRepairStationTypes.get_selectRepairStationList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectRepairStationTypes.get_selectRepairStationList_error, payload: { errorMsg: err } })
    }
}


export const getRepairStationListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.selectRepairStationTypes.get_selectRepairStationList_waiting, payload: {} })
}