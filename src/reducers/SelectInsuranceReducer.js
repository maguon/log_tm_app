import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        insuranceList: []
    },
    getInsuranceList: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.selectInsuranceTypes.GET_InsuranceList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                insuranceList: data
            },
            getInsuranceList: {
                ...state.getInsuranceList,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectInsuranceTypes.GET_InsuranceList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getInsuranceList: {
                ...state.getInsuranceList,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectInsuranceTypes.GET_InsuranceList_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getInsuranceList: {
                ...state.getInsuranceList,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectInsuranceTypes.GET_InsuranceList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getInsuranceList: {
                ...state.getInsuranceList,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.selectInsuranceTypes.GET_InsuranceList_WAITING)]: (state, action) => {
        return {
            ...state,
            getInsuranceList: {
                ...state.getInsuranceList,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.selectInsuranceTypes.RESET_GET_InsuranceList)]: (state, action) => {
        return {
            ...state,
            getInsuranceList: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    }
}, initialState)