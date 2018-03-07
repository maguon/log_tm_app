import * as httpRequest from '../../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../../config/Host'
import * as applyDamageSubmitActionTypes from './ApplyDamageSubmitActionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'
import { getFormValues } from 'redux-form'
import { ToastAndroid, InteractionManager } from 'react-native'
import {Actions} from 'react-native-router-flux'
//import * as carInfoRecordAction from '../../carInfo/carInfoRecord/CarInfoRecordAction'
import * as routerDirection from '../../../../util/RouterDirection'

export const createDamage = (parent) => async (dispatch, getState) => {
    dispatch({ type: applyDamageSubmitActionTypes.create_Damage_waiting, payload: {} })
    const state = getState()
    const { loginReducer: { data: { user: { uid } } }} = state
    const applyDamageForm = getFormValues('applyDamage')(state) ? getFormValues('applyDamage')(state) : { driver: {},car:{} }
    try {
        const url = `${base_host}/user/${uid}/damage`
        const res = await httpRequest.post(url, {
            carId: applyDamageForm.car.id,
            vin: applyDamageForm.car.value,
            truckId: applyDamageForm.driver.truck_id,
            truckNum: applyDamageForm.driver.truck_num,
            driveId: applyDamageForm.driver.id,
            driveName: applyDamageForm.driver.value,
            damageExplain: applyDamageForm.damageExplain
        })
        if (res.success) {
            ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: applyDamageSubmitActionTypes.create_Damage_success, payload: { damageId: res.id,
                vin: applyDamageForm.car.value} })
            Actions.applyDamageUploadImage()
            //routerDirection.applyDamageUploadImage(parent)()
            // carInfoRecordAction.getCarInfoRecordWaiting()(dispatch)
            //InteractionManager.runAfterInteractions(() => carInfoRecordAction.getCarInfoRecord({ car_id: carDetail.id })(dispatch, getState))
        } else {
            ToastAndroid.showWithGravity(`提交失败！${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: applyDamageSubmitActionTypes.create_Damage_failed, payload: { failedMsg: res.msg } })
        }
    }
    catch (err) {
        ToastAndroid.showWithGravity(`提交失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: applyDamageSubmitActionTypes.create_Damage_error, payload: { errorMsg: err } })
    }
}