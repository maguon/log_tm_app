import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList
} from 'react-native'

import DriverItem from '../components/DriverItem'

export default class DriverList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{paddingHorizontal:10,backgroundColor:'#eff3f6'}}>
                <DriverItem />
                <Text>DriverList</Text>
            </View>
        )
    }
}