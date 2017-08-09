import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        bindTractorId: '',
        bindTractor: '',
        bindTrailerId: '',
        bindTrailer: '',
        bindDriverId: '',
        bindDriver: ''
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
    bindDriver: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    unBindDriver: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindTruck_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        let newState
        if (data.type == 1) {
            newState = {
                ...state,
                data: {
                    ...state.data,
                    bindTrailerId: data.truckId,
                    bindTrailer: data.truck,
                },
                bindTruck: {
                    ...state.bindTruck,
                    isResultStatus: 0,
                    isExecStatus: 2
                }
            }
        } else if (data.type == 2) {
            newState = {
                ...state,
                data: {
                    ...state.data,
                    bindTractorId: data.truckId,
                    bindTractor: data.truck,
                },
                bindTruck: {
                    ...state.bindTruck,
                    isResultStatus: 0,
                    isExecStatus: 2
                }
            }
        }
        return newState
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindTruck_FAILED)]: (state, action) => {
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
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindTruck_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindTruck_ERROR)]: (state, action) => {
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
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindTruck_WAITING)]: (state, action) => {
        return {
            ...state,
            bindTruck: {
                ...state.bindTruck,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.RESET_CREATE_TruckSecondBindTruck)]: (state, action) => {
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


    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindTruck_SUCCESS)]: (state, action) => {
        return {
            ...state,
            data: {
                ...state.data,
                bindTractorId: '',
                bindTractor: '',
                bindTrailerId: '',
                bindTrailer: ''
            },
            unBindTruck: {
                ...state.unBindTruck,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindTruck_FAILED)]: (state, action) => {
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
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindTruck_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindTruck_ERROR)]: (state, action) => {
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
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindTruck_WAITING)]: (state, action) => {
        return {
            ...state,
            unBindTruck: {
                ...state.unBindTruck,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.RESET_CREATE_TruckSecondUnBindTruck)]: (state, action) => {
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

    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                bindDriverId: data.driverId,
                bindDriver: data.driver
            },
            bindDriver: {
                ...state.bindDriver,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindDriver: {
                ...state.bindDriver,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindDriver: {
                ...state.bindDriver,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindDriver: {
                ...state.bindDriver,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindDriver_WAITING)]: (state, action) => {
        return {
            ...state,
            bindDriver: {
                ...state.bindDriver,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.RESET_CREATE_TruckSecondBindDriver)]: (state, action) => {
        return {
            ...state,
            bindDriver: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },


    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindDriver_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                bindDriverId: '',
                bindDriver: ''
            },
            unBindDriver: {
                ...state.unBindDriver,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindDriver_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindDriver: {
                ...state.unBindDriver,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindDriver_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindDriver: {
                ...state.unBindDriver,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindDriver_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindDriver: {
                ...state.unBindDriver,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindDriver_WAITING)]: (state, action) => {
        return {
            ...state,
            unBindDriver: {
                ...state.unBindDriver,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.RESET_CREATE_TruckSecondUnBindDriver)]: (state, action) => {
        return {
            ...state,
            unBindDriver: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

}, initialState)