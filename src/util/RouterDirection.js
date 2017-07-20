import { Actions } from 'react-native-router-flux'

export const driverList = (parent) => {
    if (parent === 'homeBlock') return Actions.driverListAtHomeBlock
    //if (parent === 'truckBlock') return Actions.driverListAtTruckBlock
    if (parent === 'driverBlock') return Actions.driverListAtDriverBlock
    //if (parent === 'settingBlock') return Actions.driverListAtSettingBlock
}


