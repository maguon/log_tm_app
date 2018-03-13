import httpRequest from '../util/HttpRequest'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { Toast } from 'native-base'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import { sleep } from '../util/util'

const pageSize = 50

export const getTruckHomeFilterList = (param) => async (dispatch) => {
    try {
        const url = `${base_host}/truckFirst?${ObjectToUrl({ ...param.OptionalParam, start: 0, size: pageSize })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({ type: actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterList_success, payload: { truckList: res.result, isComplete: true } })
            } else {
                dispatch({ type: actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterList_success, payload: { truckList: res.result, isComplete: false } })
            }
        } else {
            dispatch({ type: actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterList_error, payload: { errorMsg: err } })
    }
}

export const getTruckHomeFilterListMore = (param) => async (dispatch, getState) => {
    const {
        truckHomeFilterListReducer: { data: { truckList, isComplete } },
        truckHomeFilterListReducer } = getState()
    if (truckHomeFilterListReducer.getTruckHomeFilterListMore.isResultStatus == 1) {
        await sleep(1000)
        getTruckHomeFilterListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/truckFirst?${ObjectToUrl({ ...param.OptionalParam, start: truckList.length, size: pageSize })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterListMore_success,
                        payload: {
                            truckList: res.result,
                            isComplete: (res.result.length % pageSize != 0 || res.result.length == 0)
                        }
                    })
                } else {
                    dispatch({ type: actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterListMore_error, payload: { errorMsg: err } })
            }
        } else {
            // Toast.show({
            //     text: 'Wrong password!',
            //     position: 'bottom',
            //     buttonText: 'Okay'
            //   })
           ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }
}

export const getTruckHomeFilterListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.truckHomeFilterListTypes.get_TruckHomeFilterList_waiting, payload: {} })
}
