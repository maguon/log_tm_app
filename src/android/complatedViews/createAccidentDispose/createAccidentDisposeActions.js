import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actions/actionTypes'
import { objectExceptNull } from '../../../util/ObjectToUrl'
import * as actions from '../../../actions'
import { ToastAndroid } from 'react-native'

export const createAccidentDispose = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { loginReducer: { data: { user: { uid } } } } = getState()
        dispatch({ type: actionTypes.createAccidentDispose.create_accidentDispose_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/truckAccidentCheck`
        const res = await httpRequest.post(url, objectExceptNull({
            truckAccidentId: param.accidentId,
            truckAccidentType: param.truckAccidentType.id,
            underUserId: param.underUser.id,
            underUserName: param.underUser.item.real_name,
            underCost: param.underCost,
            companyCost: param.companyCost,
            profit: param.profit,
            remark: param.remark
        }))
        if (res.success) {
            await dispatch(actions.accidentInfo.getAccidentDisposeInfo({ accidentId: param.accidentId }))
            dispatch({
                type: actionTypes.accidentList.modify_accidentForAccidentList, payload: {
                    accident: objectExceptNull({
                        accidentId: param.accidentId,
                        accident_status: 2,
                        truck_accident_type: param.truckAccidentType.id,
                        under_user_id: param.underUser.id,
                        under_user_name: param.underUser.item.real_name,
                        under_cost: param.underCost ? param.underCost : 0,
                        company_cost: param.companyCost ? param.companyCost : 0,
                        profit: param.profit ? param.profit : 0,
                        remark: param.remark
                    })
                }
            })
            dispatch({ type: actionTypes.createAccidentDispose.create_accidentDispose_success, payload: {} })
            ToastAndroid.show('处理成功！', 10)
        } else {
            dispatch({ type: actionTypes.createAccidentDispose.create_accidentDispose_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.show(`处理失败：${res.msg}！`, 10)
        }
    } catch (err) {
        dispatch({ type: actionTypes.createAccidentDispose.create_accidentDispose_error, payload: { errorMsg: err } })
        ToastAndroid.show(`处理失败：${err}！`, 10)
    }
}