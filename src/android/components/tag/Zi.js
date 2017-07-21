import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'

const Zi = ({ size }) => {
    let width = size
    let height = size
    let borderRadius = size / 2
    let fontSize = size / 8 * 5
    return (
        <View style={{ width, height, borderRadius, backgroundColor: '#12c3eb', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontFamily: 'rubicon-icon-font', fontSize }}>自</Text>
        </View>
    )
}

export default Zi