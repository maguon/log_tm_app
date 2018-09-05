import { Actions } from 'react-native-router-flux'

export const driverList = (parent) => {
    if (parent === 'homeBlock') return Actions.driverListAtHomeBlock
    if (parent === 'driverBlock') return Actions.driverListAtDriverBlock
}

export const driverInfo = (parent) => {
    if (parent === 'homeBlock') return Actions.driverInfoAtHomeBlock
    if (parent === 'driverBlock') return Actions.driverInfoAtDriverBlock
}

export const richText = (parent) => {
    if (parent === 'driverBlock') return Actions.richTextAtDriverBlock
    if (parent === 'truckBlock') return Actions.richTextAtTruckBlock
    if (parent === 'homeBlock') return Actions.richTextAtHomeBlock
}

export const truckInfo = (parent) => {
    if (parent === 'homeBlock') return Actions.truckInfoAtHomeBlock
    if (parent === 'truckBlock') return Actions.truckInfoAtTruckBlock
}

export const truckList = (parent) => {
    if (parent === 'homeBlock') return Actions.truckListAtHomeBlock
    if (parent === 'truckBlock') return Actions.truckListAtTruckBlock
}

export const selectMake = (parent) => {
    if (parent === 'truckBlock') return Actions.selectMakeAtTruckBlock
    if (parent === 'homeBlock') return Actions.selectMakeAtHomeBlock
}

export const selectCompany = (parent) => {
    if (parent === 'homeBlock') return Actions.selectCompanyAtHomeBlock
    if (parent === 'truckBlock') return Actions.selectCompanyAtTruckBlock
    if (parent === 'driverBlock') return Actions.selectCompanyAtDriverBlock
}

export const selectDrivingLicenseType = (parent) => {
    if (parent === 'homeBlock') return Actions.selectDrivingLicenseTypeAtHomeBlock
    if (parent === 'driverBlock') return Actions.selectDrivingLicenseTypeAtDriverBlock
}

export const selectTruck = (parent) => {
    if (parent === 'homeBlock') return Actions.selectTruckAtHomeBlock
    if (parent === 'driverBlock') return Actions.selectTruckAtDriverBlock
    if (parent === 'truckBlock') return Actions.selectTruckAtTruckBlock
    if (parent === 'blameBlock') return Actions.selectTruckAtBlameBlock
}

export const selectCompanyType = (parent) => {
    if (parent === 'homeBlock') return Actions.selectCompanyTypeAtHomeBlock
    if (parent === 'truckBlock') return Actions.selectCompanyTypeAtTruckBlock
    if (parent === 'driverBlock') return Actions.selectCompanyTypeAtDriverBlock
}

export const selectDriver = (parent) => {
    if (parent === 'homeBlock') return Actions.selectDriverAtHomeBlock
    if (parent === 'driverBlock') return Actions.selectDriverAtDriverBlock
    if (parent === 'truckBlock') return Actions.selectDriverAtTruckBlock
    if (parent === 'settingBlock') return Actions.selectDriverAtSettingBlock
    if (parent === 'blameBlock') return Actions.selectDriverAtBlameBlock
}

export const selectInsurance = (parent) => {
    if (parent === 'homeBlock') return Actions.selectInsuranceAtHomeBlock
    if (parent === 'truckBlock') return Actions.selectInsuranceAtTruckBlock
}


export const selectInsuranceType = (parent) => {
    if (parent === 'homeBlock') return Actions.selectInsuranceTypeAtHomeBlock
    if (parent === 'truckBlock') return Actions.selectInsuranceTypeAtTruckBlock
}


export const singlePhotoView = (parent) => {
    if (parent === 'truckBlock') return Actions.singlePhotoViewAtTruckBlock
    if (parent === 'driverBlock') return Actions.singlePhotoViewAtDriverBlock
    if (parent === 'homeBlock') return Actions.singlePhotoViewAtHomeBlock
    if (parent === 'settingBlock') return Actions.singlePhotoViewAtSettingBlock
}


export const customPhotoView = (parent) => {
    if (parent === 'truckBlock') return Actions.customPhotoViewAtTruckBlock
    if (parent === 'homeBlock') return Actions.customPhotoViewAtHomeBlock
}

export const addInsurance = (parent) => {
    if (parent === 'truckBlock') return Actions.addInsuranceAtTruckBlock
    if (parent === 'homeBlock') return Actions.addInsuranceAtHomeBlock
}

export const createRepair = (parent) => {
    if (parent === 'truckBlock') return Actions.createRepairAtTruckBlock
    if (parent === 'homeBlock') return Actions.createRepairAtHomeBlock
}

export const updateRepair = (parent) => {
    if (parent === 'truckBlock') return Actions.updateRepairAtTruckBlock
    if (parent === 'homeBlock') return Actions.updateRepairAtHomeBlock
}


export const repairEditor = (parent) => {
    if (parent === 'homeBlock') return Actions.repairEditorAtHomeBlock
    if (parent === 'truckBlock') return Actions.repairEditorAtTruckBlock
}

export const listCennectNav = (parent) => {
    if (parent === 'homeBlock') return Actions.listCennectNavAtHomeBlock
    if (parent === 'truckBlock') return Actions.listCennectNavAtTruckBlock
}

export const finishRepair = (parent) => {
    if (parent === 'homeBlock') return Actions.finishRepairAtHomeBlock
    if (parent === 'truckBlock') return Actions.finishRepairAtTruckBlock
}

export const repairInfo = (parent) => {
    if (parent === 'homeBlock') return Actions.repairInfoAtHomeBlock
    if (parent === 'truckBlock') return Actions.repairInfoAtTruckBlock
}

export const selectAccident = (parent) => {
    if (parent === 'homeBlock') return Actions.selectAccidentAtHomeBlock
    if (parent === 'truckBlock') return Actions.selectAccidentAtTruckBlock
}