import React, { Component } from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const DriverOp = props => {
    const { parent } = props
    return (
        <Button transparent onPress={Actions.addDriverFirst}>
            <MaterialCommunityIcons name='qrcode' size={20} color='#fff' />
        </Button>
    )
}

export default DriverOp

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
