import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const addInsurance = (param) => (dispatch) => {
    dispatch({ type: actionTypes.addTruckFourthTypes.ADD_Insurance, payload: { data: param } })
}