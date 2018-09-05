import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actions/actionTypes'
import { ObjectToUrl, objectExceptNull } from '../../../util/ObjectToUrl'
import { sleep } from '../../../util/util'
import { ToastAndroid } from 'react-native'


export const modifyAccidentRepair = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.accidentRepairEditor.modify_accidentRepair_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/truckRepairRelBase/${param.repairId}`
        const res = await httpRequest.put(url, objectExceptNull({
            accidentId: param.accidentId,
            repairReason: param.repairReason,
            repairType: param.repairType
        }))
        if (res.success) {
            ToastAndroid.show('修改成功！', 10)
            dispatch({
                type: actionTypes.accidentRepairList.modify_accidentRepairForList, payload: {
                    accidentRepair: {
                        repair_reason: param.repairReason
                    },
                    accidentRepairId: param.repairId
                }
            })
            dispatch({ type: actionTypes.accidentRepairEditor.modify_accidentRepair_success, payload: {} })
        } else {
            ToastAndroid.show(`修改失败：${res.msg}！`, 10)
            dispatch({ type: actionTypes.accidentRepairEditor.modify_accidentRepair_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        ToastAndroid.show(`修改失败：${err}！`, 10)
        dispatch({ type: actionTypes.accidentRepairEditor.modify_accidentRepair_error, payload: { errorMsg: err } })
    }
}