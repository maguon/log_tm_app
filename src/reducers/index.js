import { combineReducers } from 'redux'
import homeReducer from './HomeReducer'
import truckListReducer from './TruckListReducer'
import truckInfoReducer from './TruckInfoReducer'
import userReducer from './UserReducer'
import selectMakeReducer from './SelectMakeReducer'
import addTruckFirstReducer from './AddTruckFirstReducer' 

export default combineReducers({
    homeReducer,
    truckListReducer,
    truckInfoReducer,
    userReducer,
    addTruckFirstReducer,
    selectMakeReducer
})