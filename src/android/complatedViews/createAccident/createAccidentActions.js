import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actions/actionTypes'
import { objectExceptNull } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import * as actions from '../../../actions'
import { Actions } from 'react-native-router-flux'


export const submit = param => (dispatch, getState) => {
    const { createAccidentReducer: { data: { status } }, createAccidentReducer } = getState()
    console.log('createAccidentReducer', createAccidentReducer)
    if (status == 0) {
        dispatch(createAccident(param))
    } else if (status == 1) {
        dispatch(modifyAccident(param))
    }
}

export const createAccident = (param) => async (dispatch, getState) => {
    try {
        console.log('createAccident')
        dispatch({ type: actionTypes.createAccident.create_accident_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/truckAccident`
        const _coordinate = param.accidentAddress.item.location.split(',')
        const res = await httpRequest.post(url, objectExceptNull({
            truckId: param.truckType.id,
            driveId: param.task.item.drive_id,
            dpRouteTaskId: param.task.id,
            accidentDate: `${param.accidentDate} ${param.accidentTime}`,
            address: param.accidentAddress.value,
            lng: _coordinate[0],
            lat: _coordinate[1],
            accidentExplain: param.accidentExplain
        }))
        // console.log('res', res)
        // console.log('param', param)
        if (res.success) {
            dispatch({ type: actionTypes.createAccident.create_accident_success, payload: { accidentId: res.id, vheNo: param.truckType.item.truck_num } })
            dispatch(actions.accidentList.getAccidentList())
            Actions.uploadImageForCreateAccident()
        } else {
            dispatch({ type: actionTypes.createAccident.create_accident_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.createAccident.create_accident_error, payload: { errorMsg: err } })
    }
}


export const modifyAccident = param => async (dispatch, getState) => {
    try {
        // console.log('modifyAccident')

        dispatch({ type: actionTypes.createAccident.modify_infoForCreateAccident_waiting, payload: {} })
        const { createAccidentReducer: { data: { accidentId } }, loginReducer: { data: { user: { uid } } } } = getState()
        // console.log('param', param)
        const url = `${base_host}/user/${uid}/truckAccident/${accidentId}`
        // console.log('url', url)
        // console.log('putParam', objectExceptNull({
        //     truckId: param.truckType.id,
        //     driveId: param.task.item.drive_id,
        //     dpRouteTaskId: param.task.id,
        //     accidentDate: `${param.accidentDate} ${param.accidentTime}`,
        //     address: param.accidentAddress.value,
        //     lng: _coordinate[0],
        //     lat: _coordinate[1],
        //     accidentExplain: param.accidentExplain
        // }))
        const res = await httpRequest.put(url, objectExceptNull({
            truckId: param.truckType.id,
            driveId: param.task.item.drive_id,
            dpRouteTaskId: param.task.id,
            accidentDate: `${param.accidentDate} ${param.accidentTime}`,
            address: param.accidentAddress.value,
            lng: _coordinate[0],
            lat: _coordinate[1],
            accidentExplain: param.accidentExplain
        }))
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.createAccident.modify_infoForCreateAccident_success, payload: {} })
            dispatch(actions.accidentList.getAccidentList())
        } else {
            dispatch({ type: actionTypes.createAccident.modify_infoForCreateAccident_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.createAccident.modify_infoForCreateAccident_error, payload: { errorMsg: err } })
    }
}

export const cleanCreateAccident = () => (dispatch) => {
    dispatch({ type: actionTypes.createAccident.clean_infoForCreateAccident, payload: {} })
    dispatch({ type: actionTypes.uploadImageForCreateAccident.clean_imageForCreateAccident, payload: {} })
}