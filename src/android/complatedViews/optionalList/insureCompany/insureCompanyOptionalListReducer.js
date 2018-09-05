import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actions/actionTypes'

const initialState = {
    data: {
        insureCompanyOptionalList: []
    },
    getInsureCompanyOptionalList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.insureCompanyOptionalList.get_insureCompanyOptionalList_success]: (state, action) => {
        const { payload: { insureCompanyOptionalList } } = action
        return {
            data: {
                insureCompanyOptionalList
            },
            getInsureCompanyOptionalList: {
                ...state.getInsureCompanyOptionalList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.insureCompanyOptionalList.get_insureCompanyOptionalList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getInsureCompanyOptionalList: {
                ...state.getInsureCompanyOptionalList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.insureCompanyOptionalList.get_insureCompanyOptionalList_waiting]: (state, action) => {
        return {
            ...state,
            getInsureCompanyOptionalList: {
                ...state.getInsureCompanyOptionalList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.insureCompanyOptionalList.get_insureCompanyOptionalList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getInsureCompanyOptionalList: {
                ...state.getInsureCompanyOptionalList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)