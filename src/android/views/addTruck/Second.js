import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Button, Icon } from 'native-base'
import StepIndicator from '../../components/StepIndicator'

export default class Second extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator stepList={[{ step: '1', title: '基本信息' }, { step: '2', title: '上传照片' }, { step: '3', title: '车保信息' }]} current={1} />
                <Text>Second</Text>
            </View>
        )
    }
}