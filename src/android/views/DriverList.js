import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList
} from 'react-native'

import DriverListItem from '../components/DriverListItem'
import * as RouterDirection from '../../util/RouterDirection'

export default class DriverList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ paddingHorizontal: 10,paddingBottom:10, backgroundColor: '#eff3f6' }}> 
                
                <DriverListItem onPress={RouterDirection.driverInfo(this.props.parent)}/>
                <DriverListItem onPress={RouterDirection.driverInfo(this.props.parent)}/>

            </View>
        )
    }
}