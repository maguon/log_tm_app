import { handleActions } from 'redux-actions'
import actionTypes from '../actions/actionTypes'
import reducerTemplate from './ReducerTemplate'

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
    }
}

const truckInfo = reducerTemplate(actionTypes.truckInfoActionTypes.truckInfo, 'truckInfo')
const truckInsureRel = reducerTemplate(actionTypes.truckInfoActionTypes.truckInsureRel, 'truckInsureRel')
const truckRecord = reducerTemplate(actionTypes.truckInfoActionTypes.truckRecord, 'truckRecord')

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    ...truckInfo,
    ...truckInsureRel,
    ...truckRecord,
    [(actionTypes.truckInfoActionTypes.truckInfo.SUCCESS)]: (state, action) => {
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
    [(actionTypes.truckInfoActionTypes.truckRecord.SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,                
                recordList: data[0].comments,
                imageList: data[0].images,
            },
            truckRecord: {
                ...state.truckRecord,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoActionTypes.truckInsureRel.SUCCESS)]: (state, action) => {
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
}, initialState)