import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList
} from 'react-native'
import TruckListItem from '../components/TruckListItem'
import * as RouterDirection from '../../util/RouterDirection'

export default class TruckList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ paddingHorizontal: 10, paddingBottom: 10, backgroundColor: '#eff3f6' }}>
                <TruckListItem type={0} truckType={0} isInspect={true} onPress={RouterDirection.truckInfo(this.props.parent)} isRepair={true} />
                <TruckListItem type={1} truckType={1} isInspect={true} onPress={RouterDirection.truckInfo(this.props.parent)} />
                <TruckListItem type={2} truckType={0} onPress={RouterDirection.truckInfo(this.props.parent)} />
                <TruckListItem type={3} truckType={1} isRepair={true} onPress={RouterDirection.truckInfo(this.props.parent)} />
            </View>
        )
    }
}