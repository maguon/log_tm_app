import * as httpRequest from '../../../../util/HttpRequest'
import * as actionTypes from '../../../../actions/actionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getLocationOptionalList = (param) => async (dispatch, getState) => {
    try {
        const { keyword } = param
        const url = `https://restapi.amap.com/v3/place/text?key=22d16ea40b6fdb3ebc3daa1b48db3287&keywords=${keyword}&children=1&offset=20&page=1&extensions=all&output=JSON`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.status == 1) {
            dispatch({ type: actionTypes.locationOptionalList.get_locationOptionalList_success, payload: { locationOptionalList: res.pois } })
        } else {
            dispatch({ type: actionTypes.locationOptionalList.get_locationOptionalList_failed, payload: { failedMsg: res.info } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.locationOptionalList.get_locationOptionalList_error, payload: { errorMsg: err } })
    }
}

export const getLocationOptionalListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.locationOptionalList.get_locationOptionalList_waiting, payload: {} })
}

export const resetGetLocationOptionalListStatus = () => (dispatch) => {
    dispatch({ type: actionTypes.locationOptionalList.reset_getLocationOptionalList_status, payload: {} })
}

export const setLocationForOptionalList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.locationOptionalList.set_locationForOptionalList, payload: { currentLocation: param } })
}


export const getRegeo = (param) => async (dispatch) => {
    try {
        const url = `https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${param}&key=22d16ea40b6fdb3ebc3daa1b48db3287&radius=1000&extensions=all`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        // console.log('res.regeocode.pois', res.regeocode.pois)
        if (res.status == 1) {
            dispatch({ type: actionTypes.locationOptionalList.get_regeo_success, payload: { locationOptionalList: res.regeocode.pois } })
        } else {
            dispatch({ type: actionTypes.locationOptionalList.get_regeo_failed, payload: { failedMsg: res.info } })
        }

    } catch (err) {
        dispatch({ type: actionTypes.locationOptionalList.get_regeo_error, payload: { errorMsg: err } })

    }
}

export const getRegeoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.locationOptionalList.get_regeo_waiting, payload: {} })
}

export const resetGetRegeoStatue = () => (dispatch) => {
    dispatch({ type: actionTypes.locationOptionalList.reset_getRegeo_status, payload: {} })
}