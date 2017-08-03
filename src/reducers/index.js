import { combineReducers } from 'redux'
import homeReducer from './HomeReducer'
import truckListReducer from './TruckListReducer'
import truckInfoReducer from './TruckInfoReducer'
import userReducer from './UserReducer'

export default combineReducers({
    homeReducer,
    truckListReducer,
    truckInfoReducer,
    userReducer
})