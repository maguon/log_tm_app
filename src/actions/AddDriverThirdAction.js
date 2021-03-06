import httpRequest from '../util/HttpRequest.js'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const updateDrivingImage = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host, file_host } } } = getState()
        const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
        dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImage_WAITING, payload: {} })
        const imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/image`
            param.putParam.driveImage = imageRes.imageId
            const res = await httpRequest.put(url, param.putParam)
            if (res.success) {
                dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImage_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImage_ERROR, payload: { data: err } })
    }
}

export const updateDrivingImageRe = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host, file_host } } } = getState()

        const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
        dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImageRe_WAITING, payload: {} })
        const imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/image`
            param.putParam.driveImage = imageRes.imageId
            const res = await httpRequest.put(url, param.putParam)
            if (res.success) {
                dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImageRe_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImageRe_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImageRe_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImageRe_ERROR, payload: { data: err } })
    }
}

export const updateDriverAvatarImage = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host, file_host } } } = getState()

        const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
        dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDriverAvatarImage_WAITING, payload: {} })
        const imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/image`
            param.putParam.driveImage = imageRes.imageId
            const res = await httpRequest.put(url, param.putParam)
            if (res.success) {
                dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDriverAvatarImage_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDriverAvatarImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDriverAvatarImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDriverAvatarImage_ERROR, payload: { data: err } })
    }
}

export const updateLicenseImageOp = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host, file_host } } } = getState()

        const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
        dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImageOp_WAITING, payload: {} })
        const imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/image`
            param.putParam.driveImage = imageRes.imageId
            const res = await httpRequest.put(url, param.putParam)
            if (res.success) {
                dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImageOp_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImageOp_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImageOp_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImageOp_ERROR, payload: { data: err } })
    }
}

export const updateLicenseImage = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host, file_host } } } = getState()

        const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
        dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImage_WAITING, payload: {} })
        const imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/image`
            param.putParam.driveImage = imageRes.imageId
            const res = await httpRequest.put(url, param.putParam)
            if (res.success) {
                dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImage_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImage_ERROR, payload: { data: err } })
    }
}

export const resetUpdateDrivingImage = () => (dispatch) => {
    dispatch({ type: actionTypes.addDriverThirdTypes.RESET_UPDATE_DriverThirdDrivingImage, payload: {} })
}

export const resetUpdateLicenseImage = () => (dispatch) => {
    dispatch({ type: actionTypes.addDriverThirdTypes.RESET_UPDATE_DriverThirdLicenseImage, payload: {} })
}

export const cleanAddDriverThirdDate = () => (dispatch) => {
    dispatch({ type: actionTypes.addDriverThirdTypes.CLEAN_AddDriverThirdReducer, payload: {} })
}

export const resetUpdateDrivingImageRe = () => (dispatch) => {
    dispatch({ type: actionTypes.addDriverThirdTypes.RESET_UPDATE_DriverThirdDrivingImageRe, payload: {} })
}

export const resetUpdateLicenseImageOp = () => (dispatch) => {
    dispatch({ type: actionTypes.addDriverThirdTypes.RESET_UPDATE_DriverThirdLicenseImageOp, payload: {} })
}

export const resetUpdateDriverAvatarImage = () => (dispatch) => {
    dispatch({ type: actionTypes.addDriverThirdTypes.RESET_UPDATE_DriverThirdDriverAvatarImage, payload: {} })
}


