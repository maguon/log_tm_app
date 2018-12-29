import httpRequest from '../util/HttpRequest.js'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getMakeList = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const url = `${base_host}/brand`
    dispatch({ type: actionTypes.selectMakeTypes.GET_MakeList_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectMakeTypes.GET_MakeList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.selectMakeTypes.GET_MakeList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectMakeTypes.GET_MakeList_ERROR, payload: { data: err } })
    }
}