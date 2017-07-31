
//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const reducerTemplate = (types, propName) => {
    return {
        [types.WAITING]: (state, action) => {
            let newState = { ...state }
            newState[propName] = {
                ...newState[propName],
                isExecStatus: 1
            }
            return newState
        },
        [types.FAILED]: (state, action) => {
            const { payload: { data } } = action
            let newState = { ...state }
            newState[propName] = {
                ...newState[propName],
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
            return newState
        },
        [types.ERROR]: (state, action) => {
            const { payload: { data } } = action
            let newState = { ...state }
            newState[propName] = {
                ...newState[propName],
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
            return newState
        },
        [types.SERVICEERROR]: (state, action) => {
            const { payload: { data } } = action
            let newState = { ...state }
            newState[propName] = {
                ...newState[propName],
                isResultStatus: 3,
                isExecStatus: 2,
                serviceFailedMsg: data
            }
            return newState
        },
        [types.RESET]: (state, action) => {
            let newState = { ...state }
            newState[propName] = {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
            return newState
        }
    }
}

export default reducerTemplate
