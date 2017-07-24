import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Button, Ion } from 'native-base'

export default class DriveInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row',alignItems:'center' }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3,marginRight:4, backgroundColor: '#00cade' }} />
                    <Text>重新启用</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
                    <Text style={{marginLeft:10}}>2017-3-30 11:30</Text>
                    <Text>操作员：王宝泉</Text>
                </View>

            </View>
        )
    }
}