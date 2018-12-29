import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actions/actionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { sleep } from '../../../util/util'
import { ToastAndroid } from 'react-native'

const pageSize = 20

export const getAccidentList = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        let searchParam = {}
        if (param) {
            searchParam = {
                truckAccidentId: param.accidentId,
                accidentStatus: param.accidentStatus ? param.accidentStatus.id : null,
                truckType: param.truckType ? param.truckType.id : null,
                truckId: param.truck ? param.truck.id : null,
                driveId: param.driver ? param.driver.id : null,
                dpRouteTaskId: param.dpRouteTaskId,
                underUserId: param.underUser ? param.underUser.id : null,
                accidentDateStart: param.accidentDateStart,
                accidentDateEnd: param.accidentDateEnd
            }
        }
        const url = `${base_host}/truckAccident?${ObjectToUrl({ start: 0, size: pageSize, ...searchParam })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.accidentList.get_accidentList_success, payload: {
                    accidentList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                    search: param ? param : null
                }
            })
        } else {
            dispatch({ type: actionTypes.accidentList.get_accidentList_failed, payload: { failedMsg: err } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.accidentList.get_accidentList_error, payload: { errorMsg: err } })
    }
}

export const getAccidentListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.accidentList.get_accidentList_waiting, payload: {} })
}

export const getAccidentListMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const state = getState()
    const { accidentListReducer: { data: { accidentList, isComplete, search } },
        accidentListReducer } = state
    let searchParam = {}
    if (search) {
        searchParam = {
            truckAccidentId: search.accidentId,
            accidentStatus: search.accidentStatus ? search.accidentStatus.id : null,
            truckType: search.truckType ? pasearchram.truckType.id : null,
            truckId: search.truck ? search.truck.id : null,
            driveId: search.driver ? search.driver.id : null,
            dpRouteTaskId: search.dpRouteTaskId,
            underUserId: search.underUser ? search.underUser.id : null,
            accidentDateStart: search.accidentDateStart,
            accidentDateEnd: search.accidentDateEnd
        }
    }
    if (accidentListReducer.getAccidentListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getAccidentListMore)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.accidentList.get_accidentListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/truckAccident?${ObjectToUrl({
                    start: accidentList.length,
                    size: pageSize,
                    ...searchParam
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: actionTypes.accidentList.get_accidentListMore_success, payload: {
                            accidentList: res.result,
                            isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: actionTypes.accidentList.get_accidentListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.accidentList.get_accidentListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.show('已全部加载完毕！', 10)
        }
    }
}