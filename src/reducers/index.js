import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import homeReducer from './HomeReducer'
import truckListReducer from './TruckListReducer'
import truckInfoReducer from './TruckInfoReducer'
import loginReducer from './LoginReducer'
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
import addDriverThirdReducer from './AddDriverThirdReducer'
import driverInfoReducer from './DriverInfoReducer'
import driverListReducer from './DriverListReducer'
import initializationReducer from './InitializationReducer'
import PasswordReducer from './PasswordReducer'
import retrievePasswordReducer from './RetrievePasswordReducer'
import truckHomeFilterListReducer from './TruckHomeFilterListReducer'
import demageListReducer from '../android/views/demageList/DemageListReducer'
import applyDamageUploadImageReducer from '../android/views/applyDamageUploadImage/ApplyDamageUploadImageReducer'
import applyDamageSubmitReducer from '../android/components/applyDamage/submit/ApplyDamageSubmitReducer'
import responsibilityListReducer from '../android/views/responsibilityList/ResponsibilityListReducer'
import selectCarReducer from './selectCarReducer'
import carInfoForDemageReducer from '../android/components/demageInfo/carInfoForDemage/CarInfoForDemageReducer'
import recordForDemageReducer from '../android/components/demageInfo/recordForDemage/RecordForDemageReducer'
import demageOpResultReducer from '../android/components/demageInfo/demageOpResult/DemageOpResultReducer'
import imageListForDemageReducer from '../android/components/demageInfo/imageListForDemage/ImageListForDemageReducer'
import demageEditorReducer from '../android/components/demageInfo/demageEditor/DemageEditorReducer'
import settingReducer from './SettingReducer'

export default combineReducers({
    form: formReducer,
    homeReducer,
    truckListReducer,
    truckInfoReducer,
    loginReducer,
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
    addDriverThirdReducer,
    driverInfoReducer,
    driverListReducer,
    initializationReducer,
    PasswordReducer,
    truckHomeFilterListReducer,
    retrievePasswordReducer,
    demageListReducer,
    responsibilityListReducer,
    applyDamageSubmitReducer,
    selectCarReducer,
    applyDamageUploadImageReducer,
    carInfoForDemageReducer,
    recordForDemageReducer,
    demageOpResultReducer,
    imageListForDemageReducer,
    demageEditorReducer,
    settingReducer
})