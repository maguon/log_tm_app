import httpRequest from '../util/HttpRequest.js'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'
import * as truckInfoAction from '../actions/TruckInfoAction'
import { ToastAndroid } from 'react-native'

export const modifyRepairInfo = (values) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const { id, repair_type, repair_reason, accident, truck_id } = values
        dispatch({ type: actionTypes.repairEditorTypes.modify_RepairInfo_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/truckRepairRelBase/${id}`
        const putParam = {
            repairType: repair_type.id,
            repairReason: repair_reason
        }
        if (repair_type.id == 1) {
            putParam.accidentId = accident.id
        }
        const res = await httpRequest.put(url, putParam)
        if (res.success) {
            dispatch(truckInfoAction.getTruckRepairRelList({ OptionalParam: { truckId: truck_id } }))
            dispatch({ type: actionTypes.repairEditorTypes.modify_RepairInfo_success, payload: {} })
            ToastAndroid.showWithGravity('修改成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        } else {
            dispatch({ type: actionTypes.repairEditorTypes.modify_RepairInfo_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.showWithGravity(`修改失败：${res.msg}！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }

    } catch (err) {
        ToastAndroid.showWithGravity(`修改失败：${err}！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.repairEditorTypes.modify_RepairInfo_error, payload: { errorMsg: err } })
    }

}