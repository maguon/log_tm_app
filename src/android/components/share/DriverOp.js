import React, { Component } from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button,Icon } from 'native-base'

const DriverOp = props => {
    const { parent } = props
    return (
        <Button transparent onPress={Actions.addDriverFirst}>
            <Icon name='md-add' color='#fff' />
        </Button>
    )
}

export default DriverOp

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
