import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actions/actionTypes'
import { ObjectToUrl, objectExceptNull } from '../../../util/ObjectToUrl'
import { sleep } from '../../../util/util'
import { ToastAndroid } from 'react-native'

export const getAccidentRepairList = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/truckRepairRel?${ObjectToUrl({ accidentId: param.accidentId })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.accidentRepairList.get_accidentRepairList_success, payload: { accidentRepairList: res.result } })
        } else {
            dispatch({ type: actionTypes.accidentRepairList.get_accidentRepairList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.accidentRepairList.get_accidentRepairList_error, payload: { errorMsg: err } })
    }
}

export const getAccidentRepairListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.accidentRepairList.get_accidentRepairList_waiting, payload: {} })
}

export const createAccidentRepair = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { loginReducer: { data: { user: { uid } } } } = getState()
        dispatch({ type: actionTypes.accidentRepairList.create_accidentRepair_waiting, payload: {} })
        console.log('param', param)
        const url = `${base_host}/user/${uid}/truck/${param.truckId}/truckRepairRel`
        console.log('url', url)
        console.log('postParam', objectExceptNull({
            accidentId: param.accidentId,
            repairReason: param.repairReason,
            repairType: param.repairType
        }))
        const res = await httpRequest.post(url, objectExceptNull({
            accidentId: param.accidentId,
            repairReason: param.repairReason,
            repairType: param.repairType
        }))
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.accidentRepairList.create_accidentRepair_success, payload: {} })
            dispatch(getAccidentRepairListWaiting())
            dispatch(getAccidentRepairList({ accidentId: param.accidentId }))
        } else {
            dispatch({ type: actionTypes.accidentRepairList.create_accidentRepair_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.accidentRepairList.create_accidentRepair_error, payload: { errorMsg: err } })
    }
}
