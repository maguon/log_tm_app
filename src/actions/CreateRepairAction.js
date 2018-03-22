import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl, objectExceptNull } from '../util/ObjectToUrl'
import * as truckInfoAction from '../actions/TruckInfoAction'
import { ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'


export const createRepair = (values) => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const { truckId, repair_reason, repair_type, accident = {} } = values
        dispatch({ type: actionTypes.createRepairTypes.create_Repair_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/truck/${truckId}/truckRepairRel`
        const res = await httpRequest.post(url, objectExceptNull({
            repairType: repair_type.id,
            accidentId: accident.id,
            repairReason: repair_reason
        }))
        if (res.success) {
            dispatch({ type: actionTypes.createRepairTypes.create_Repair_success, payload: {} })
            dispatch(truckInfoAction.getTruckRepairRelList({ OptionalParam: { truckId } }))
            ToastAndroid.showWithGravity('创建成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            Actions.pop()
        } else {
            dispatch({ type: actionTypes.createRepairTypes.create_Repair_waiting, payload: { failedMsg: res.msg } })
            ToastAndroid.showWithGravity(`创建失败：${res.msg}！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)

        }
    } catch (err) {
        dispatch({ type: actionTypes.createRepairTypes.create_Repair_waiting, payload: { errorMsg: err } })
        ToastAndroid.showWithGravity(`创建失败：${err}！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }
}