import httpRequest from '../util/HttpRequest.js'
import { base_host, file_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const updateDrivingImage = (param) => async (dispatch) => {
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.addTruckThirdTypes.UPDATE_TruckThirdDrivingImage_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/image`
            param.putParam.truckImage = imageRes.imageId
            let res = await httpRequest.put(url, param.putParam)
            if (res.success) {
                dispatch({ type: actionTypes.addTruckThirdTypes.UPDATE_TruckThirdDrivingImage_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.addTruckThirdTypes.UPDATE_TruckThirdDrivingImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.addTruckThirdTypes.UPDATE_TruckThirdDrivingImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addTruckThirdTypes.UPDATE_TruckThirdDrivingImage_ERROR, payload: { data: err } })
    }
}

export const updateLicenseImage = (param) => async (dispatch) => {
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.addTruckThirdTypes.UPDATE_TruckThirdLicenseImage_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/image`
            param.putParam.truckImage = imageRes.imageId
            let res = await httpRequest.put(url, param.putParam)
            if (res.success) {
                dispatch({ type: actionTypes.addTruckThirdTypes.UPDATE_TruckThirdLicenseImage_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.addTruckThirdTypes.UPDATE_TruckThirdLicenseImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.addTruckThirdTypes.UPDATE_TruckThirdLicenseImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addTruckThirdTypes.UPDATE_TruckThirdLicenseImage_ERROR, payload: { data: err } })
    }
}

export const createTruckImage = (param) => async (dispatch) => {
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.addTruckThirdTypes.CREATE_TruckThirdTruckImage_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckCode}/image`
            param.postParam.url = imageRes.imageId
            let res = await httpRequest.post(url, param.postParam)
            if (res.success) {
                dispatch({ type: actionTypes.addTruckThirdTypes.CREATE_TruckThirdTruckImage_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.addTruckThirdTypes.CREATE_TruckThirdTruckImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.addTruckThirdTypes.CREATE_TruckThirdTruckImage_FAILED, payload: { data: res.msg } })
        }

    } catch (err) {
        dispatch({ type: actionTypes.addTruckThirdTypes.CREATE_TruckThirdTruckImage_ERROR, payload: { data: err } })
    }
}

export const resetUpdateDrivingImage = () => (dispatch) => {
    dispatch({ type: actionTypes.addTruckThirdTypes.RESET_UPDATE_TruckThirdDrivingImage, payload: {} })
}

export const resetUpdateLicenseImage = () => (dispatch) => {
    dispatch({ type: actionTypes.addTruckThirdTypes.RESET_UPDATE_TruckThirdLicenseImage, payload: {} })
}

export const resetCreateTruckImage = () => (dispatch) => {
    dispatch({ type: actionTypes.addTruckThirdTypes.RESET_CREATE_TruckThirdTruckImage, payload: {} })

}

export const delTruckImage = (param) => async (dispatch) => {
    // http://stg.myxxjs.com:9004/api/user/38/truck/%E8%BE%BDB55560/record
    // http://stg.myxxjs.com:9004/api/user/38/record/5989156c34ef59c532104a82/truck/B55560/image/598c092b100f67405a12341e
    const recordUrl = `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckNum}/record`
    dispatch({ type: actionTypes.addTruckThirdTypes.DEL_TruckThirdTruckImage_WAITING, payload: {} })
    try {
        let recordRes = await httpRequest.get(recordUrl)
            console.log(recordRes)
        
        if (recordRes.success) {
            const url = `${record_host}/user/${param.requiredParam.userId}/record/${recordRes.result[0]._id}/truck/${param.requiredParam.truckNum}/image/${param.requiredParam.url}`
            console.log(url)
            let res = await httpRequest.del(url, {})
            console.log(res)
            if (res.success) {
                dispatch({ type: actionTypes.addTruckThirdTypes.DEL_TruckThirdTruckImage_SUCCESS, payload: { data: res.result.images } })
            }
            else {
                dispatch({ type: actionTypes.addTruckThirdTypes.DEL_TruckThirdTruckImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.addTruckThirdTypes.DEL_TruckThirdTruckImage_FAILED, payload: { data: res.msg } })
        }

    } catch (err) {
        dispatch({ type: actionTypes.addTruckThirdTypes.DEL_TruckThirdTruckImage_ERROR, payload: { data: err } })
    }
}

export const resetDelTruckImage = () => (dispatch) => {
    dispatch({ type: actionTypes.addTruckThirdTypes.RESET_DEL_TruckThirdTruckImage, payload: {} })
}