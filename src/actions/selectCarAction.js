import httpRequest from '../util/HttpRequest'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { sleep } from '../util/util'
import { getFormValues } from 'redux-form'
import { ToastAndroid } from 'react-native'

const pageSize = 10

export const getCarList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const searchFormValues = getFormValues('searchCarForm')(getState())
        const url = `${base_host}/carList?${ObjectToUrl({
            vinCode: searchFormValues ? searchFormValues.vin : null,
            start: 0,
            active: 1,
            size: pageSize
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0) {
                dispatch({ type: actionTypes.selectCarActionTypes.get_selectCarList_success, payload: { carList: res.result, isComplete: true } })
            } else {
                dispatch({ type: actionTypes.selectCarActionTypes.get_selectCarList_success, payload: { carList: res.result, isComplete: false } })
            }
        } else {
            dispatch({ type: actionTypes.selectCarActionTypes.get_selectCarList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectCarActionTypes.get_selectCarList_error, payload: { errorMsg: err } })
    }
}

export const getCarListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.selectCarActionTypes.get_selectCarList_waiting, payload: {} })
}


export const cleanCarList = () => (dispatch) => {
    dispatch({ type: actionTypes.selectCarActionTypes.clean_selectCarList, payload: {} })
}

// export const getCarListMore = () => async (dispatch, getState) => {
//     const state = getState()
//     const { selectCarReducer: { data: { carList, isComplete } }, selectCarReducer } = state
//     const searchFormValues = getFormValues('SearchCarForm')(state)
//     if (selectCarReducer.getCarListMore.isResultStatus == 1) {
//         await sleep(1000)
//         getCarListMore(dispatch, getState)
//     } else {
//         if (!isComplete) {
//             dispatch({ type: actionTypes.selectCarActionTypes.get_carListMore_waiting, payload: {} })
//             try {
//                 const url = `${base_host}/carList?${ObjectToUrl({
//                     vinCode: searchFormValues ? searchFormValues.vinCode :null,
//                     start: carList.length,
//                     size: pageSize
//                 })}`
//                 const res = await httpRequest.get(url)
//                 if (res.success) {
//                     if (res.result.length % pageSize != 0 || res.result.length == 0) {
//                         dispatch({ type: actionTypes.selectCarActionTypes.get_carListMore_success, payload: { carList: res.result, isComplete: true } })
//                     } else {
//                         dispatch({ type: actionTypes.selectCarActionTypes.get_carListMore_success, payload: { carList: res.result, isComplete: false } })
//                     }
//                 } else {
//                     dispatch({ type: actionTypes.selectCarActionTypes.get_carListMore_failed, payload: { failedMsg: res.msg } })
//                 }
//             } catch (err) {
//                 dispatch({ type: actionTypes.selectCarActionTypes.get_carListMore_error, payload: { errorMsg: err } })
//             }
//         } else {
//             ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
//         }
//     }
// }

