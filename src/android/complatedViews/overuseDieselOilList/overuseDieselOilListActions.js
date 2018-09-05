import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actions/actionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { sleep } from '../../../util/util'
import { ToastAndroid } from 'react-native'

const pageSize = 50

export const getOveruseDieselOilList = (param) => async (dispatch, getState) => {
    try {
        let searchParam = {}
        if (param) {
            searchParam = {
                driveId: param.driver ? param.driver.id : null,
                statStatus: param.statStatus ? param.statStatus.id : null
            }
        }
        const url = `${base_host}/driveExceedOil?${ObjectToUrl({ start: 0, size: pageSize, ...searchParam })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.overuseDieselOilList.get_overuseDieselOilList_success, payload: {
                    overuseDieselOilList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                    search: param ? param : null
                }
            })
        } else {
            dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilList_failed, payload: { failedMsg: err } })
        }
    }
    catch (err) {
        dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilList_error, payload: { errorMsg: err } })
    }
}

export const getOveruseDieselOilListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilList_waiting, payload: {} })
}

export const cleanOveruseDieselOilList = () => (dispatch) => {
    dispatch({ type: actionTypes.overuseDieselOilList.clean_overuseDieselOilList, payload: {} })
}

export const getOveruseDieselOilListMore = () => async (dispatch, getState) => {
    const state = getState()
    const {
        overuseDieselOilListReducer: { data: { overuseDieselOilList, isComplete, search } },
        overuseDieselOilListReducer } = state
    let searchParam = {}
    if (search) {
        searchParam = {
            driveId: search.driver ? search.driver.id : null,
            statStatus: search.statStatus ? search.statStatus.id : null
        }
    }
    if (overuseDieselOilListReducer.getOveruseDieselOilListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getOveruseDieselOilListMore)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/driveExceedOil?${ObjectToUrl({
                    start: overuseDieselOilList.length,
                    size: pageSize,
                    ...searchParam
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_success, payload: { overuseDieselOilList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_success, payload: { overuseDieselOilList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.show('已全部加载完毕！', 10)
        }
    }
}