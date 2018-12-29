import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actions/actionTypes'
import * as actions from '../../../actions'
import { objectExceptNull } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const modifyAccidentIndemnify = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        // console.log('param', param)
        const { loginReducer: { data: { user: { uid } } } } = getState()
        dispatch({ type: actionTypes.accidentIndemnifyEditor.modify_accidentIndemnify_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/truckAccidentInsure/${param.accidentInsureId}`
        // console.log('url', url)
        // console.log('putParam', objectExceptNull({
        //     insureId: param.company.id,
        //     insureType: param.insureType.id,
        //     insurePlan: param.insurePlan,
        //     financialLoan: param.financialLoan,
        //     insureActual: param.insureActual,
        //     paymentExplain: param.paymentExplain,
        //     accidentId: param.accidentId
        // }))
        const res = await httpRequest.put(url, objectExceptNull({
            insureId: param.company.id,
            insureType: param.insureType.id,
            insurePlan: param.insurePlan,
            financialLoan: param.financialLoan,
            insureActual: param.insureActual,
            paymentExplain: param.paymentExplain,
            accidentId: param.accidentId
        }))
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.accidentIndemnifyList.modify_accidentIndemnifyForList, payload: {
                    accidentIndemnify: objectExceptNull({
                        insure_id: param.company.id,
                        insure_name: param.company.value,
                        insure_type: param.insureType.id,
                        insure_plan: param.insurePlan,
                        financial_loan: param.financialLoan,
                        insure_actual: param.insureActual,
                        payment_explain: param.paymentExplain
                    }),
                    accidentInsureId: param.accidentInsureId
                }
            })
            ToastAndroid.show('修改成功！', 10)
            dispatch({ type: actionTypes.accidentIndemnifyEditor.modify_accidentIndemnify_success, payload: {} })
        } else {
            ToastAndroid.show(`修改失败：${res.msg}！`, 10)
            dispatch({ type: actionTypes.accidentIndemnifyEditor.modify_accidentIndemnify_failed, payload: { failedMsg: res.msg } })
        }

    } catch (err) {
        // console.log('err', err)
        ToastAndroid.show(`修改失败：${err}！`, 10)
        dispatch({ type: actionTypes.accidentIndemnifyEditor.modify_accidentIndemnify_error, payload: { errorMsg: err } })
    }
}

export const finishAccidentIndemnify = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        dispatch({ type: actionTypes.accidentIndemnifyEditor.finish_accidentIndemnify_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/truckAccidentInsure/${param.accidentInsureId}/insureStatus/2`
        // console.log('url', url)
        const res = await httpRequest.put(url, {})
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.accidentIndemnifyList.modify_accidentIndemnifyForList, payload: {
                    accidentIndemnify: { insure_status: 2 },
                    accidentInsureId: param.accidentInsureId
                }
            })
            ToastAndroid.show('提交成功！', 10)
            dispatch({ type: actionTypes.accidentIndemnifyEditor.finish_accidentIndemnify_success, payload: {} })

        } else {
            ToastAndroid.show(`提交失败：${res.msg}！`, 10)

            dispatch({ type: actionTypes.accidentIndemnifyEditor.finish_accidentIndemnify_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        // console.log('err', err)
        ToastAndroid.show(`提交失败：${err}！`, 10)
        dispatch({ type: actionTypes.accidentIndemnifyEditor.finish_accidentIndemnify_error, payload: { errorMsg: err } })
    }
}
