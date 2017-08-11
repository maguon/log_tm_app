import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableNativeFeedback
} from 'react-native'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import insuranceTypeList from '../../../config/insuranceType.json'

export default class Insurance extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }

    _onPress(param) {
        this.props.onSelect({ id: param.id, value: param.insuranceType })
        Actions.pop()
    }

    render() {
        return <FlatList
            showsVerticalScrollIndicator={false}
            data={insuranceTypeList}
            renderItem={({ item, i }) => {
                return (
                    <TouchableNativeFeedback key={i} onPress={() => this._onPress(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#dddddd' }}>
                            <Text>{item.insuranceType}</Text>
                        </View>
                    </TouchableNativeFeedback>
                )
            }}
        />

    }
}