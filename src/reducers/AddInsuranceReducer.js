import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


const initialState = {
    data: {

    },
    createInsurance: {
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
    [(actionTypes.addInsuranceTypes.CREATE_Insurance_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createInsurance: {
                ...state.createInsurance,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addInsuranceTypes.CREATE_Insurance_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createInsurance: {
                ...state.createInsurance,
                isResultStatus: 2,
                failedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addInsuranceTypes.CREATE_Insurance_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createInsurance: {
                ...state.createInsurance,
                isResultStatus: 3,
                serviceFailedMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addInsuranceTypes.CREATE_Insurance_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            createInsurance: {
                ...state.createInsurance,
                isResultStatus: 1,
                errorMsg: data,
                isExecStatus: 2
            }
        }
    },
    [(actionTypes.addInsuranceTypes.CREATE_Insurance_WAITING)]: (state, action) => {
        return {
            ...state,
            createInsurance: {
                ...state.createInsurance,
                isExecStatus: 1
            }
        }
    },
    [(actionTypes.addInsuranceTypes.RESET_CREATE_Insurance)]: (state, action) => {
        return {
            ...state,
            createInsurance: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },
    [(actionTypes.addInsuranceTypes.CHANGE_Insurance_FIELD)]: (state, action) => {
        const { payload: { data } } = action

        return {
            ...state,
            data: {
                ...state.data,
                ...data
            }
        }
    }
    ,
    [(actionTypes.addInsuranceTypes.CLEAN_AddInsurance)]: (state, action) => {
        const { payload: { data } } = action
        return {
            data: {

            },
            createInsurance: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    }
}, initialState)