import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actions/actionTypes'
import { objectExceptNull } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import * as actions from '../../../actions'

export const createPeccancy = (param) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.createPeccancy.create_peccancy_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/drivePeccancy`
        const res = await httpRequest.post(url, objectExceptNull({
            driveId: param.driver.id,
            truckId: param.truck.id,
            fineScore: param.score ? param.score : 0,
            fineMoney: param.forfeit,
            startDate: param.dateStart,
            endDate: param.endStart,
            remark: param.remark
        }))
        if (res.success) {
            ToastAndroid.show('创建违章扣款成功！', 10)
            dispatch({ type: actionTypes.createPeccancy.create_peccancy_waiting, payload: {} })
            dispatch(actions.peccancyList.getPeccancyList())
        } else {
            ToastAndroid.show(`创建违章扣款失败：${res.msg}！`, 10)
            dispatch({ type: actionTypes.createPeccancy.create_peccancy_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        ToastAndroid.show(`创建违章扣款失败：${err}！`, 10)
        dispatch({ type: actionTypes.createPeccancy.create_peccancy_error, payload: { errorMsg: err } })

    }
}