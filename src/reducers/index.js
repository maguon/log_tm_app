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
import selectAccidentReducer from './SelectAccidentReducer'
import selectRepairStationReducer from './SelectRepairStationReducer'
import repairEditorReducer from './RepairEditorReducer'
import finishRepairReducer from './FinishRepairReducer'
import createRepairReducer from './CreateRepairReducer'

// import PasswordReducer from './PasswordReducer'
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
import personalCenterReducer from '../android/views/personalCenter/PersonalCenterReducer'
import updatePasswordReducer from '../android/views/updatePassword/UpdatePasswordReducer'

import peccancyListReducer from '../android/complatedViews/peccancyList/peccancyListReducer'
import accidentEditorReducer from '../android/complatedViews/accidentEditor/accidentEditorReducer'
import overuseDieselOilListReducer from '../android/complatedViews/overuseDieselOilList/overuseDieselOilListReducer'
import peccancyEditorReducer from '../android/complatedViews/peccancyEditor/peccancyEditorReducer'
import driverOptionalListReducer from '../android/complatedViews/optionalList/driver/driverOptionalListReducer'
import createOveruseDieselOilReducer from '../android/complatedViews/createOveruseDieselOil/createOveruseDieselOilReducer'
import dpRouteRaskOptionalListReducer from '../android/complatedViews/optionalList/dpRouteTask/DpRouteRaskOptionalListReducer'

import accidentListReducer from '../android/complatedViews/accidentList/accidentListReducer'
import accidentInfoReducer from '../android/complatedViews/accidentInfo/accidentInfoReducer'
import createAccidentReducer from '../android/complatedViews/createAccident/createAccidentReducer'

import accidentIndemnifyListReducer from '../android/complatedViews/accidentIndemnifyList/accidentIndemnifyListReducer'
import accidentIndemnifyEditorReducer from '../android/complatedViews/accidentIndemnifyEditor/accidentIndemnifyEditorReducer'
import accidentIndemnifyInfoReducer from '../android/complatedViews/accidentIndemnifyInfo/accidentIndemnifyInfoReducer'

import createAccidentDisposeReducer from '../android/complatedViews/createAccidentDispose/createAccidentDisposeReducer'
import locationOptionalListReducer from '../android/complatedViews/optionalList/location/locationOptionalListReducer'
import userOptionalListReducer from '../android/complatedViews/optionalList/user/userOptionalListReducer'
import truckOptionalListReducer from '../android/complatedViews/optionalList/truck/truckOptionalListReducer'
import repairStationOptionalListReducer from '../android/complatedViews/optionalList/repairStation/repairStationOptionalListReducer'
import insureCompanyOptionalListReducer from '../android/complatedViews/optionalList/insureCompany/insureCompanyOptionalListReducer'
import accidentIndemnifyDetailReducer from '../android/complatedViews/accidentIndemnifyDetail/accidentIndemnifyDetailReducer'
import createAccidentIndemnifyReducer from '../android/complatedViews/createAccidentIndemnify/createAccidentIndemnifyReducer'
import accidentRepairListReducer from '../android/complatedViews/accidentRepairList/accidentRepairListReducer'
import accidentRepairEditorReducer from '../android/complatedViews/accidentRepairEditor/accidentRepairEditorReducer'
import uploadImageForCreateAccidentReducer from '../android/complatedViews/uploadImageForCreateAccident/uploadImageForCreateAccidentReducer'
import uploadImageForAccidentInfoReducer from '../android/complatedViews/uploadImageForAccidentInfo/uploadImageForAccidentInfoReducer'
import blameReducer from '../android/complatedViews/blame/blameReducer'

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
    blameReducer,
    //PasswordReducer,
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
    settingReducer,
    personalCenterReducer,
    updatePasswordReducer,
    selectAccidentReducer,
    selectRepairStationReducer,
    finishRepairReducer,
    createRepairReducer,
    repairEditorReducer,


    peccancyListReducer,
    overuseDieselOilListReducer,
    peccancyEditorReducer,
    driverOptionalListReducer,
    createOveruseDieselOilReducer,
    dpRouteRaskOptionalListReducer,
    locationOptionalListReducer,
    accidentEditorReducer,
    accidentInfoReducer,
    userOptionalListReducer,
    truckOptionalListReducer,
    
    accidentListReducer,
    createAccidentReducer,
    createAccidentDisposeReducer,
    accidentIndemnifyListReducer,
    insureCompanyOptionalListReducer,
    accidentIndemnifyEditorReducer,
    accidentIndemnifyInfoReducer,
    accidentIndemnifyDetailReducer,
    createAccidentIndemnifyReducer,
    accidentRepairListReducer,
    accidentRepairEditorReducer,
    repairStationOptionalListReducer,
    uploadImageForCreateAccidentReducer,
    uploadImageForAccidentInfoReducer
})