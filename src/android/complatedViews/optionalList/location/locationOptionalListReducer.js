import { get_locationOptionalList_success } from "./locationOptionalListActionTypes";

import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actions/actionTypes'

const initialState = {
    data: {
        currentLocation: null,
        locationOptionalList: []
    },
    getLocationOptionalList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getRegeo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.locationOptionalList.get_locationOptionalList_success]: (state, action) => {
        const { payload: { locationOptionalList } } = action
        return {
            ...state,
            data: {
                currentLocation: locationOptionalList[0],
                locationOptionalList
            },
            getLocationOptionalList: {
                ...state.getLocationOptionalList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.locationOptionalList.get_locationOptionalList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getLocationOptionalList: {
                ...state.getLocationOptionalList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.locationOptionalList.get_locationOptionalList_waiting]: (state, action) => {
        return {
            ...state,
            getLocationOptionalList: {
                ...state.getLocationOptionalList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.locationOptionalList.get_locationOptionalList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getLocationOptionalList: {
                ...state.getLocationOptionalList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [actionTypes.locationOptionalList.reset_getLocationOptionalList_status]: (state, action) => {
        return {
            ...state,
            getLocationOptionalList: {
                ...initialState.getLocationOptionalList
            }
        }
    },



    [actionTypes.locationOptionalList.get_regeo_success]: (state, action) => {
        const { payload: { locationOptionalList } } = action
        return {
            ...state,
            data: {
                currentLocation: locationOptionalList[0],
                locationOptionalList
            },
            getRegeo: {
                ...state.getRegeo,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.locationOptionalList.get_regeo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRegeo: {
                ...state.getRegeo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.locationOptionalList.get_regeo_waiting]: (state, action) => {
        return {
            ...state,
            getRegeo: {
                ...state.getRegeo,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.locationOptionalList.get_regeo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRegeo: {
                ...state.getRegeo,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [actionTypes.locationOptionalList.reset_regeo_status]: (state, action) => {
        return {
            ...state,
            getRegeo: {
                ...initialState.getRegeo
            }
        }
    },





    [actionTypes.locationOptionalList.set_locationForOptionalList]: (state, action) => {
        const { payload: { currentLocation } } = action
        return {
            ...state,
            data: {
                ...state.data,
                currentLocation
            }
        }
    }
}, initialState)