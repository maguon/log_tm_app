import React, { Component } from 'react'
import {
    Text,
    View,
    Image
} from 'react-native'

import FontTag from './tag/FontTag'

export default class DriverListItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#e6ebee', borderRadius: 1, marginTop: 10 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FontTag size={30} title='自' color='#12c3eb' fontColor='#fff' />
                    {/*<FontTag size={40} title='协' color='#73de8a' fontColor='#fff'/>
                <FontTag size={40} title='供' color='#efbb7a' fontColor='#fff'/>
                <FontTag size={40} title='包' color='#e08ddd' fontColor='#fff'/>*/}
                </View>
                <View style={{ flex: 2 }} >
                    <View style={{ marginVertical: 8 }}>
                        <Text style={{ color: '#00cade' }}>张宝全</Text>
                    </View>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: '#b9c8cf', fontSize: 11 }}>安吉物流</Text>
                    </View>
                </View>
                <View style={{ flex: 2,  justifyContent: 'flex-end' }} >
                    <View style={{ marginVertical: 8, alignItems: 'center'}}>
                        <Image source={{ uri: 'man' }} style={{ width: 6, height: 12 }} />
                        {/*<Image source={{ uri: 'woman' }} style={{ width: 6, height: 12 }} />*/}
                    </View>
                    <View style={{ marginBottom: 8, alignItems: 'center' }}>
                        <Text style={{ color: '#b9c8cf', fontSize: 11 }}>辽B12345</Text>
                    </View>
                </View>
                <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <View style={{ marginRight: 5, marginBottom: 5 }}>
                        <FontTag size={18} title='检' color='#f7656a' fontColor='#fff' />
                    </View>
                </View>
            </View>
        )
    }
}