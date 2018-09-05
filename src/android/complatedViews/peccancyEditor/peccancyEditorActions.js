import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actions/actionTypes'
import { objectExceptNull } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import * as actions from '../../../actions'


export const modifyPeccancy = (param) => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const { peccancyId, values } = param
        const url = `${base_host}/user/${uid}/peccancy/${peccancyId}`
        console.log('url', url)
        const peccancy = objectExceptNull({
            driveId: values.driver.id,
            truckId: values.truck.id,
            fineScore: values.score ? values.score : 0,
            fineMoney: values.forfeit,
            startDate: values.dateStart,
            endDate: values.endStart,
            remark: values.remark
        })
        console.log('putParam', peccancy)
        const res = await httpRequest.put(url, peccancy)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.peccancyEditor.modify_peccancy_success, payload: {} })
            dispatch({ type: actionTypes.peccancyList.modify_peccancyForPeccancyList, payload: { peccancy: { ...peccancy, peccancyId } } })
        } else {
            dispatch({ type: actionTypes.peccancyEditor.modify_peccancy_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.peccancyEditor.modify_peccancy_error, payload: { failedMsg: err } })
    }
}