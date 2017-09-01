import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'
import moment from 'moment'

const initialState = {
    data: {
        truckInfo: {},
        recordList: [],
        imageList: [],
        truckInsureRelList: [],
        truckRepairRelList: []
    },
    truckInfo: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    truckInsureRel: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    truckRecord: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    updateTruckInfo: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    bindTrail: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    unBindTrail: {
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
    changeTruckFirstStatus: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    changeTruckTrailerStatus: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    truckRepairRelList: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    createTruckRepairRel: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    updateTruckRepairRel: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
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
    },
    delTruckImage: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [(actionTypes.truckInfoTypes.GET_TruckInfo_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: {
                    ...data[0],
                    driving_date: data[0].driving_date ? moment(new Date(data[0].driving_date)).format('YYYY-MM-DD') : null,
                    license_date: data[0].license_date ? moment(new Date(data[0].license_date)).format('YYYY-MM-DD') : null
                }
            },
            truckInfo: {
                ...state.truckInfo,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_FAILED)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.GET_TruckInfo_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.GET_TruckInfo_ERROR)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.GET_TruckInfo_WAITING)]: (state, action) => {
        return {
            ...state,
            truckInfo: {
                ...state.truckInfo,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_GET_TruckInfo)]: (state, action) => {
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

    [(actionTypes.truckInfoTypes.GET_TruckRecord_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                recordList: data[0] ? data[0].comments : [],
                imageList: data[0] ? data[0].images : [],
            },
            truckRecord: {
                ...state.truckRecord,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckRecord_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            truckRecord: {
                ...state.truckRecord,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckRecord_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            truckRecord: {
                ...state.truckRecord,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckRecord_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            truckRecord: {
                ...state.truckRecord,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckRecord_WAITING)]: (state, action) => {
        return {
            ...state,
            truckRecord: {
                ...state.truckRecord,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_GET_TruckRecord)]: (state, action) => {
        return {
            ...state,
            truckRecord: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.truckInfoTypes.GET_TruckInsureRel_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInsureRelList: data
            },
            truckInsureRel: {
                ...state.truckInsureRel,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInsureRel_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            truckInsureRel: {
                ...state.truckInsureRel,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInsureRel_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            truckInsureRel: {
                ...state.truckInsureRel,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInsureRel_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            truckInsureRel: {
                ...state.truckInsureRel,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInsureRel_WAITING)]: (state, action) => {
        return {
            ...state,
            truckInsureRel: {
                ...state.truckInsureRel,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_GET_TruckInsureRel)]: (state, action) => {
        return {
            ...state,
            truckInsureRel: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    //完成
    [(actionTypes.truckInfoTypes.ChangeTruckFirstStatus_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: {
                    ...state.data.truckInfo,
                    truck_status: data
                }
            },
            changeTruckFirstStatus: {
                ...state.changeTruckFirstStatus,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.ChangeTruckFirstStatus_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeTruckFirstStatus: {
                ...state.changeTruckFirstStatus,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.ChangeTruckFirstStatus_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeTruckFirstStatus: {
                ...state.changeTruckFirstStatus,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.ChangeTruckFirstStatus_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeTruckFirstStatus: {
                ...state.changeTruckFirstStatus,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.ChangeTruckFirstStatus_WAITING)]: (state, action) => {
        return {
            ...state,
            changeTruckFirstStatus: {
                ...state.changeTruckFirstStatus,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_ChangeTruckFirstStatus)]: (state, action) => {
        return {
            ...state,
            changeTruckFirstStatus: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    //完成
    [(actionTypes.truckInfoTypes.ChangeTruckTrailerStatus_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: {
                    ...state.data.truckInfo,
                    truck_status: data
                }
            },
            changeTruckTrailerStatus: {
                ...state.changeTruckTrailerStatus,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.ChangeTruckTrailerStatus_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeTruckTrailerStatus: {
                ...state.changeTruckTrailerStatus,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.ChangeTruckTrailerStatus_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeTruckTrailerStatus: {
                ...state.changeTruckTrailerStatus,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.ChangeTruckTrailerStatus_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeTruckTrailerStatus: {
                ...state.changeTruckTrailerStatus,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.ChangeTruckTrailerStatus_WAITING)]: (state, action) => {
        return {
            ...state,
            changeTruckTrailerStatus: {
                ...state.changeTruckTrailerStatus,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_ChangeTruckTrailerStatus)]: (state, action) => {
        return {
            ...state,
            changeTruckTrailerStatus: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    //完成
    [(actionTypes.truckInfoTypes.BindTrail_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: {
                    ...state.data.truckInfo,
                    ...data
                }
            },
            bindTrail: {
                ...state.bindTrail,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.BindTrail_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindTrail: {
                ...state.bindTrail,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.BindTrail_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindTrail: {
                ...state.bindTrail,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.BindTrail_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            bindTrail: {
                ...state.bindTrail,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.BindTrail_WAITING)]: (state, action) => {
        return {
            ...state,
            bindTrail: {
                ...state.bindTrail,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_BindTrail)]: (state, action) => {
        return {
            ...state,
            bindTrail: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    //完成
    [(actionTypes.truckInfoTypes.UnBindTrail_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: {
                    ...state.data.truckInfo,
                    ...data
                }
            },
            unBindTrail: {
                ...state.unBindTrail,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UnBindTrail_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindTrail: {
                ...state.unBindTrail,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UnBindTrail_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindTrail: {
                ...state.unBindTrail,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UnBindTrail_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            unBindTrail: {
                ...state.unBindTrail,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UnBindTrail_WAITING)]: (state, action) => {
        return {
            ...state,
            unBindTrail: {
                ...state.unBindTrail,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_UnBindTrail)]: (state, action) => {
        return {
            ...state,
            unBindTrail: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    //完成
    [(actionTypes.truckInfoTypes.BindDriver_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: {
                    ...state.data.truckInfo,
                    ...data
                }
            },
            bindDriver: {
                ...state.bindDriver,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.BindDriver_FAILED)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.BindDriver_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.BindDriver_ERROR)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.BindDriver_WAITING)]: (state, action) => {
        return {
            ...state,
            bindDriver: {
                ...state.bindDriver,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_BindDriver)]: (state, action) => {
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

    //完成
    [(actionTypes.truckInfoTypes.UnBindDriver_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: {
                    ...state.data.truckInfo,
                    ...data
                }
            },
            unBindDriver: {
                ...state.unBindDriver,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UnBindDriver_FAILED)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.UnBindDriver_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.UnBindDriver_ERROR)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.UnBindDriver_WAITING)]: (state, action) => {
        return {
            ...state,
            unBindDriver: {
                ...state.unBindDriver,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_UnBindDriver)]: (state, action) => {
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

    [(actionTypes.truckInfoTypes.GET_TruckRepairRelList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckRepairRelList: data
            },
            truckRepairRelList: {
                ...state.truckRepairRelList,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckRepairRelList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            truckRepairRelList: {
                ...state.truckRepairRelList,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckRepairRelList_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            truckRepairRelList: {
                ...state.truckRepairRelList,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckRepairRelList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            truckRepairRelList: {
                ...state.truckRepairRelList,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckRepairRelList_WAITING)]: (state, action) => {
        return {
            ...state,
            truckRepairRelList: {
                ...state.truckRepairRelList,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_GET_TruckRepairRelList)]: (state, action) => {
        return {
            ...state,
            truckRepairRelList: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.truckInfoTypes.CreateTruckRepairRel_SUCCESS)]: (state, action) => {
        return {
            ...state,
            createTruckRepairRel: {
                ...state.createTruckRepairRel,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.CreateTruckRepairRel_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createTruckRepairRel: {
                ...state.createTruckRepairRel,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.CreateTruckRepairRel_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createTruckRepairRel: {
                ...state.createTruckRepairRel,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.CreateTruckRepairRel_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createTruckRepairRel: {
                ...state.createTruckRepairRel,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.CreateTruckRepairRel_WAITING)]: (state, action) => {
        return {
            ...state,
            createTruckRepairRel: {
                ...state.createTruckRepairRel,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_CreateTruckRepairRel)]: (state, action) => {
        return {
            ...state,
            createTruckRepairRel: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.truckInfoTypes.UpdateTruckRepairRel_SUCCESS)]: (state, action) => {
        return {
            ...state,
            updateTruckRepairRel: {
                ...state.updateTruckRepairRel,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UpdateTruckRepairRel_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateTruckRepairRel: {
                ...state.updateTruckRepairRel,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UpdateTruckRepairRel_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateTruckRepairRel: {
                ...state.updateTruckRepairRel,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UpdateTruckRepairRel_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateTruckRepairRel: {
                ...state.updateTruckRepairRel,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UpdateTruckRepairRel_WAITING)]: (state, action) => {
        return {
            ...state,
            updateTruckRepairRel: {
                ...state.updateTruckRepairRel,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_UpdateTruckRepairRel)]: (state, action) => {
        return {
            ...state,
            updateTruckRepairRel: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    //完成
    [(actionTypes.truckInfoTypes.UPDATE_TruckInfoDrivingImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: {
                    ...state.data.truckInfo,
                    driving_image: data
                }
            },
            updateDrivingImage: {
                ...state.updateDrivingImage,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UPDATE_TruckInfoDrivingImage_FAILED)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.UPDATE_TruckInfoDrivingImage_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.UPDATE_TruckInfoDrivingImage_ERROR)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.UPDATE_TruckInfoDrivingImage_WAITING)]: (state, action) => {
        return {
            ...state,
            updateDrivingImage: {
                ...state.updateDrivingImage,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_UPDATE_TruckInfoDrivingImage)]: (state, action) => {
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

    //完成
    [(actionTypes.truckInfoTypes.UPDATE_TruckInfoLicenseImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: {
                    ...state.data.truckInfo,
                    license_image: data
                }
            },
            updateLicenseImage: {
                ...state.updateLicenseImage,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UPDATE_TruckInfoLicenseImage_FAILED)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.UPDATE_TruckInfoLicenseImage_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.UPDATE_TruckInfoLicenseImage_ERROR)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.UPDATE_TruckInfoLicenseImage_WAITING)]: (state, action) => {
        return {
            ...state,
            updateLicenseImage: {
                ...state.updateLicenseImage,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_UPDATE_TruckInfoLicenseImage)]: (state, action) => {
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

    //完成
    [(actionTypes.truckInfoTypes.CREATE_TruckInfoTruckImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: [...state.data.imageList, { url: data }]
            },
            createTruckImage: {
                ...state.createTruckImage,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.CREATE_TruckInfoTruckImage_FAILED)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.CREATE_TruckInfoTruckImage_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.CREATE_TruckInfoTruckImage_ERROR)]: (state, action) => {
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
    [(actionTypes.truckInfoTypes.CREATE_TruckInfoTruckImage_WAITING)]: (state, action) => {
        return {
            ...state,
            createTruckImage: {
                ...state.createTruckImage,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_CREATE_TruckInfoTruckImage)]: (state, action) => {
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

    //完成
    [(actionTypes.truckInfoTypes.DEL_TruckInfoTruckImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: data
            },
            delTruckImage: {
                ...state.delTruckImage,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.DEL_TruckInfoTruckImage_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            delTruckImage: {
                ...state.delTruckImage,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.DEL_TruckInfoTruckImage_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            delTruckImage: {
                ...state.delTruckImage,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.DEL_TruckInfoTruckImage_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            delTruckImage: {
                ...state.delTruckImage,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.DEL_TruckInfoTruckImage_WAITING)]: (state, action) => {
        return {
            ...state,
            delTruckImage: {
                ...state.delTruckImage,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_DEL_TruckInfoTruckImage)]: (state, action) => {
        return {
            ...state,
            delTruckImage: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.truckInfoTypes.CHANGE_TruckInfo_FIELD)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: {
                    ...state.data.truckInfo,
                    ...data
                }
            }
        }
    },
    [(actionTypes.truckInfoTypes.Add_TruckInfoInsurance)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInsureRelList: [...state.data.truckInsureRelList, data]
            }
        }
    },

    [(actionTypes.truckInfoTypes.UpdateTruckInfo_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateTruckInfo: {
                ...state.updateTruckInfo,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UpdateTruckInfo_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateTruckInfo: {
                ...state.updateTruckInfo,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UpdateTruckInfo_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateTruckInfo: {
                ...state.updateTruckInfo,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UpdateTruckInfo_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateTruckInfo: {
                ...state.updateTruckInfo,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.UpdateTruckInfo_WAITING)]: (state, action) => {
        return {
            ...state,
            updateTruckInfo: {
                ...state.updateTruckInfo,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_UpdateTruckInfo)]: (state, action) => {
        return {
            ...state,
            updateTruckInfo: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    }
}, initialState)
