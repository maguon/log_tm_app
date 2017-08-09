import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const updateDrivingImage = (param) => async (dispatch) => {

}

export const updateLicenseImage = (param) => async (dispatch) => {

}

export const createTruckImage = (param) => async (dispatch) => {

}

export const resetUpdateDrivingImage = () =>  (dispatch) => {
dispatch({ type: actionTypes.addTruckSecondTypes.RESET_CREATE_TruckSecondUnBindTruck, payload: {} })
}

export const resetUpdateLicenseImage = () =>  (dispatch) => {

}

export const resetCreateTruckImage = () =>  (dispatch) => {

}