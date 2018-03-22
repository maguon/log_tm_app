import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        accidentList: []
    },
    getAccidentList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [(actionTypes.selectAccidentTypes.get_selectAccidentList_success)]: (state, action) => {
        const { payload: { accidentList } } = action
        return {
            ...state,
            data: {
                accidentList
            },
            getAccidentList: {
                ...state.getAccidentList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.selectAccidentTypes.get_selectAccidentList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentList: {
                ...state.getAccidentList,
                isResultStatus: 3,
                failedMsg
            }
        }
    },
    [(actionTypes.selectAccidentTypes.get_selectAccidentList_waiting)]: (state, action) => {
        return {
            ...state,
            getAccidentList: {
                ...state.getAccidentList,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.selectAccidentTypes.get_selectAccidentList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action 
        return {
            ...state,
            getAccidentList: {
                ...state.getAccidentList,
                isResultStatus: 4,
                errorMsg
            }
        }
    }
}, initialState)