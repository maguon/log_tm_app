import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
 import { Button, Icon } from 'native-base'

export default class Tractor extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>车头</Text>
            </View>
        )
    }
}