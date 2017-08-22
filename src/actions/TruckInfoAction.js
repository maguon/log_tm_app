import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host,file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getTruckInfo = (param) => async (dispatch) => {
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

export const getTruckRecord = (param) => async (dispatch) => {
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

export const getTruckInsureRel = (param) => async (dispatch) => {
    const url = `${base_host}/truckInsureRel?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsureRel_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsureRel_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsureRel_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsureRel_ERROR, payload: { data: err } })
    }
}

export const resetGetTruckInfo = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckInfo, payload: {} })
}

export const resetGetTruckRecord = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckRecord, payload: {} })
}

export const resetGetTruckInsureRel = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckInsureRel, payload: {} })
}

export const updateTruckInfo = (param) => async (dispatch) => {
    const url = `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}`
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, param.putParam)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_ERROR, payload: { data: err } })
    }
}

export const resetUpdateTruckInfo = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_UpdateTruckInfo, payload: {} })
}

export const changeTruckFirstStatus = (param) => async (dispatch) => {
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

export const changeTruckTrailerStatus = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/truckStatus/${param.requiredParam.truckStatus}/trailer`
    dispatch({ type: actionTypes.truckInfoTypes.ChangeTruckTrailerStatus_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.ChangeTruckTrailerStatus_SUCCESS, payload: {} })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.ChangeTruckTrailerStatus_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.ChangeTruckTrailerStatus_ERROR, payload: { data: err } })
    }
}

export const resetChangeTruckFirstStatus = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_ChangeTruckFirstStatus, payload: {} })
}

export const resetChangeTruckTrailerStatus = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_ChangeTruckTrailerStatus, payload: {} })
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

export const bindDriver = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/drive/${param.requiredParam.driverId}/bind`
    console.log(url)
    dispatch({ type: actionTypes.truckInfoTypes.BindDriver_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
    console.log('res',res)
        
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.BindDriver_SUCCESS, payload: { data: { driverId: param.driverId, driver: param.driver } } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.BindDriver_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.BindDriver_ERROR, payload: { data: err } })
    }
}

export const unBindDriver = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/drive/${param.requiredParam.driverId}/unbind`
    dispatch({ type: actionTypes.truckInfoTypes.UnBindDriver_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.UnBindDriver_SUCCESS, payload: {} })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.UnBindDriver_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.UnBindDriver_ERROR, payload: { data: err } })
    }
}

export const resetBindTruck = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_BindTrail, payload: {} })
}

export const resetUnBindTruck = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_UnBindTrail, payload: {} })
}

export const resetBindDriver = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_BindDriver, payload: {} })
}

export const resetUnBindDriver = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_UnBindDriver, payload: {} })
}

export const getTruckRepairRelList = (param) => async (dispatch) => {
    const url = `${base_host}/truckRepairRel?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_ERROR, payload: { data: err } })
    }
}

export const resetGetTruckRepairRelList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckRepairRelList, payload: {} })
}

export const createTruckRepairRel = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckId}/truckRepairRel`
    dispatch({ type: actionTypes.truckInfoTypes.CreateTruckRepairRel_WAITING, payload: {} })
    try {
        let res = await httpRequest.post(url, param.postParam)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.CreateTruckRepairRel_SUCCESS, payload: {} })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.CreateTruckRepairRel_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.CreateTruckRepairRel_ERROR, payload: { data: err } })
    }
}

export const resetCreateTruckRepairRel = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_CreateTruckRepairRel, payload: {} })
}

export const updateTruckRepairRel = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/truckRepairRel/${param.requiredParam.relId}`
    dispatch({ type: actionTypes.truckInfoTypes.UpdateTruckRepairRel_WAITING, payload: {} })
    try {
        let res = await httpRequest.put(url, param.putParam)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.UpdateTruckRepairRel_SUCCESS, payload: {} })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.UpdateTruckRepairRel_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.UpdateTruckRepairRel_ERROR, payload: { data: err } })
    }
}

export const resetUpdateTruckRepairRel = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_UpdateTruckRepairRel, payload: {} })
}

/////////////////////////////////////////
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

export const createTruckImage = (param) => async (dispatch) => {
    const imageUrl = `${file_host}/user/${param.requiredParam.userId}/image?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.truckInfoTypes.CREATE_TruckInfoTruckImage_WAITING, payload: {} })
    try {
        let imageRes = await httpRequest.postFile(imageUrl, param.postFileParam)
        if (imageRes.success) {
            const url = `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckCode}/image`
            param.postParam.url = imageRes.imageId
            let res = await httpRequest.post(url, param.postParam)
            if (res.success) {
                dispatch({ type: actionTypes.truckInfoTypes.CREATE_TruckInfoTruckImage_SUCCESS, payload: { data: imageRes.imageId } })
            }
            else {
                dispatch({ type: actionTypes.truckInfoTypes.CREATE_TruckInfoTruckImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.truckInfoTypes.CREATE_TruckInfoTruckImage_FAILED, payload: { data: res.msg } })
        }

    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.CREATE_TruckInfoTruckImage_ERROR, payload: { data: err } })
    }
}

export const resetUpdateDrivingImage = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_UPDATE_TruckInfoDrivingImage, payload: {} })
}

export const resetUpdateLicenseImage = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_UPDATE_TruckInfoLicenseImage, payload: {} })
}

export const resetCreateTruckImage = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_CREATE_TruckInfoTruckImage, payload: {} })

}

export const delTruckImage = (param) => async (dispatch) => {
    const recordUrl = `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckNum}/record`
    dispatch({ type: actionTypes.truckInfoTypes.DEL_TruckInfoTruckImage_WAITING, payload: {} })
    try {
        let recordRes = await httpRequest.get(recordUrl)    
        if (recordRes.success) {
            const url = `${record_host}/user/${param.requiredParam.userId}/record/${recordRes.result[0]._id}/truck/${param.requiredParam.truckNum}/image/${param.requiredParam.url}`
            let res = await httpRequest.del(url, {})
            if (res.success) {
                dispatch({ type: actionTypes.truckInfoTypes.DEL_TruckInfoTruckImage_SUCCESS, payload: { data: res.result.images } })
            }
            else {
                dispatch({ type: actionTypes.truckInfoTypes.DEL_TruckInfoTruckImage_FAILED, payload: { data: res.msg } })
            }
        }
        else {
            dispatch({ type: actionTypes.truckInfoTypes.DEL_TruckInfoTruckImage_FAILED, payload: { data: res.msg } })
        }

    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.DEL_TruckInfoTruckImage_ERROR, payload: { data: err } })
    }
}

export const resetDelTruckImage = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_DEL_TruckInfoTruckImage, payload: {} })
}

export const changeTruckInfoField = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.CHANGE_TruckInfo_FIELD, payload: { data: param } })
}

