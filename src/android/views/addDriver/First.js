import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView
} from 'react-native'
import { Button, Icon } from 'native-base'
import StepIndicator from '../../components/StepIndicator'

export default class First extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text>33333</Text>
                        <Text>1111</Text>
                        <Text>1111</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

