import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    data: {
        accidentIndemnifyList: []
    },
    getAccidentIndemnifyList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.accidentIndemnifyList.get_accidentIndemnifyList_success]: (state, action) => {
        const { payload: { accidentIndemnifyList } } = action
        return {
            data: {
                accidentIndemnifyList
            },
            getAccidentIndemnifyList: {
                ...state.getAccidentIndemnifyList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.accidentIndemnifyList.get_accidentIndemnifyList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentIndemnifyList: {
                ...state.getAccidentIndemnifyList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.accidentIndemnifyList.get_accidentIndemnifyList_waiting]: (state, action) => {
        return {
            ...state,
            getAccidentIndemnifyList: {
                ...state.getAccidentIndemnifyList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.accidentIndemnifyList.get_accidentIndemnifyList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAccidentIndemnifyList: {
                ...state.getAccidentIndemnifyList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [actionTypes.accidentIndemnifyList.modify_accidentIndemnifyForList]: (state, action) => {
        const { payload: { accidentIndemnify, accidentInsureId } } = action
        return {
            ...state,
            data: {
                accidentIndemnifyList: state.data.accidentIndemnifyList.map(item => {
                    if (item.id == accidentInsureId) {
                        return {
                            ...item,
                            ...accidentIndemnify
                        }
                    } else {
                        return item
                    }
                })
            }
        }
    }
}, initialState)