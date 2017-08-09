import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        drivingImage: '',
        licenseImage: '',
        truckImageList: []
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
    createTruckImage: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.addTruckThirdTypes.UPDATE_TruckThirdDrivingImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {}
    },
    [(actionTypes.addTruckThirdTypes.UPDATE_TruckThirdDrivingImage_FAILED)]: (state, action) => {
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
    [(actionTypes.addTruckThirdTypes.UPDATE_TruckThirdDrivingImage_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.addTruckThirdTypes.UPDATE_TruckThirdDrivingImage_ERROR)]: (state, action) => {
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
    [(actionTypes.addTruckThirdTypes.UPDATE_TruckThirdDrivingImage_WAITING)]: (state, action) => {
        return {
            ...state,
            updateDrivingImage: {
                ...state.updateDrivingImage,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addTruckThirdTypes.RESET_UPDATE_TruckThirdDrivingImage)]: (state, action) => {
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

    [(actionTypes.addTruckThirdTypes.UPDATE_TruckThirdLicenseImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {}
    },
    [(actionTypes.addTruckThirdTypes.UPDATE_TruckThirdLicenseImage_FAILED)]: (state, action) => {
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
    [(actionTypes.addTruckThirdTypes.UPDATE_TruckThirdLicenseImage_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.addTruckThirdTypes.UPDATE_TruckThirdLicenseImage_ERROR)]: (state, action) => {
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
    [(actionTypes.addTruckThirdTypes.UPDATE_TruckThirdLicenseImage_WAITING)]: (state, action) => {
        return {
            ...state,
            updateLicenseImage: {
                ...state.updateLicenseImage,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addTruckThirdTypes.RESET_UPDATE_TruckThirdLicenseImage)]: (state, action) => {
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


    [(actionTypes.addTruckThirdTypes.CREATE_TruckThirdTruckImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {}
    },
    [(actionTypes.addTruckThirdTypes.CREATE_TruckThirdTruckImage_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createTruckImage: {
                ...state.createTruckImage,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckThirdTypes.CREATE_TruckThirdTruckImage_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createTruckImage: {
                ...state.createTruckImage,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckThirdTypes.CREATE_TruckThirdTruckImage_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createTruckImage: {
                ...state.createTruckImage,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckThirdTypes.CREATE_TruckThirdTruckImage_WAITING)]: (state, action) => {
        return {
            ...state,
            createTruckImage: {
                ...state.createTruckImage,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addTruckThirdTypes.RESET_CREATE_TruckThirdTruckImage)]: (state, action) => {
        return {
            ...state,
            createTruckImage: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

}, initialState)