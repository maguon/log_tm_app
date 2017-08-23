import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data:{
        driverInfo: {},
        recordList: [],
    },
    getDriverInfo:{
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getDriverRecord:{
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },    
    updateDriverInfo: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    bindTruck: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    unBindTruck: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    changeDriverStatus: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },   
    updateDrivingImage:{
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    updateLicenseImage:{
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
    [(actionTypes.driverInfoTypes.GET_DriverInfo_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                driverInfo: data[0]
            },
            getDriverInfo: {
                ...state.getDriverInfo,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverInfo_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverInfo: {
                ...state.getDriverInfo,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverInfo_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverInfo: {
                ...state.getDriverInfo,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverInfo_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverInfo: {
                ...state.getDriverInfo,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverInfo_WAITING)]: (state, action) => {
        return {
            ...state,
            getDriverInfo: {
                ...state.getDriverInfo,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.driverInfoTypes.RESET_GET_DriverInfo)]: (state, action) => {
        return {
            ...state,
            getDriverInfo: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.driverInfoTypes.GET_DriverRecord_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                recordList: data[0] ? data[0].comments : [],
            },
            getDriverRecord: {
                ...state.getDriverRecord,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverRecord_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverRecord: {
                ...state.getDriverRecord,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverRecord_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverRecord: {
                ...state.getDriverRecord,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverRecord_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverRecord: {
                ...state.getDriverRecord,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverRecord_WAITING)]: (state, action) => {
        return {
            ...state,
            getDriverRecord: {
                ...state.getDriverRecord,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.driverInfoTypes.RESET_GET_DriverRecord)]: (state, action) => {
        return {
            ...state,
            getDriverRecord: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.driverInfoTypes.ChangeDriverStatus_SUCCESS)]: (state, action) => {
        return {
            ...state,
            changeDriverStatus: {
                ...state.changeDriverStatus,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.ChangeDriverStatus_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeDriverStatus: {
                ...state.changeDriverStatus,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.ChangeDriverStatus_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeDriverStatus: {
                ...state.changeDriverStatus,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.ChangeDriverStatus_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeDriverStatus: {
                ...state.changeDriverStatus,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.ChangeDriverStatus_WAITING)]: (state, action) => {
        return {
            ...state,
            changeDriverStatus: {
                ...state.changeDriverStatus,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.driverInfoTypes.RESET_ChangeDriverStatus)]: (state, action) => {
        return {
            ...state,
            changeDriverStatus: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.driverInfoTypes.BindTruck_SUCCESS)]: (state, action) => {
        return {
            ...state,
            bindTruck:{
                ...state.bindTruck,
                    isResultStatus: 0,
                    isExecStatus: 2
            }
        }

    },
    [(actionTypes.driverInfoTypes.BindTruck_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindTruck: {
                ...state.bindTruck,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.BindTruck_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindTruck: {
                ...state.bindTruck,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.BindTruck_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindTruck: {
                ...state.bindTruck,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.BindTruck_WAITING)]: (state, action) => {
        return {
            ...state,
            bindTruck: {
                ...state.bindTruck,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.driverInfoTypes.RESET_BindTruck)]: (state, action) => {
        return {
            ...state,
            bindTruck: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.driverInfoTypes.UnBindTruck_SUCCESS)]: (state, action) => {
        return {
            ...state,
            unBindTruck: {
                ...state.unBindTruck,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.UnBindTruck_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindTruck: {
                ...state.unBindTruck,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.UnBindTruck_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindTruck: {
                ...state.unBindTruck,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.UnBindTruck_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindTruck: {
                ...state.unBindTruck,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.UnBindTruck_WAITING)]: (state, action) => {
        return {
            ...state,
            unBindTruck: {
                ...state.unBindTruck,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.driverInfoTypes.RESET_UnBindTruck)]: (state, action) => {
        return {
            ...state,
            unBindTruck: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.driverInfoTypes.UPDATE_DriverInfoDrivingImage_SUCCESS)]: (state, action) => {
        return {
            ...state,
            updateDrivingImage: {
                ...state.updateDrivingImage,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.UPDATE_DriverInfoDrivingImage_FAILED)]: (state, action) => {
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
    [(actionTypes.driverInfoTypes.UPDATE_DriverInfoDrivingImage_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.driverInfoTypes.UPDATE_DriverInfoDrivingImage_ERROR)]: (state, action) => {
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
    [(actionTypes.driverInfoTypes.UPDATE_DriverInfoDrivingImage_WAITING)]: (state, action) => {
        return {
            ...state,
            updateDrivingImage: {
                ...state.updateDrivingImage,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.driverInfoTypes.RESET_UPDATE_DriverInfoDrivingImage)]: (state, action) => {
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

    [(actionTypes.driverInfoTypes.UPDATE_DriverInfoLicenseImage_SUCCESS)]: (state, action) => {
        return {
            ...state,
            updateLicenseImage: {
                ...state.updateLicenseImage,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.UPDATE_DriverInfoLicenseImage_FAILED)]: (state, action) => {
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
    [(actionTypes.driverInfoTypes.UPDATE_DriverInfoLicenseImage_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.driverInfoTypes.UPDATE_DriverInfoLicenseImage_ERROR)]: (state, action) => {
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
    [(actionTypes.driverInfoTypes.UPDATE_DriverInfoLicenseImage_WAITING)]: (state, action) => {
        return {
            ...state,
            updateLicenseImage: {
                ...state.updateLicenseImage,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.driverInfoTypes.RESET_UPDATE_DriverInfoLicenseImage)]: (state, action) => {
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

    [(actionTypes.driverInfoTypes.UpdateDriverInfo_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateDriverInfo: {
                ...state.updateDriverInfo,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.UpdateDriverInfo_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateDriverInfo: {
                ...state.updateDriverInfo,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.UpdateDriverInfo_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateDriverInfo: {
                ...state.updateDriverInfo,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.UpdateDriverInfo_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateDriverInfo: {
                ...state.updateDriverInfo,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.UpdateDriverInfo_WAITING)]: (state, action) => {
        return {
            ...state,
            updateDriverInfo: {
                ...state.updateDriverInfo,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.driverInfoTypes.RESET_UpdateDriverInfo)]: (state, action) => {
        return {
            ...state,
            updateDriverInfo: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.driverInfoTypes.CHANGE_DriverInfo_FIELD)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                driverInfo: {
                    ...state.data.driverInfo,
                    ...data
                }
            }
        }
    }
}, initialState)