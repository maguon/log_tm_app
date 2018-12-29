import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actions/actionTypes'
import * as actions from '../../../actions'
import { objectExceptNull } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

export const createAccidentIndemnify = param => async (dispatch, getState) => {
    try {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { loginReducer: { data: { user: { uid } } } } = getState()
        dispatch({ type: actionTypes.createAccidentIndemnify.create_accidentIndemnify_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/truckAccidentInsureBase`
        const res = await httpRequest.post(url, objectExceptNull({
            insureId: param.company.id,
            insureType: param.insureType.id,
            insurePlan: param.insurePlan,
            financialLoanStatus: param.financialLoanStatus ? 1 : 0,
            financialLoan: param.financialLoanStatus ? param.financialLoan : null,
            insureActual: param.insureActual,
            paymentExplain: param.paymentExplain,
            accidentId: param.accidentId
        }))
        if (res.success) {
            dispatch(actions.accidentIndemnifyList.getAccidentIndemnifyList({ accidentId: param.accidentId }))
            ToastAndroid.show('创建成功！', 10)
            Actions.pop()
            dispatch({ type: actionTypes.createAccidentIndemnify.create_accidentIndemnify_success, payload: {} })
        } else {
            ToastAndroid.show(`创建失败：${res.msg}！`, 10)
            dispatch({ type: actionTypes.createAccidentIndemnify.create_accidentIndemnify_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        ToastAndroid.show(`创建失败：${err}！`, 10)
        dispatch({ type: actionTypes.createAccidentIndemnify.create_accidentIndemnify_error, payload: { errorMsg: err } })
    }
}   