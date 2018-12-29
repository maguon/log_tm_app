import httpRequest from '../util/HttpRequest.js'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const addInsurance = (param) => (dispatch) => {
    dispatch({ type: actionTypes.addTruckFourthTypes.ADD_Insurance, payload: { data: param } })
}

export const cleanAddTruckFourthDate = () => (dispatch) => {
    dispatch({ type: actionTypes.addTruckFourthTypes.CLEAN_AddTruckFourthReducer, payload: {} })
}