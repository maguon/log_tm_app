import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actions/actionTypes'
import { objectExceptNull } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import * as actions from '../../../actions'


export const modifyOveruseDieselOil = (param) => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const { overuseDieselOilId, values } = param
        const url = `${base_host}/user/${uid}/exceedOil/${overuseDieselOilId}`
        const overuseDieselOil = objectExceptNull({
            remark: values.remark,
            exceedOilMoney: values.forfeit,
            exceedOilQuantity: values.dieselOil,
            dpRouteTaskId: values.task.id
        })
        const res = await httpRequest.put(url, overuseDieselOil)
        if (res.success) {
            dispatch({ type: actionTypes.overuseDieselOilEditor.modify_overuseDieselOil_success, payload: {} })
            dispatch({
                type: actionTypes.overuseDieselOilList.modify_overuseDieselOilForList, payload: {
                    overuseDieselOil: {
                        exceed_oil_money: overuseDieselOil.exceedOilMoney,
                        exceed_oil_quantity: overuseDieselOil.exceedOilQuantity,
                        remark: overuseDieselOil.remark,
                        dp_route_task_id: overuseDieselOil.dpRouteTaskId,
                        overuseDieselOilId
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.overuseDieselOilEditor.modify_overuseDieselOil_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.overuseDieselOilEditor.modify_overuseDieselOil_error, payload: { failedMsg: err } })
    }
}