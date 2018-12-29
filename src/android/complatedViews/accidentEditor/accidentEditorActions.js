import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actions/actionTypes'
import { change } from 'redux-form'
import { objectExceptNull } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const getDpRouteTaskForAccidentEditor = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/dpRouteTask?dpRouteTaskId=${param.dp_route_task_id}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.accidentEditor.get_dpRouteTaskForAccidentEditor_success, payload: { dpRouteTask: res.result[0] } })
            dispatch(change('accidentEditorForm', 'task', { id: param.dp_route_task_id, value: `${param.dp_route_task_id}  ${param.city_route_start}->${param.city_route_end}`, item: res.result[0] }))
        } else {
            dispatch({ type: actionTypes.accidentEditor.get_dpRouteTaskForAccidentEditor_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.accidentEditor.get_dpRouteTaskForAccidentEditor_error, payload: { errorMsg: err } })
    }
}


export const getDpRouteTaskForAccidentEditorWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.accidentEditor.get_dpRouteTaskForAccidentEditor_waiting, payload: {} })
}

export const modifyAccident = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        // console.log('getState', getState())
        const { loginReducer: { data: { user: { uid } } } } = getState()
        console.log('param', param)
        const _coordinate = param.accidentAddress.item.location.split(',')
        const url = `${base_host}/user/${uid}/truckAccident/${param.accidentId}`
        console.log('url', url)

        const putParam = objectExceptNull({
            truckId: param.truckType.id,
            driveId: param.task.item.drive_id,
            dpRouteTaskId: param.task.id,
            accidentDate: `${param.accidentDate} ${param.accidentTime}`,
            address: param.accidentAddress.value,
            lng: _coordinate[0],
            lat: _coordinate[1],
            accidentExplain: param.accidentExplain
        })
        const res = await httpRequest.put(url, putParam)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.accidentEditor.modify_accident_success, payload: {} })
            dispatch({
                type: actionTypes.accidentList.modify_accidentForAccidentList, payload: {
                    accident: {
                        accidentId: param.accidentId,
                        ...objectExceptNull({
                            truck_id: param.truckType.id,
                            truck_num: param.truckType.item.truck_num,
                            drive_id: param.task.item.drive_id,
                            drive_name: param.task.item.drive_name,
                            dp_route_task_id: param.task.id,
                            city_route_end: param.task.item.city_route_end,
                            city_route_start: param.task.item.city_route_start,
                            accident_date: `${param.accidentDate} ${param.accidentTime}`,
                            address: param.accidentAddress.value,
                            lng: _coordinate[0],
                            lat: _coordinate[1],
                            accident_explain: param.accidentExplain
                        })
                    }
                }
            })
            ToastAndroid.show('修改成功！', 10)
        } else {
            dispatch({ type: actionTypes.accidentEditor.modify_accident_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.show(`修改失败：${res.msg}！`, 10)
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.accidentEditor.modify_accident_error, payload: { errorMsg: err } })
        ToastAndroid.show(`修改失败：${err}！`, 10)
    }
}