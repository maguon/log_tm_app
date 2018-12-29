import * as httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actions/actionTypes'
import { ObjectToUrl, objectExceptNull } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const uploadAccidentImageWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.uploadImageForCreateAccident.upload_imageForCreateAccident_waiting, payload: {} })
}

export const uploadAccidentImage = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { file_host, record_host } } } = getState()
        const { cameraReses } = param
        // console.log('param', param)
        const cameraSuccessReses = cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { loginReducer: { data: { user } }, createAccidentReducer: { data: { accidentId, vheNo } }, createAccidentReducer } = getState()
            // console.log('createAccidentReducer', createAccidentReducer)
            const imageUploadUrl = `${file_host}/user/${user.uid}/image?${ObjectToUrl({ imageType: 5 })}`
            // console.log('imageUploadUrl', imageUploadUrl)
            const imageUploadReses = await Promise.all(cameraSuccessReses.map(item => httpRequest.postFile(imageUploadUrl, {
                key: 'image',
                ...item.res
            })))
            // console.log('imageUploadReses', imageUploadReses)

            const imageUploadSuccessReses = imageUploadReses.filter(item => item.success)
            if (imageUploadSuccessReses.length > 0) {
                const bindCarUrl = url = `${record_host}/user/${user.uid}/truckDamage/${accidentId}/image`
                // console.log('bindCarUrl', bindCarUrl)
                const bindCarReses = await Promise.all(imageUploadSuccessReses.map(item => httpRequest.post(bindCarUrl, {
                    username: user.real_name,
                    userId: user.uid,
                    userType: user.type,
                    url: item.imageId,
                    vheNo
                })))
                // console.log('bindCarReses', bindCarReses)
                const imageList = bindCarReses
                    .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, res: item, } })
                    .filter(item => item.res.success)
                    .map(item => {
                        return item.imageId
                    })
                // console.log('imageList', imageList)
                if (cameraReses.length === imageList.length) {
                    const getRecordIdUrl = `${record_host}/truckDamage?truckDamageId=${accidentId}`
                    // console.log('getRecordIdUrl', getRecordIdUrl)
                    const getRecordIdRes = await httpRequest.get(getRecordIdUrl)
                    // console.log('getRecordIdRes', getRecordIdRes)
                    const recordId = getRecordIdRes.result[0]._id
                    ToastAndroid.show('照片上传成功！', 10)
                    dispatch({ type: actionTypes.uploadImageForCreateAccident.upload_imageForCreateAccident_success, payload: { imageList: imageList, recordId } })
                } else if (imageList.length > 0) {
                    const getRecordIdUrl = `${record_host}/truckDamage?truckDamageId=${accidentId}`
                    // console.log('getRecordIdUrl', getRecordIdUrl)
                    const getRecordIdRes = await httpRequest.get(getRecordIdUrl)
                    // console.log('getRecordIdRes', getRecordIdRes)
                    const recordId = getRecordIdRes.result[0]._id
                    ToastAndroid.show(`照片上传部分成功：${bindCarSuccessReses.length}/${cameraReses.length}！`, 10)
                    dispatch({ type: actionTypes.uploadImageForCreateAccident.upload_imageForCreateAccident_partSuccess, payload: { imageList: imageList, recordId, failedMsg: '部分失败' } })
                } else {
                    ToastAndroid.show('照片上传全部失败！', 10)
                    dispatch({ type: actionTypes.uploadImageForCreateAccident.upload_imageForCreateAccident_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                ToastAndroid.show('照片上传全部失败！', 10)
                dispatch({ type: actionTypes.uploadImageForCreateAccident.upload_imageForCreateAccident_failed, payload: { failedMsg: '全部失败' } })
            }
        } else {
            ToastAndroid.show('照片上传全部失败！', 10)
            dispatch({ type: actionTypes.uploadImageForCreateAccident.upload_imageForCreateAccident_failed, payload: { failedMsg: '拍照全部失败' } })
        }
    }
    catch (err) {
        console.log('err', err)
        ToastAndroid.show(`照片上传全部失败:${err}！`, 10)
        dispatch({ type: actionTypes.uploadImageForCreateAccident.upload_imageForCreateAccident_error, payload: { errorMsg: err } })
    }
}


export const setIndexForUploadImageForCreateAccident = param => (dispatch) => {
    const { index } = param
    dispatch({ type: actionTypes.uploadImageForCreateAccident.set_indexForUploadImageForCreateAccident, payload: { index } })
}

export const getImageForCreateAccident = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { record_host } } } = getState()
        const url = `${record_host}/truckDamage?truckDamageId=${param.accidentId}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.uploadImageForCreateAccident.get_imageForCreateAccident_success, payload: {
                    imageList: res.result[0] ? res.result[0].damage_image.map(item => item.url) : [],
                    recordId: res.result[0] ? res.result[0]._id : null,
                }
            })
        } else {
            dispatch({ type: actionTypes.uploadImageForCreateAccident.get_imageForCreateAccident_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.uploadImageForCreateAccident.get_imageForCreateAccident_error, payload: { errorMsg: err } })
    }
}

export const getImageForCreateAccidentWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.uploadImageForCreateAccident.get_imageForCreateAccident_waiting, payload: {} })
}


export const delImageForCreateAccident = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { record_host } } } = getState()
        dispatch({ type: actionTypes.uploadImageForCreateAccident.del_imageForCreateAccident_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } }, uploadImageForCreateAccidentReducer: { data: { recordId, index, imageList } } } = getState()
        const url = `${record_host}/user/${uid}/record/${recordId}/truckDamageImage/${imageList[index]}`
        // console.log('url', url)
        const res = await httpRequest.del(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.uploadImageForCreateAccident.del_imageForCreateAccident_success, payload: { url: imageList[index] } })
        } else {
            dispatch({ type: actionTypes.uploadImageForCreateAccident.del_imageForCreateAccident_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.uploadImageForCreateAccident.del_imageForCreateAccident_error, payload: { errorMsg: err } })

    }
}