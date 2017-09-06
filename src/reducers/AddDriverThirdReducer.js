import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        drivingImage: null,
        licenseImage: null,
        drivingImageRe: null,
        licenseImageOp: null,
        driverAvatarImage: null
    },
    updateDrivingImage: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    updateLicenseImage: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    updateDriverImageRe: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    updateLicenseImageOp: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    updateDriverAvatarImage: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                drivingImage: data
            },
            updateDrivingImage: {
                ...state.updateDrivingImage,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImage_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateDrivingImage: {
                ...state.updateDrivingImage,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImage_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateDrivingImage: {
                ...state.updateDrivingImage,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImage_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateDrivingImage: {
                ...state.updateDrivingImage,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImage_WAITING)]: (state, action) => {
        return {
            ...state,
            updateDrivingImage: {
                ...state.updateDrivingImage,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.RESET_UPDATE_DriverThirdDrivingImage)]: (state, action) => {
        return {
            ...state,
            updateDrivingImage: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                licenseImage: data
            },
            updateLicenseImage: {
                ...state.updateLicenseImage,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImage_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateLicenseImage: {
                ...state.updateLicenseImage,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImage_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateLicenseImage: {
                ...state.updateLicenseImage,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImage_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateLicenseImage: {
                ...state.updateLicenseImage,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImage_WAITING)]: (state, action) => {
        return {
            ...state,
            updateLicenseImage: {
                ...state.updateLicenseImage,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.RESET_UPDATE_DriverThirdLicenseImage)]: (state, action) => {
        return {
            ...state,
            updateLicenseImage: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.addDriverThirdTypes.CLEAN_AddDriverThirdReducer)]: (state, action) => {
        const { payload: { data } } = action
        return {
            data: {
                drivingImage: null,
                licenseImage: null
            },
            updateDrivingImage: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            },
            updateLicenseImage: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    //完成
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImageRe_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                drivingImageRe: data
            },
            updateDriverImageRe: {
                ...state.updateDriverImageRe,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImageRe_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateDriverImageRe: {
                ...state.updateDriverImageRe,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImageRe_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateDriverImageRe: {
                ...state.updateDriverImageRe,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImageRe_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateDriverImageRe: {
                ...state.updateDriverImageRe,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDrivingImageRe_WAITING)]: (state, action) => {
        return {
            ...state,
            updateDriverImageRe: {
                ...state.updateDriverImageRe,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.RESET_UPDATE_DriverThirdDrivingImageRe)]: (state, action) => {
        return {
            ...state,
            updateDriverImageRe: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    //完成
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImageOp_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                licenseImageOp: data
            },
            updateLicenseImageOp: {
                ...state.updateLicenseImageOp,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImageOp_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateLicenseImageOp: {
                ...state.updateLicenseImageOp,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImageOp_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateLicenseImageOp: {
                ...state.updateLicenseImageOp,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImageOp_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateLicenseImageOp: {
                ...state.updateLicenseImageOp,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdLicenseImageOp_WAITING)]: (state, action) => {
        return {
            ...state,
            updateLicenseImageOp: {
                ...state.updateLicenseImageOp,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.RESET_UPDATE_DriverThirdLicenseImageOp)]: (state, action) => {
        return {
            ...state,
            updateLicenseImageOp: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    //完成
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDriverAvatarImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                driverAvatarImage: data
            },
            updateDriverAvatarImage: {
                ...state.updateDriverAvatarImage,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDriverAvatarImage_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateDriverAvatarImage: {
                ...state.updateDriverAvatarImage,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDriverAvatarImage_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateDriverAvatarImage: {
                ...state.updateDriverAvatarImage,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDriverAvatarImage_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateDriverAvatarImage: {
                ...state.updateDriverAvatarImage,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.UPDATE_DriverThirdDriverAvatarImage_WAITING)]: (state, action) => {
        return {
            ...state,
            updateDriverAvatarImage: {
                ...state.updateDriverAvatarImage,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addDriverThirdTypes.RESET_UPDATE_DriverThirdDriverAvatarImage)]: (state, action) => {
        return {
            ...state,
            updateDriverAvatarImage: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    }

}, initialState)