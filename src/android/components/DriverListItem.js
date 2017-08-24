import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableNativeFeedback
} from 'react-native'

import FontTag from './tag/FontTag'

export default class DriverListItem extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        onPress: () => { },
    }

    render() {
        if (this.props.initParam.license_date) {
            confirmFlag = (Date.parse(new Date(this.props.initParam.license_date))) < (Date.parse(new Date()) + 30 * 24 * 60 * 60 * 1000)
        }
        else { confirmFlag = false }
        return (
            <TouchableNativeFeedback onPress={this.props.onPress} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#e6ebee', borderRadius: 1, marginTop: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {this.props.initParam.operate_type == 1 && <FontTag size={30} title='自' color='#12c3eb' fontColor='#fff' />}
                        {this.props.initParam.operate_type == 2 && <FontTag size={30} title='协' color='#73de8a' fontColor='#fff' />}
                        {this.props.initParam.operate_type == 3 && <FontTag size={30} title='供' color='#efbb7a' fontColor='#fff' />}
                        {this.props.initParam.operate_type == 4 && <FontTag size={30} title='包' color='#e08ddd' fontColor='#fff' />}
                    </View>
                    <View style={{ flex: 2 }} >
                        <View style={{ marginVertical: 8 }}>
                            <Text onPress={this.props.onPress} style={{ color: '#00cade' }}>{this.props.initParam.drive_name ? this.props.initParam.drive_name : ''}</Text>
                        </View>
                        <View style={{ marginBottom: 8 }}>
                            <Text style={{ color: '#b9c8cf', fontSize: 11 }}>{this.props.initParam.company_name ? this.props.initParam.company_name : ''}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'flex-end' }} >
                        <View style={{ marginVertical: 8, alignItems: 'center' }}>
                            {this.props.initParam.gender == 1 && <Image source={{ uri: 'man' }} style={{ width: 6, height: 12 }} />}
                            {this.props.initParam.gender == 0 && <Image source={{ uri: 'woman' }} style={{ width: 6, height: 12 }} />}
                        </View>
                        <View style={{ marginBottom: 8, alignItems: 'center' }}>
                            <Text style={{ color: '#b9c8cf', fontSize: 11 }}>{this.props.initParam.truck_num ? this.props.initParam.truck_num : ''}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <View style={{ marginRight: 5, marginBottom: 5 }}>
                            {confirmFlag && <FontTag size={18} title='检' color='#f7656a' fontColor='#fff' />}
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}