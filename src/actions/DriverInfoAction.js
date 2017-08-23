import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host,file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getDriverInfo = (param) => async (dispatch) => {
    const url = `${base_host}/drive?${ObjectToUrl(param.OptionalParam)}`
    console.log(url)
    dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        console.log('res',res)
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_ERROR, payload: { data: err } })
    }
}

export const resetGetDriverInfo = (param) => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.RESET_GET_DriverInfo, payload: {} })
}

export const getDriverRecord = (param) => async (dispatch) => {
    const url = `${record_host}/user/${param.requiredParam.userId}/tuser/${param.requiredParam.driverId}/record`

    dispatch({ type: actionTypes.driverInfoTypes.GET_DriverRecord_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoTypes.GET_DriverRecord_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.driverInfoTypes.GET_DriverRecord_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.GET_DriverRecord_ERROR, payload: { data: err } })
    }
}

export const resetGetDriverRecord = (param) => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.RESET_GET_DriverRecord, payload: {} })
}

export const changeDriverStatus = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/driveStatus/${param.requiredParam.driverStatus}`
    dispatch({ type: actionTypes.driverInfoTypes.ChangeDriverStatus_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoTypes.ChangeDriverStatus_SUCCESS, payload: {} })
        } else {
            dispatch({ type: actionTypes.driverInfoTypes.ChangeDriverStatus_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.ChangeDriverStatus_ERROR, payload: { data: err } })
    }
}

export const resetChangeDriverStatus = () => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.RESET_ChangeDriverStatus, payload: {} })
}

export const bindTruck = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/drive/${param.requiredParam.driverId}/bind`
    dispatch({ type: actionTypes.driverInfoTypes.BindTruck_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {}) 
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoTypes.BindTruck_SUCCESS, payload: { data: { driverId: param.driverId, driver: param.driver } } })
        } else {
            dispatch({ type: actionTypes.driverInfoTypes.BindTruck_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.BindTruck_ERROR, payload: { data: err } })
    }
}

export const unBindTruck = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/trail/${param.requiredParam.trailId}/unbind`
    dispatch({ type: actionTypes.driverInfoTypes.UnBindTruck_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoTypes.UnBindTruck_SUCCESS, payload: {} })
        } else {
            dispatch({ type: actionTypes.driverInfoTypes.UnBindTruck_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.UnBindTruck_ERROR, payload: { data: err } })
    }
}

export const resetBindTruck = () => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.RESET_BindTruck, payload: {} })
}

export const resetUnBindTruck = () => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.RESET_UnBindTruck, payload: {} })
}

export const updateDrivingImage = (param) => async (dispatch) => {
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    console.log('imageUrl',imageUrl)
    dispatch({ type: actionTypes.driverInfoTypes.UPDATE_DriverInfoDrivingImage_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
    console.log('imageRes',imageRes)
        
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/image`
    console.log('url',url)
            
            param.putParam.driveImage = imageRes.imageId
            console.log(param)
            let res = await httpRequest.put(url, param.putParam)
    console.log('res',res)
            
            if (res.success) {
                dispatch({ type: actionTypes.driverInfoTypes.UPDATE_DriverInfoDrivingImage_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.driverInfoTypes.UPDATE_DriverInfoDrivingImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.driverInfoTypes.UPDATE_DriverInfoDrivingImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.UPDATE_DriverInfoDrivingImage_ERROR, payload: { data: err } })
    }
}

export const updateLicenseImage = (param) => async (dispatch) => {
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.driverInfoTypes.UPDATE_DriverInfoLicenseImage_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)  
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/image`
            param.putParam.driveImage = imageRes.imageId
            let res = await httpRequest.put(url, param.putParam)
            if (res.success) {
                dispatch({ type: actionTypes.driverInfoTypes.UPDATE_DriverInfoLicenseImage_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.driverInfoTypes.UPDATE_DriverInfoLicenseImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.driverInfoTypes.UPDATE_DriverInfoLicenseImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.UPDATE_DriverInfoLicenseImage_ERROR, payload: { data: err } })
    }
}

export const resetUpdateDrivingImage = () => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.RESET_UPDATE_DriverInfoDrivingImage, payload: {} })
}

export const resetUpdateLicenseImage = () => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.RESET_UPDATE_DriverInfoLicenseImage, payload: {} })
}

///////////////////////////////////////////
export const updateDriverInfo = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.truckId}`
    dispatch({ type: actionTypes.driverInfoTypes.UpdateDriverInfo_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, param.putParam)
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoTypes.UpdateDriverInfo_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.driverInfoTypes.UpdateDriverInfo_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.UpdateDriverInfo_ERROR, payload: { data: err } })
    }
}

export const resetUpdateDriverInfo = (param) => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.RESET_UpdateDriverInfo, payload: {} })
}
