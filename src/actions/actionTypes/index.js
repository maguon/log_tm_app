import { getTemplate, actionTemplate } from './ActionTypesTemplate'

const operateTypeCount = getTemplate('OperateTypeCount')
const waitingInspectCount = getTemplate('WaitingInspectCount')
const truckList = getTemplate('TruckList')
//const testActionTypes = getTemplate('test')

const actionTypes = {
    homeActionTypes: actionTemplate({ operateTypeCount, waitingInspectCount }, 'HomeAction'),
    truckListActionTypes: actionTemplate({ truckList }, 'TruckListAction')
    //testActionTypes
}

export default actionTypes