import httpRequest from '../util/HttpRequest.js'
import { base_host, file_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const updateDrivingImage = (param) => async (dispatch) => {
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImage_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/image`

            param.putParam.truckImage = imageRes.imageId
            let res = await httpRequest.put(url, param.putParam)
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

export const updateLicenseImage = (param) => async (dispatch) => {
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImage_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)  
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/drive/${param.requiredParam.driverId}/image`
            param.putParam.truckImage = imageRes.imageId
            let res = await httpRequest.put(url, param.putParam)
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


