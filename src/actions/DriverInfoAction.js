import httpRequest from '../util/HttpRequest.js'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getDriverInfo = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const url = `${base_host}/drive?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
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

export const getDriverRecord = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { record_host } } } = getState()
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

export const changeDriverStatus = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driveId}/driveStatus/${param.requiredParam.driveStatus}`
    dispatch({ type: actionTypes.driverInfoTypes.ChangeDriverStatus_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoTypes.ChangeDriverStatus_SUCCESS, payload: { data: param.requiredParam.driveStatus } })
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

export const bindTruck = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/drive/${param.requiredParam.driverId}/bind`
    dispatch({ type: actionTypes.driverInfoTypes.BindTruck_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoTypes.BindTruck_SUCCESS, payload: { data: { truck_num: param.truck_num, truck_id: param.truck_id } } })
        } else {
            dispatch({ type: actionTypes.driverInfoTypes.BindTruck_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.BindTruck_ERROR, payload: { data: err } })
    }
}

export const unBindTruck = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/drive/${param.requiredParam.driverId}/unbind`
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

export const updateDrivingImage = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host, file_host } } } = getState()
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.driverInfoTypes.UPDATE_DriverInfoDrivingImage_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/image`
            param.putParam.driveImage = imageRes.imageId
            let res = await httpRequest.put(url, param.putParam)
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

export const updateLicenseImage = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host, file_host } } } = getState()
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

export const changeDriverInfoField = (param) => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.CHANGE_DriverInfo_FIELD, payload: { data: param } })
}

export const updateDriverInfo = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
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


//完成
export const updateDrivingImageRe = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host, file_host } } } = getState()
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoDrivingImageRe_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/image`
            param.putParam.driveImage = imageRes.imageId
            let res = await httpRequest.put(url, param.putParam)
            if (res.success) {
                dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoDrivingImageRe_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoDrivingImageRe_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoDrivingImageRe_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoDrivingImageRe_ERROR, payload: { data: err } })
    }
}

//完成
export const resetUpdateDrivingImageRe = () => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.RESET_UPDATE_TruckInfoDrivingImageRe, payload: {} })
}

//完成
export const updateLicenseImageOp = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host, file_host } } } = getState()
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoLicenseImageOp_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/image`
            param.putParam.driveImage = imageRes.imageId
            let res = await httpRequest.put(url, param.putParam)
            if (res.success) {
                dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoLicenseImageOp_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoLicenseImageOp_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoLicenseImageOp_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoLicenseImageOp_ERROR, payload: { data: err } })
    }
}

//完成
export const resetUpdateLicenseImageOp = () => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.RESET_UPDATE_TruckInfoLicenseImageOp, payload: {} })
}

//完成
export const updateDriverAvatarImage = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host, file_host } } } = getState()
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoDriverAvatarImage_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/image`
            param.putParam.driveImage = imageRes.imageId
            let res = await httpRequest.put(url, param.putParam)
            if (res.success) {
                dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoDriverAvatarImage_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoDriverAvatarImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoDriverAvatarImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.UPDATE_TruckInfoDriverAvatarImage_ERROR, payload: { data: err } })
    }
}

//完成
export const resetUpdateDriverAvatarImage = () => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.RESET_UPDATE_TruckInfoDriverAvatarImage, payload: {} })
}
