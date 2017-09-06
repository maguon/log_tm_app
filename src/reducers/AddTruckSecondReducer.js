import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        bindTractorId: '',
        bindTractor: '',
        bindTrailerId: '',
        bindTrailer: '',
        bindDriverId: '',
        bindDriver: '',
        bindViceDriver: '',
        bindViceDriverId: ''
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
    },
    bindViceDriver: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    unBindViceDriver: {
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

    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindViceDriver_SUCCESS)]: (state, action) => {
        return {
            ...state,
            data: {
                ...state.data,
                bindViceDriverId: data.viceDriverId,
                bindViceDriver: data.viceDriver 
            },
            bindViceDriver: {
                ...state.bindViceDriver,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindViceDriver_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindViceDriver: {
                ...state.bindViceDriver,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindViceDriver_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindViceDriver: {
                ...state.bindViceDriver,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindViceDriver_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindViceDriver: {
                ...state.bindViceDriver,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondBindViceDriver_WAITING)]: (state, action) => {
        return {
            ...state,
            bindViceDriver: {
                ...state.bindViceDriver,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.RESET_CREATE_TruckSecondBindViceDriver)]: (state, action) => {
        return {
            ...state,
            bindViceDriver: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindViceDriver_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                bindViceDriver: '',
                bindViceDriverId: ''
            },
            unBindViceDriver: {
                ...state.unBindViceDriver,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindViceDriver_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindViceDriver: {
                ...state.unBindViceDriver,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindViceDriver_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindViceDriver: {
                ...state.unBindViceDriver,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindViceDriver_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindViceDriver: {
                ...state.unBindViceDriver,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.CREATE_TruckSecondUnBindViceDriver_WAITING)]: (state, action) => {
        return {
            ...state,
            unBindViceDriver: {
                ...state.unBindViceDriver,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addTruckSecondTypes.RESET_CREATE_TruckSecondUnBindViceDriver)]: (state, action) => {
        return {
            ...state,
            unBindViceDriver: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.addTruckSecondTypes.CLEAN_AddTruckSecondReducer)]: (state, action) => {
        const { payload: { data } } = action
        return {
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
    }



}, initialState)