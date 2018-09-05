import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actions/actionTypes'

const initialState = {
    data: {
        dpRouteRask: null
    },
    getDpRouteRaskOptionalList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.dpRouteRaskOptionalList.get_dpRouteRaskOptionalList_success)]: (state, action) => {
        const { payload: { dpRouteRask } } = action
        return {
            ...state,
            data: {
                dpRouteRask
            },
            getDpRouteRaskOptionalList: {
                ...state.getDpRouteRaskOptionalList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.dpRouteRaskOptionalList.get_dpRouteRaskOptionalList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDpRouteRaskOptionalList: {
                ...state.getDpRouteRaskOptionalList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.dpRouteRaskOptionalList.get_dpRouteRaskOptionalList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDpRouteRaskOptionalList: {
                ...state.getDpRouteRaskOptionalList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.dpRouteRaskOptionalList.get_dpRouteRaskOptionalList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getDpRouteRaskOptionalList: {
                ...initialState.getDpRouteRaskOptionalList,
                isResultStatus: 1
            }
        }
    },



    [actionTypes.dpRouteRaskOptionalList.reset_dpRouteRaskOptionalList_status]: (state, action) => {
        return {
            ...initialState
        }
    },


}, initialState)