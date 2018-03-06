import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: {
        version: {
            currentVersion: '',
            newestVersion: '',
            force_update: 0,//0(版本为最新版), 1(版本需要太旧，强制更新), 2(版本需要太旧，但不需要强制更新)
            url: '',
            remark: ''
        }
    },
    initAPP: {
        isResultStatus: 0,     //执行状态 : 0(未执行), 1(正在执行),2(执行结束)
        step: 0,               //第N步已经执行成功
    },
    //validateVersion.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(网络错误)
    validateVersion: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        networkError: ''
    },
    //loadLocalStorage.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(本地数据未找到)
    loadLocalStorage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    //validateToken.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(网络错误)
    validateToken: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        networkError: '',
        param:{}
    }
}

export default handleActions({
    [actionTypes.initializationTypes.INIT_App_Waiting]: (state, action) => {
        return {
            ...initialState,
            data: {
                ...state.data
            },
            initAPP: {
                ...state.initAPP,
                isResultStatus: 1,
            }
        }
    },


    [actionTypes.initializationTypes.Valdate_Version_Error]: (state, action) => {
        const { payload: { errorMsg, step } } = action
        return {
            ...state,
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 3,
                errorMsg: '系统内部错误，请联系系统管理员！'
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [actionTypes.initializationTypes.Valdate_Version_NetWorkError]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 5,
                networkError: '网络错误，请检查网络后重试！'
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [actionTypes.initializationTypes.Valdate_Version_Success]: (state, action) => {
        const { payload: { data, step } } = action
        return {
            ...state,
            data: {
                version: {
                    ...state.data.version,
                    ...data
                }
            },
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 2,
            },
            initAPP: {
                isResultStatus: data.force_update != 1 ? 1 : 2,
                step
            }
        }
    },
    [actionTypes.initializationTypes.Valdate_Version_Failed]: (state, action) => {
        const { payload: { failedMsg, step } } = action
        return {
            ...state,
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 4,
                failedMsg
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },


    [actionTypes.initializationTypes.Load_LocalStorage_Success]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            validateVersion:{...initialState.validateVersion},
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 2,
            },
            initAPP: {
                isResultStatus: 1,
                step
            }
        }
    },
    [actionTypes.initializationTypes.Load_LocalStorage_Failed]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            validateVersion:{...initialState.validateVersion},
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 4,
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [actionTypes.initializationTypes.Load_LocalStorage_NotFoundError]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            validateVersion:{...initialState.validateVersion},
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 5,
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [actionTypes.initializationTypes.Load_LocalStorage_Error]: (state, action) => {
        const { payload: { errorMsg, step } } = action
        return {
            ...state,
            validateVersion:{...initialState.validateVersion},
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 3,
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },


    [actionTypes.initializationTypes.validate_token_Error]: (state, action) => {
        const { payload: {step } } = action
        return {
            ...state,
            loadLocalStorage:{...initialState.loadLocalStorage},
            validateToken: {
                ...initialState.validateToken,
                isResultStatus: 3
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [actionTypes.initializationTypes.validate_token_Success]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            loadLocalStorage:{...initialState.loadLocalStorage},
            validateToken: {
                ...initialState.validateToken,
                isResultStatus: 2,
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [actionTypes.initializationTypes.validate_token_Failed]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            loadLocalStorage:{...initialState.loadLocalStorage},
            validateToken: {
                ...initialState.validateToken,
                failedMsg: data,
                isResultStatus: 4
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [actionTypes.initializationTypes.validate_token_NetWorkError]: (state, action) => {
        const { payload: { param, step } } = action
        return {
            ...state,
            loadLocalStorage:{...initialState.loadLocalStorage},
            validateToken: {
                ...initialState.validateToken,
                isResultStatus: 5,
                param,
                networkError:'网络错误，请检查网络后重试！'
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    }
}, initialState)





// /**
//  * Created by rbyu on 2017/5/19.
//  */
// import { handleActions } from 'redux-actions'
// import * as app from '../android_app.json'
// import localStorageKey from '../util/LocalStorageKey'
// import * as actionTypes from '../actions/actionTypes'


// //isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
// //isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
// const initialState = {
//     getVersion: {
//         isResultStatus: 0,
//         isExecStatus: 0,
//         errorMsg: '',
//         failedMsg: '',
//         data: {
//             version: app.version,
//             lastVersion: app.version,
//             force_update: 0,
//             url: '',
//             remark: ''
//         }
//     },
//     valdateToken: {
//         isResultStatus: 0,
//         isExecStatus: 0,
//         errorMsg: '',
//         failedMsg: ''
//     }
// }

// export default handleActions({
//     [actionTypes.initializationTypes.GET_VERSION_WAITING]: (state, action) => {
//         return {
//             ...state,
//             getVersion: {
//                 ...state.getVersion,
//                 isExecStatus: 1
//             }
//         }
//     },
//     [actionTypes.initializationTypes.GET_VERSION_ERROR]: (state, action) => {
//         const { payload: { data } } = action
//         return {
//             ...state,
//             getVersion: {
//                 ...state.getVersion,
//                 isExecStatus: 2,
//                 isResultStatus: 1,
//                 errorMsg: data,
//             }
//         }
//     },
//     [actionTypes.initializationTypes.GET_VERSION_SUCCESS]: (state, action) => {
//         const { payload: { data } } = action
//         if (data.length > 0) {
//             data.sort((a, b) => {
//                 return b.id - a.id
//             })
//             const { version, force_update, url, remark } = data[0]
//             return {
//                 ...state,
//                 getVersion: {
//                     ...state.getVersion,
//                     data: {
//                         ...state.getVersion.data,
//                         lastVersion: version,
//                         force_update: 0,//force_update,
//                         url: url,
//                         remark: remark
//                     },
//                     isExecStatus: 2,
//                     isResultStatus: 0
//                 }
//             }
//         } else {
//             return {
//                 ...state,
//                 getVersion: {
//                     ...state.getVersion,
//                     isExecStatus: 2,
//                     isResultStatus: 0
//                 }
//             }
//         }
//     },
//     [actionTypes.initializationTypes.GET_VERSION_FAILED]: (state, action) => {
//         const { payload: { data } } = action
//         return {
//             ...state,
//             getVersion: {
//                 ...state.getVersion,
//                 failedMsg: data,
//                 isExecStatus: 2,
//                 isResultStatus: 2
//             }
//         }
//     },
//     [actionTypes.initializationTypes.VALIDATE_TOKEN_WAITING]: (state, action) => {
//         return {
//             ...state,
//             valdateToken: {
//                 ...state.valdateToken,
//                 isExecStatus: 1
//             }
//         }
//     },
//     [actionTypes.initializationTypes.VALIDATE_TOKEN_ERROR]: (state, action) => {
//         const { payload: { data } } = action
//         return {
//             ...state,
//             valdateToken: {
//                 ...state.valdateToken,
//                 isExecStatus: 2,
//                 isResultStatus: 1,
//                 errorMsg: data
//             }
//         }
//     },
//     [actionTypes.initializationTypes.VALIDATE_TOKEN_SUCCESS]: (state, action) => {
//         return {
//             ...state,
//             valdateToken: {
//                 ...state.valdateToken,
//                 isExecStatus: 2,
//                 isResultStatus: 0,
//             }
//         }
//     },
//     [actionTypes.initializationTypes.VALIDATE_TOKEN_FAILED]: (state, action) => {
//         const { payload: { data } } = action
//         return {
//             ...state,
//             valdateToken: {
//                 ...state.valdateToken,
//                 failedMsg: data,
//                 isExecStatus: 2,
//                 isResultStatus: 2
//             }
//         }
//     },
//     [actionTypes.initializationTypes.RESET_INITIALIZATION]: (state, action) => {
//         const { payload: { data } } = action
//         return {
//             ...state,
//             valdateToken: {
//                 ...state.valdateToken,
//                 isExecStatus: 0
//             },
//             getVersion: {
//                 ...state.getVersion,
//                 isExecStatus: 0
//             }
//         }
//     },
//     [actionTypes.initializationTypes.RESET_GETVERSION]: (state, action) => {
//         const { payload: { data } } = action
//         return {
//             ...state,
//             getVersion: {
//                 ...state.getVersion,
//                 isExecStatus: 0
//             }
//         }
//     }

// }, initialState)