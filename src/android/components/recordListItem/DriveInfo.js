import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Button } from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'

export default class DriveInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, marginRight: 4, backgroundColor: styleColor }} />
                    <Text style={{ fontSize: 12}}>{this.props.content}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
                    <Text style={{ marginLeft: 10, fontSize: 12, color: '#bfbfbf' }}>{this.props.time}</Text>
                    <Text style={{ fontSize: 12, color: '#bfbfbf' }}>操作员：{this.props.name}</Text>
                </View>

            </View>
        )
    }
}