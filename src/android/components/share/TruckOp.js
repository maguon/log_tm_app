import React, { Component } from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const TruckOp = props => {
    const { parent } = props
    return (
        <Button transparent onPress={Actions.addTruckFirst}>
            <MaterialCommunityIcons name='qrcode' size={20} color='#fff' />
        </Button>
    )
}

export default TruckOp

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
