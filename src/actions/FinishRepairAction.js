import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl, objectExceptNull } from '../util/ObjectToUrl'
import * as truckInfoAction from '../actions/TruckInfoAction'
import { ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

export const finishRepair = (values) => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const { id, repairMoney, repairStation, remark, repairId, truckId } = values
        dispatch({ type: actionTypes.finishRepairTypes.finish_Repair_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/truckRepairRel/${repairId}`
        const res = await httpRequest.put(url, objectExceptNull({
            repairMoney,
            remark,
            repairStationId: repairStation.id
        }))
        if (res.success) {
            dispatch(truckInfoAction.getTruckRepairRelList({ OptionalParam: { truckId } }))
            dispatch({ type: actionTypes.finishRepairTypes.finish_Repair_success, payload: {} })
            ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            Actions.pop({ popNum: 2 })
        } else {
            dispatch({ type: actionTypes.finishRepairTypes.finish_Repair_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.showWithGravity(`提交失败：${res.msg}！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    } catch (err) {
        dispatch({ type: actionTypes.finishRepairTypes.finish_Repair_error, payload: { errorMsg: err } })
        ToastAndroid.showWithGravity(`提交失败：${err}！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }
}