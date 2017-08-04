import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


const initialState = {
    data: {
        truckFirst: {},
        truckTrailer: {},
        truckFirstId: 0,
        truckTrailerId: 0
    },
    createTruckFirst: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    createTruckTrailer: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.addTruckFirstTypes.CREATE_TruckFirst_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        console.log(data)
        return {
            ...state,
            data: {
                ...state.data,
                truck: data[0]
            },
            createTruckFirst: {
                ...state.createTruckFirst,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.CREATE_TruckFirst_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createTruckFirst: {
                ...state.createTruckFirst,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.CREATE_TruckFirst_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createTruckFirst: {
                ...state.createTruckFirst,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.CREATE_TruckFirst_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createTruckFirst: {
                ...state.createTruckFirst,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.CREATE_TruckFirst_WAITING)]: (state, action) => {
        return {
            ...state,
            createTruckFirst: {
                ...state.createTruckFirst,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.RESET_CREATE_TruckFirst)]: (state, action) => {
        return {
            ...state,
            createTruckFirst: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.CHANGE_TruckFirst_FIELD)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckFirst: {
                    ...state.data.truckFirst,
                    ...data
                }
            }
        }
    },

    [(actionTypes.addTruckFirstTypes.CREATE_TruckTrailer_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: data[0]
            },
            truckInfo: {
                ...state.truckInfo,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.CREATE_TruckTrailer_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            truckInfo: {
                ...state.truckInfo,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.CREATE_TruckTrailer_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            truckInfo: {
                ...state.truckInfo,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.CREATE_TruckTrailer_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            truckInfo: {
                ...state.truckInfo,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.CREATE_TruckTrailer_WAITING)]: (state, action) => {
        return {
            ...state,
            truckInfo: {
                ...state.truckInfo,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.RESET_CREATE_TruckTrailer)]: (state, action) => {
        return {
            ...state,
            truckInfo: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },
}, initialState)