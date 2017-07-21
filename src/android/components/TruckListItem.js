import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList
} from 'react-native'

export default class TruckListItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ paddingHorizontal: 10,paddingBottom:10, backgroundColor: '#eff3f6' }}>
                <Text>TruckListItem</Text>
            </View>
        )
    }
}