import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getOperateTypeCount = () => (dispatch) => {
    console.log('actionTypes', actionTypes)
}