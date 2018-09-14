import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    data: {
        peccancyStatistics: {},
        overuseDieselOilStatistics: {},
        accidentStatistics: {}
    },
    getBlameStatistics: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.blame.get_blameStatistics_success]: (state, action) => {
        const { payload: { peccancyStatistics, overuseDieselOilStatistics, accidentStatistics } } = action
        return {
            data: {
                peccancyStatistics: peccancyStatistics ? peccancyStatistics : {},
                overuseDieselOilStatistics: overuseDieselOilStatistics ? overuseDieselOilStatistics : {},
                accidentStatistics: accidentStatistics ? accidentStatistics : {},
            },
            getBlameStatistics: {
                ...state.getBlameStatistics,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.blame.get_blameStatistics_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getBlameStatistics: {
                ...state.getBlameStatistics,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.blame.get_blameStatistics_waiting]: (state, action) => {
        return {
            ...state,
            getBlameStatistics: {
                ...state.getBlameStatistics,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.blame.get_blameStatistics_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getBlameStatistics: {
                ...state.getBlameStatistics,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)