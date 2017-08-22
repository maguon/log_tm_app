import { combineReducers } from 'redux'
import homeReducer from './HomeReducer'
import truckListReducer from './TruckListReducer'
import truckInfoReducer from './TruckInfoReducer'
import userReducer from './UserReducer'
import selectMakeReducer from './SelectMakeReducer'
import selectCompanyReducer from './SelectCompanyReducer'
import selectTruckReducer from './SelectTruckReducer'
import selectDriverReducer from './SelectDriverReducer'
import selectInsuranceReducer from './SelectInsuranceReducer'
import addTruckFirstReducer from './AddTruckFirstReducer'
import addTruckSecondReducer from './AddTruckSecondReducer'
import addInsuranceReducer from './AddInsuranceReducer'
import addTruckThirdReducer from './AddTruckThirdReducer'
import addTruckFourthReducer from './AddTruckFourthReducer'
import customPhotoViewReducer from './CustomPhotoViewReducer'
import singlePhotoViewReducer from './SinglePhotoViewReducer'


import addDriverFirstReducer from './AddDriverFirstReducer'
import addDriverSecondReducer from './AddDriverSecondReducer'
import driverInfoReducer from './DriverInfoReducer'
import driverListReducer from './DriverListReducer'

export default combineReducers({
    homeReducer,
    truckListReducer,
    truckInfoReducer,
    userReducer,
    addTruckFirstReducer,
    addTruckSecondReducer,
    addTruckThirdReducer,
    addTruckFourthReducer,
    addInsuranceReducer,
    selectMakeReducer,
    selectCompanyReducer,
    selectTruckReducer,
    selectDriverReducer,
    selectInsuranceReducer,
    customPhotoViewReducer,
    singlePhotoViewReducer,
    addDriverFirstReducer,
    addDriverSecondReducer,
    driverInfoReducer,
    driverListReducer
})