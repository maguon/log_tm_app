import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


const initialState = {
    data: {
        truckFirst: {
            truckNum:'辽B'
        },
        truckTrailer: {
            truckNum:'辽B'
        },
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

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [(actionTypes.addTruckFirstTypes.CREATE_TruckFirst_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckTrailerId: data
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
                truckFirstId: data
            },
            createTruckTrailer: {
                ...state.createTruckTrailer,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.CREATE_TruckTrailer_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createTruckTrailer: {
                ...state.createTruckTrailer,
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
            createTruckTrailer: {
                ...state.createTruckTrailer,
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
            createTruckTrailer: {
                ...state.createTruckTrailer,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.CREATE_TruckTrailer_WAITING)]: (state, action) => {
        return {
            ...state,
            createTruckTrailer: {
                ...state.createTruckTrailer,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.RESET_CREATE_TruckTrailer)]: (state, action) => {
        return {
            ...state,
            createTruckTrailer: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },
    [(actionTypes.addTruckFirstTypes.CHANGE_TruckTrailer_FIELD)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckTrailer: {
                    ...state.data.truckTrailer,
                    ...data
                }
            }
        }
    }

}, initialState)