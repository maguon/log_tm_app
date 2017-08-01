import { handleActions } from 'redux-actions'
import actionTypes from '../actions/actionTypes'
import reducerTemplate from './ReducerTemplate'

const initialState = {
    data: {
        truckList: []
    },
    truckList: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

const truckList = reducerTemplate(actionTypes.truckListActionTypes.truckList, 'truckList')

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    ...truckList,
    [(actionTypes.truckListActionTypes.truckList.SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                truckList: data
            },
            truckList: {
                ...state.truckList,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
}, initialState)