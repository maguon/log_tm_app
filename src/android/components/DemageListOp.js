import React, { Component } from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button,Icon } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const HomeOperation = props => {
    const { parent } = props
    return (
        <Button transparent onPress={Actions.applyDamage}>
            <Icon name='md-add' color='#fff' />
        </Button>
    )
}

export default HomeOperation

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
