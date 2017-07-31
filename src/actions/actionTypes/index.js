import { getTemplate, actionTemplate } from './ActionTypesTemplate'

const operateTypeCount = getTemplate('OperateTypeCount')
const waitingInspectCount = getTemplate('WaitingInspectCount')
//const testActionTypes = getTemplate('test')

const actionTypes = {
    homeActionTypes: actionTemplate({ operateTypeCount, waitingInspectCount }, 'HomeAction'),
    //testActionTypes
}

export default actionTypes