import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actions/actionTypes'
import { objectExceptNull } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import * as actions from '../../../actions'

export const createOveruseDieselOil = (param) => async (dispatch, getState) => {
    try {
    const { communicationSettingReducer: { data: { base_host } } } = getState()

        dispatch({ type: actionTypes.createOveruseDieselOil.create_overuseDieselOil_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/driveExceedOil`
        const res = await httpRequest.post(url, objectExceptNull({
            remark: param.remark,
            exceedOilMoney: param.forfeit,
            exceedOilQuantity: param.dieselOil,
            dpRouteTaskId: param.task.id
        }))
        if (res.success) {
            ToastAndroid.show('创建超油扣款成功！', 10)
            dispatch({ type: actionTypes.createOveruseDieselOil.create_overuseDieselOil_waiting, payload: {} })
            dispatch(actions.overuseDieselOilList.getOveruseDieselOilList())
        } else {
            ToastAndroid.show(`创建超油扣款失败：${res.msg}！`, 10)
            dispatch({ type: actionTypes.createOveruseDieselOil.create_overuseDieselOil_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        ToastAndroid.show(`创建超油扣款失败：${err}！`, 10)
        dispatch({ type: actionTypes.createOveruseDieselOil.create_overuseDieselOil_error, payload: { errorMsg: err } })

    }
}