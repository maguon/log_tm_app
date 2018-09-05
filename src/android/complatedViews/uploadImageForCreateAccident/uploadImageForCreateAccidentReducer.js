import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    data: {
        imageList: [],
        recordId: 0,
        index: 0
    },
    uploadAccidentImage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    delImage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    getImageForCreateAccident: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.uploadImageForCreateAccident.upload_imageForCreateAccident_success]: (state, action) => {
        const { payload: { imageList, recordId } } = action

        return {
            ...state,
            data: {
                imageList: [...state.data.imageList, ...imageList],
                recordId
            },
            uploadAccidentImage: {
                ...initialState.uploadAccidentImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.uploadImageForCreateAccident.upload_imageForCreateAccident_partSuccess]: (state, action) => {
        const { payload: { imageList, failedMsg, recordId } } = action
        return {
            ...state,
            data: {
                imageList: [...state.data.imageList, ...imageList],
                recordId
            },
            uploadAccidentImage: {
                ...initialState.uploadAccidentImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [actionTypes.uploadImageForCreateAccident.upload_imageForCreateAccident_waiting]: (state, action) => {
        return {
            ...state,
            uploadAccidentImage: {
                ...initialState.uploadAccidentImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.uploadImageForCreateAccident.upload_imageForCreateAccident_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            uploadAccidentImage: {
                ...initialState.uploadAccidentImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.uploadImageForCreateAccident.upload_imageForCreateAccident_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            uploadAccidentImage: {
                ...initialState.uploadAccidentImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.uploadImageForCreateAccident.del_imageForCreateAccident_success]: (state, action) => {
        const { payload: { url } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: state.data.imageList.filter(item => item != url)
            },
            delImage: {
                ...initialState.delImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.uploadImageForCreateAccident.del_imageForCreateAccident_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            delImage: {
                ...initialState.delImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.uploadImageForCreateAccident.del_imageForCreateAccident_waiting]: (state, action) => {
        return {
            ...state,
            delImage: {
                ...initialState.delImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.uploadImageForCreateAccident.del_imageForCreateAccident_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            delImage: {
                ...initialState.delImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.uploadImageForCreateAccident.get_imageForCreateAccident_success]: (state, action) => {
        const { payload: { imageList, recordId } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList,
                recordId
            },
            getImageForCreateAccident: {
                ...initialState.getImageForCreateAccident,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.uploadImageForCreateAccident.get_imageForCreateAccident_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getImageForCreateAccident: {
                ...initialState.getImageForCreateAccident,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.uploadImageForCreateAccident.get_imageForCreateAccident_waiting]: (state, action) => {
        return {
            ...state,
            getImageForCreateAccident: {
                ...initialState.getImageForCreateAccident,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.uploadImageForCreateAccident.get_imageForCreateAccident_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getImageForCreateAccident: {
                ...initialState.getImageForCreateAccident,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.uploadImageForCreateAccident.clean_imageForCreateAccident]: (state, action) => {
        return {
            ...initialState
        }
    },

    [actionTypes.uploadImageForCreateAccident.set_indexForUploadImageForCreateAccident]: (state, action) => {
        const { payload: { index } } = action
        // console.log('index',index)
        return {
            ...state,
            data: {
                ...state.data,
                index
            }
        }
    }
}, initialState)