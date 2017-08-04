import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        companyList: []
    },
    getCompanyList: {
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
    [(actionTypes.selectCompanyTypes.GET_CompanyList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                companyList: data
            },
            getCompanyList: {
                ...state.getCompanyList,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectCompanyTypes.GET_CompanyList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCompanyList: {
                ...state.getCompanyList,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectCompanyTypes.GET_CompanyList_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCompanyList: {
                ...state.getCompanyList,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectCompanyTypes.GET_CompanyList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCompanyList: {
                ...state.getCompanyList,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectCompanyTypes.GET_CompanyList_WAITING)]: (state, action) => {
        return {
            ...state,
            getCompanyList: {
                ...state.getCompanyList,
                isExecStatus: 1
            }
        }
    }
}, initialState)