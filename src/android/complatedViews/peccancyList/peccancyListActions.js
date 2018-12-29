import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actions/actionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { sleep } from '../../../util/util'
import { ToastAndroid } from 'react-native'

const pageSize = 50

export const getPeccancyList = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        let searchParam = {}
        if (param) {
            searchParam = {
                driveId: param.driver ? param.driver.id : null,
                statStatus: param.statStatus ? param.statStatus.id : null
            }
        }
        const url = `${base_host}/drivePeccancy?${ObjectToUrl({ start: 0, size: pageSize, ...searchParam })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.peccancyList.get_peccancyList_success, payload: {
                    peccancyList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                    search: param ? param : null
                }
            })
        } else {
            dispatch({ type: actionTypes.peccancyList.get_peccancyList_failed, payload: { failedMsg: err } })
        }
    }
    catch (err) {
        dispatch({ type: actionTypes.peccancyList.get_peccancyList_error, payload: { errorMsg: err } })
    }
}

export const getPeccancyListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.peccancyList.get_peccancyList_waiting, payload: {} })
}

export const cleanPeccancyList = () => (dispatch) => {
    dispatch({ type: actionTypes.peccancyList.clean_peccancyList, payload: {} })
}

export const getPeccancyListMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const state = getState()
    const {
        peccancyListReducer: { data: { peccancyList, isComplete, search } },
        peccancyListReducer } = state
    let searchParam = {}
    if (search) {
        searchParam = {
            driveId: search.driver ? search.driver.id : null,
            statStatus: search.statStatus ? search.statStatus.id : null
        }
    }
    if (peccancyListReducer.getPeccancyListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getPeccancyListMore)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.peccancyList.get_peccancyListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/drivePeccancy?${ObjectToUrl({
                    start: peccancyList.length,
                    size: pageSize,
                    ...searchParam
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.peccancyList.get_peccancyListMore_success, payload: { peccancyList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.peccancyList.get_peccancyListMore_success, payload: { peccancyList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.peccancyList.get_peccancyListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                console.log('err', err)
                dispatch({ type: actionTypes.peccancyList.get_peccancyListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.show('已全部加载完毕！', 10)
        }
    }
}
