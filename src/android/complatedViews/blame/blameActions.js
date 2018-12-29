import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actions/actionTypes'
import { objectExceptNull } from '../../../util/ObjectToUrl'

export const getPeccancyStatistics = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/drivePeccancyCount`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.blame.get_peccancyStatistics_success, payload: {
                    peccancyStatistics: res.result && res.result.find(item => item.stat_status == 1) ? res.result.find(item => item.stat_status == 1) : {}
                }
            })
        } else {
            dispatch({ type: actionTypes.blame.get_peccancyStatistics_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.blame.get_peccancyStatistics_error, payload: { errorMsg: err } })
    }
}


export const getExceedOilStatistics = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/driveExceedOilCount`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.blame.get_exceedOilStatistics_success, payload: {
                    overuseDieselOilStatistics: res.result && res.result.find(item => item.stat_status == 1) ? res.result.find(item => item.stat_status == 1) : {}
                }
            })
        } else {
            dispatch({ type: actionTypes.blame.get_exceedOilStatistics_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.blame.get_exceedOilStatistics_error, payload: { errorMsg: err } })
    }
}

export const getTruckAccidentStatistics = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/truckAccidentNotCheckCount`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.blame.get_truckAccidentStatistics_success, payload: {
                    accidentStatistics: {
                        waiting: res.result && res.result.find(item => item.accident_status == 1) ? res.result.find(item => item.accident_status == 1).truck_accident_count : '0',
                        doing: res.result && res.result.find(item => item.accident_status == 2) ? res.result.find(item => item.accident_status == 2).truck_accident_count : '0'
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.blame.get_truckAccidentStatistics_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.blame.get_truckAccidentStatistics_error, payload: { errorMsg: err } })
    }
}


export const getPeccancyStatisticsWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.blame.get_peccancyStatistics_waiting, payload: {} })
}

export const getExceedOilStatisticsWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.blame.get_exceedOilStatistics_waiting, payload: {} })
}

export const getTruckAccidentStatisticsWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.blame.get_truckAccidentStatistics_waiting, payload: {} })
}