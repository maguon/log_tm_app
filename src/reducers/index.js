import { combineReducers } from 'redux'
import homeReducer from './HomeReducer'
import truckListReducer from './TruckListReducer'
import truckInfoReducer from './TruckInfoReducer'
import userReducer from './UserReducer'
import selectMakeReducer from './SelectMakeReducer'
import selectCompanyReducer from './SelectCompanyReducer'
import selectTruckReducer from './SelectTruckReducer'
import selectDriverReducer from './SelectDriverReducer'
import addTruckFirstReducer from './AddTruckFirstReducer'
import addTruckSecondReducer from './AddTruckSecondReducer'

export default combineReducers({
    homeReducer,
    truckListReducer,
    truckInfoReducer,
    userReducer,
    addTruckFirstReducer,
    addTruckSecondReducer,
    selectMakeReducer,
    selectCompanyReducer,
    selectTruckReducer,
    selectDriverReducer
})