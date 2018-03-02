import * as httpRequest from '../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../config/Host'
import * as applyDamageUploadImageActionTypes from './ApplyDamageUploadImageActionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const uploadDamageImage = (params) => async (dispatch, getState) => {
    try {
        const { userReducer: { user: { userId } },
            applyDamageSubmitReducer: { data: { damageId, vin } } } = getState()
        const getUserInfoUrl = `${base_host}/user?userId=${userId}`
        const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
        if (getUserInfoRes.success) {
            const cameraSuccessReses = params.filter(item => item.success)
            if (cameraSuccessReses.length > 0) {
                const imageUploadUrl = `${file_host}/user/${userId}/image?${ObjectToUrl({ imageType: 4 })}`
                const imageUploadReses = await Promise.all(cameraSuccessReses.map(item => httpRequest.postFile(imageUploadUrl, {
                    key: 'image',
                    ...item.res
                })))
                const imageUploadSuccessReses = imageUploadReses.filter(item => item.success)
                if (imageUploadSuccessReses.length > 0) {
                    const bindDamageUrl = `${record_host}/user/${userId}/damage/${damageId}/image`
                    const bindDamageReses = await Promise.all(imageUploadSuccessReses.map(item => httpRequest.post(bindDamageUrl, {
                        username: getUserInfoRes.result[0].real_name,
                        userId: getUserInfoRes.result[0].uid,
                        userType: getUserInfoRes.result[0].type,
                        url: item.imageId,
                        vin
                    })))
                    const bindDamageSuccessReses = bindDamageReses
                        .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, success: item.success } })
                        .filter(item => item.success)
                        .map(item => item.imageId)
                    if (params.length === bindDamageSuccessReses.length) {
                        ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                        dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_success, payload: { imageList: bindDamageSuccessReses } })
                    } else if (bindDamageSuccessReses.length > 0) {
                        ToastAndroid.showWithGravity(`部分提交成功：${bindDamageSuccessReses.length}/${params.length}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                        dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_partSuccess, payload: { imageList: bindDamageSuccessReses, failedMsg: '部分失败' } })
                    } else {
                        ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                        dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_failed, payload: { failedMsg: '全部失败' } })
                    }
                } else {
                    ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                ToastAndroid.showWithGravity('拍照全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_failed, payload: { failedMsg: '拍照全部失败' } })
            }
        } else {
            ToastAndroid.showWithGravity('拍照全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_failed, payload: { failedMsg: '拍照全部失败' } })
        }
    }
    catch (err) {
        ToastAndroid.showWithGravity(`提交全部失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_error, payload: { errorMsg: err } })
    }
}

export const uploadDamageImageWating = (param) => (dispatch, getState) => {
    dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_waiting, payload: {} })
}