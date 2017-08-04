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
    if (parent === 'truckBlock') return Actions.selectMakeAtDriverBlock
}

export const selectDriverCompany = (parent) => {
    if (parent === 'homeBlock') return Actions.selectDriverCompanyAtHomeBlock
    if (parent === 'driverBlock') return Actions.selectDriverCompanyAtDriverBlock
}

export const selectDrivingLicenseType = (parent) => {
    if (parent === 'homeBlock') return Actions.selectDrivingLicenseTypeAtHomeBlock
    if (parent === 'driverBlock') return Actions.selectDrivingLicenseTypeAtDriverBlock
}

export const selectTractor = (parent) => {
    // if (parent === 'homeBlock') return Actions.selectDrivingLicenseTypeAtHomeBlock
    if (parent === 'driverBlock') return Actions.selectTractorAtDriverBlock
}

export const selectCompanyType = (parent) => {
    if (parent === 'truckBlock') return Actions.selectMakeAtTruckBlock
}



