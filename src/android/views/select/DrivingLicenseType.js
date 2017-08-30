import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableNativeFeedback
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import DrivingLicenseTypeList from '../../../config/DrivingLicenseType.json'

export default class DrivingLicenseType extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }

    _onPress(param) {
        this.props.onSelect(param)
        Actions.pop()
    }

    render() {
        return <FlatList
            showsVerticalScrollIndicator={false}
            data={DrivingLicenseTypeList}
            renderItem={({ item, i }) => {
                return (
                    <TouchableNativeFeedback key={i} onPress={() => this._onPress(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#dddddd' }}>
                            <Text>{item.value}</Text>
                        </View>
                    </TouchableNativeFeedback>
                )
            }}
        />
    }
}
