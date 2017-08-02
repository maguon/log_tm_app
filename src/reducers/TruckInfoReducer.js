import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        truckInfo: {},
        recordList: [],
        imageList: [],
        truckInsureRelList: []
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
    }
}



//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    // [(actionTypes.truckInfoTypes.GET_TruckInfo_SUCCESS)]: (state, action) => {
    //     const { payload: { data } } = action
    //     return {
    //         ...state,
    //         data: {
    //             ...state.data,
    //             truckInfo: data[0]
    //         },
    //         truckInfo: {
    //             ...state.truckInfo,
    //             isResultStatus: 0,
    //             isExecStatus: 2
    //         }
    //     }
    // },
    // [(actionTypes.truckInfoTypes.GET_TruckRecord_SUCCESS)]: (state, action) => {
    //     const { payload: { data } } = action
    //     return {
    //         ...state,
    //         data: {
    //             ...state.data,
    //             recordList: data[0].comments,
    //             imageList: data[0].images,
    //         },
    //         truckRecord: {
    //             ...state.truckRecord,
    //             isResultStatus: 0,
    //             isExecStatus: 2
    //         }
    //     }
    // },
    // [(actionTypes.truckInfoTypes.GET_TruckInsureRel_SUCCESS)]: (state, action) => {
    //     const { payload: { data } } = action
    //     return {
    //         ...state,
    //         data: {
    //             ...state.data,
    //             truckInsureRelList: data
    //         },
    //         truckInsureRel: {
    //             ...state.truckInsureRel,
    //             isResultStatus: 0,
    //             isExecStatus: 2
    //         }
    //     }
    // },
    // [(actionTypes.truckInfoTypes.UpdateTruckInfo_SUCCESS)]: (state, action) => {
    //     const { payload: { data } } = action
    //     return {
    //         ...state,
    //         updateTruckInfo: {
    //             ...state.updateTruckInfo,
    //             isResultStatus: 0,
    //             isExecStatus: 2
    //         }
    //     }
    // },
}, initialState)