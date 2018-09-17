import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actions/actionTypes'

const initialState = {
    data: {
        peccancyStatistics: {},
        overuseDieselOilStatistics: {},
        accidentStatistics: {}
    },
    getTruckAccidentStatistics: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getPeccancyStatistics: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getExceedOilStatistics: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.blame.get_exceedOilStatistics_success]: (state, action) => {
        const { payload: { overuseDieselOilStatistics } } = action
        // console.log('overuseDieselOilStatistics', overuseDieselOilStatistics)
        return {
            ...state,
            data: {
                ...state.data,
                overuseDieselOilStatistics
            },
            getExceedOilStatistics: {
                ...state.getExceedOilStatistics,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.blame.get_exceedOilStatistics_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getExceedOilStatistics: {
                ...state.getExceedOilStatistics,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.blame.get_exceedOilStatistics_waiting]: (state, action) => {
        return {
            ...state,
            getExceedOilStatistics: {
                ...state.getExceedOilStatistics,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.blame.get_exceedOilStatistics_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getExceedOilStatistics: {
                ...state.getExceedOilStatistics,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [actionTypes.blame.get_peccancyStatistics_success]: (state, action) => {
        const { payload: { peccancyStatistics } } = action
        // console.log('peccancyStatistics', peccancyStatistics)

        return {
            ...state,
            data: {
                ...state.data,
                peccancyStatistics
            },
            getPeccancyStatistics: {
                ...state.getPeccancyStatistics,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.blame.get_peccancyStatistics_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getPeccancyStatistics: {
                ...state.getPeccancyStatistics,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.blame.get_peccancyStatistics_waiting]: (state, action) => {
        return {
            ...state,
            getPeccancyStatistics: {
                ...state.getPeccancyStatistics,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.blame.get_peccancyStatistics_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getPeccancyStatistics: {
                ...state.getPeccancyStatistics,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [actionTypes.blame.get_truckAccidentStatistics_success]: (state, action) => {
        const { payload: { accidentStatistics } } = action
        // console.log('accidentStatistics', accidentStatistics)

        return {
            ...state,
            data: {
                ...state.data,
                accidentStatistics
            },
            getTruckAccidentStatistics: {
                ...state.getTruckAccidentStatistics,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.blame.get_truckAccidentStatistics_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTruckAccidentStatistics: {
                ...state.getTruckAccidentStatistics,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.blame.get_truckAccidentStatistics_waiting]: (state, action) => {
        return {
            ...state,
            getTruckAccidentStatistics: {
                ...state.getTruckAccidentStatistics,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.blame.get_truckAccidentStatistics_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTruckAccidentStatistics: {
                ...state.getTruckAccidentStatistics,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)