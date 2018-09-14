import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actions/actionTypes'
import { objectExceptNull } from '../../../util/ObjectToUrl'

export const getBlameStatistics = () => async (dispatch) => {
    try {
        const urls = [`${base_host}/drivePeccancyCount`,
        `${base_host}/driveExceedOilCount`,
        `${base_host}/truckAccidentNotCheckCount`]
        console.log('urls', urls)
        const res = await Promise.all(urls.map((url) => httpRequest.get(url)))
        console.log('res', res)
        if (res[0].success && res[1].success && res[2].success) {
            dispatch({
                type: actionTypes.blame.get_blameStatistics_success, payload: {
                    peccancyStatistics: res[0].result.find(item => item.stat_status == 1),
                    overuseDieselOilStatistics: res[1].result.find(item => item.stat_status == 1),
                    accidentStatistics: {
                        waiting: res[2].result.find(item => item.accident_status == 1).truck_accident_count,
                        doing: res[2].result.find(item => item.accident_status == 2).truck_accident_count
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.blame.get_blameStatistics_error, payload: { failedMsg: '' } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.blame.get_blameStatistics_error, payload: { errorMsg: err } })
    }
}

export const getBlameStatisticsWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.blame.get_blameStatistics_waiting, payload: {} })
}