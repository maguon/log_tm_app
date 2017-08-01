import { combineReducers } from 'redux'
import homeReducer from './HomeReducer'
import truckListReducer from './TruckListReducer'

export default combineReducers({
    homeReducer,
    truckListReducer
})