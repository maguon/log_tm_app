import { combineReducers } from 'redux'
import homeReducer from './HomeReducer'
import truckListReducer from './TruckListReducer'
import truckInfoReducer from './TruckInfoReducer'

export default combineReducers({
    homeReducer,
    truckListReducer,
    truckInfoReducer
})