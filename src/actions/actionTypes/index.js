import { getTemplate, actionTemplate } from './ActionTypesTemplate'

const operateTypeCount = getTemplate('OperateTypeCount')
const waitingInspectCount = getTemplate('WaitingInspectCount')
const truckList = getTemplate('TruckList')
const truckInfo = getTemplate('TruckInfo')
const truckInsureRel = getTemplate('TruckInsureRel')
const truckRecord = getTemplate('TruckRecord')


const actionTypes = {
    homeActionTypes: actionTemplate({ operateTypeCount, waitingInspectCount }, 'HomeAction'),
    truckListActionTypes: actionTemplate({ truckList }, 'TruckListAction'),
    truckInfoActionTypes: actionTemplate({ truckInfo, truckRecord, truckInsureRel }, 'TruckInfoAction')
}

export default actionTypes