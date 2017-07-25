import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { Button, Ion } from 'native-base'
import StepIndicator from '../components/StepIndicator'

export default class AddDriver extends Component {
    constructor(props) {
        super(props)

    }


    render() {
        return (
            <View>
                <StepIndicator />
                <Text>AddDriver</Text>
            </View>
        )
    }
}

