import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host,file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getDriverInfo = (param) => async (dispatch) => {
    const url = `${base_host}/truckFirst?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_ERROR, payload: { data: err } })
    }
}

export const getDriverRecord = (param) => async (dispatch) => {
    const url = `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckNum}/record`
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_ERROR, payload: { data: err } })
    }
}

export const resetGetDriverInfo = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckInfo, payload: {} })
}

export const resetGetDriverRecord = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckRecord, payload: {} })
}

export const updateDriverInfo = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}`
    dispatch({ type: actionTypes.truckInfoTypes.UpdateTruckInfo_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, param.putParam)
        console.log('res',res)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.UpdateTruckInfo_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.UpdateTruckInfo_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.UpdateTruckInfo_ERROR, payload: { data: err } })
    }
}

export const resetUpdateDriverInfo = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_UpdateTruckInfo, payload: {} })
}

export const changeDriverStatus = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/truckStatus/${param.requiredParam.truckStatus}/first`
    dispatch({ type: actionTypes.truckInfoTypes.ChangeTruckFirstStatus_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.ChangeTruckFirstStatus_SUCCESS, payload: {} })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.ChangeTruckFirstStatus_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.ChangeTruckFirstStatus_ERROR, payload: { data: err } })
    }
}

export const resetChangeDriverStatus = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_ChangeTruckFirstStatus, payload: {} })
}

export const bindTruck = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/trail/${param.requiredParam.trailId}/bind`
    dispatch({ type: actionTypes.truckInfoTypes.BindTrail_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({
                type: actionTypes.truckInfoTypes.BindTrail_SUCCESS, payload: {
                    data: {
                        type: param.type,
                        truck: param.truck,
                        truckId: param.truckId
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.BindTrail_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.BindTrail_ERROR, payload: { data: err } })
    }
}

export const unBindTruck = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/trail/${param.requiredParam.trailId}/unbind`
    dispatch({ type: actionTypes.truckInfoTypes.UnBindTrail_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.UnBindTrail_SUCCESS, payload: {} })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.UnBindTrail_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.UnBindTrail_ERROR, payload: { data: err } })
    }
}

export const resetBindTruck = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_BindTrail, payload: {} })
}

export const resetUnBindTruck = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_UnBindTrail, payload: {} })
}

export const updateDrivingImage = (param) => async (dispatch) => {
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.truckInfoTypes.UPDATE_TruckInfoDrivingImage_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/image`
            param.putParam.truckImage = imageRes.imageId
            let res = await httpRequest.put(url, param.putParam)
            if (res.success) {
                dispatch({ type: actionTypes.truckInfoTypes.UPDATE_TruckInfoDrivingImage_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.truckInfoTypes.UPDATE_TruckInfoDrivingImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.truckInfoTypes.UPDATE_TruckInfoDrivingImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.UPDATE_TruckInfoDrivingImage_ERROR, payload: { data: err } })
    }
}

export const updateLicenseImage = (param) => async (dispatch) => {
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.truckInfoTypes.UPDATE_TruckInfoLicenseImage_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/image`
            param.putParam.truckImage = imageRes.imageId
            let res = await httpRequest.put(url, param.putParam)
            if (res.success) {
                dispatch({ type: actionTypes.truckInfoTypes.UPDATE_TruckInfoLicenseImage_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.truckInfoTypes.UPDATE_TruckInfoLicenseImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.truckInfoTypes.UPDATE_TruckInfoLicenseImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.UPDATE_TruckInfoLicenseImage_ERROR, payload: { data: err } })
    }
}

export const resetUpdateDrivingImage = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_UPDATE_TruckInfoDrivingImage, payload: {} })
}

export const resetUpdateLicenseImage = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_UPDATE_TruckInfoLicenseImage, payload: {} })
}