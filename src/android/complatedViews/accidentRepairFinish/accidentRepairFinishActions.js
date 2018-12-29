import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actions/actionTypes'
import { ObjectToUrl, objectExceptNull } from '../../../util/ObjectToUrl'
import { sleep } from '../../../util/util'
import { ToastAndroid } from 'react-native'
import moment from 'moment'

export const finishAccidentRepair = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        dispatch({ type: actionTypes.accidentRepairFinish.finish_accidentRepair_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/truckRepairRel/${param.repairId}`
        // console.log('url', url)
        // console.log('putParam', objectExceptNull({
        //     repairMoney: param.repairMoney,
        //     remark: param.remark,
        //     repairStationId: param.repairStation.id,
        //     accidentId: param.accidentId
        // }))
        const res = await httpRequest.put(url, objectExceptNull({
            repairMoney: param.repairMoney,
            remark: param.remark,
            repairStationId: param.repairStation.id,
            accidentId: param.accidentId
        }))
        if (res.success) {
            ToastAndroid.show('修改成功！', 10)
            dispatch({
                type: actionTypes.accidentRepairList.modify_accidentRepairForList, payload: {
                    accidentRepair: {
                        repair_station_id: param.repairStation.id,
                        repair_station_name: param.repairStation.value,
                        remark: param.remark,
                        repair_money: param.repairMoney,
                        repair_status: 1,
                        end_date: moment().format('YYYY-MM-DD HH:mm:ss')
                    },
                    accidentRepairId: param.repairId
                }
            })
            dispatch({ type: actionTypes.accidentRepairFinish.finish_accidentRepair_success, payload: {} })
        } else {
            ToastAndroid.show(`修改失败：${res.msg}！`, 10)
            dispatch({ type: actionTypes.accidentRepairFinish.finish_accidentRepair_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        ToastAndroid.show(`修改失败：${err}！`, 10)
        dispatch({ type: actionTypes.accidentRepairFinish.finish_accidentRepair_error, payload: { errorMsg: err } })
    }
}