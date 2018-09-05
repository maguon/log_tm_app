import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actions/actionTypes'
import * as actions from '../../../actions'
import { objectExceptNull } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const modifyAccidentDispose = param => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } } } = getState()
        dispatch({ type: actionTypes.accidentDisposeEditor.modify_accidentDispose_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/truckAccidentCheck/${param.accidentCheckId}`
        const res = await httpRequest.put(url, objectExceptNull({
            truckAccidentId: param.truckAccidentId,
            truckAccidentType: param.truckAccidentType.id,
            underUserId: param.underUser.id,
            underUserName: param.underUser.item.real_name,
            underCost: param.underCost ? param.underCost : 0,
            companyCost: param.companyCost ? param.companyCost : 0,
            profit: param.profit ? param.profit : 0,
            remark: param.remark
        }))
        if (res.success) {
            dispatch({ type: actionTypes.accidentDisposeEditor.modify_accidentDispose_success, payload: {} })
            dispatch(actions.accidentInfo.getAccidentDisposeInfo({ accidentId: param.truckAccidentId }))
            dispatch({
                type: actionTypes.accidentList.modify_accidentForAccidentList, payload: {
                    accident: objectExceptNull({
                        accidentId: param.truckAccidentId,
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
            ToastAndroid.show('修改成功！', 10)
        } else {
            dispatch({ type: actionTypes.accidentDisposeEditor.modify_accidentDispose_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.show(`修改失败：${res.msg}！`, 10)
        }
    } catch (err) {
        dispatch({ type: actionTypes.accidentDisposeEditor.modify_accidentDispose_error, payload: { errorMsg: err } })
        ToastAndroid.show(`修改失败：${err}！`, 10)
    }
}

export const finishAccidentDispose = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.accidentDisposeEditor.finish_accidentDispose_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/truckAccident/${param.accidentId}/accidentStatus/3?truckAccidentCheckId=${param.accidentCheckId}`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.accidentDisposeEditor.finish_accidentDispose_success, payload: {} })
            dispatch(actions.accidentInfo.getAccidentDisposeInfo({ accidentId: param.accidentId }))
            dispatch({
                type: actionTypes.accidentList.modify_accidentForAccidentList, payload: {
                    accident: objectExceptNull({
                        accidentId: param.accidentId,
                        accident_status: 3
                    })
                }
            })
            ToastAndroid.show('处理成功！', 10)
        } else {
            dispatch({ type: actionTypes.accidentDisposeEditor.finish_accidentDispose_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.show(`处理失败：${res.msg}！`, 10)
        }
    } catch (err) {
        dispatch({ type: actionTypes.accidentDisposeEditor.finish_accidentDispose_error, payload: { errorMsg: err } })
        ToastAndroid.show(`处理失败：${err}！`, 10)
    }
}