import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    Image,
    TouchableNativeFeedback
} from 'react-native'

import FontTag from '../components/tag/FontTag'
export default class TruckListItem extends Component {
    constructor(props) {
        super(props)
    }

    // static defaultProps = {
    //     onPress: () => { }
    // }

    render() {
        if (this.props.truck.driving_date) {
            confirmFlag = (Date.parse(new Date(this.props.truck.driving_date))) < (Date.parse(new Date()) + 30 * 24 * 60 * 60 * 1000)
        }
        return (
            <TouchableNativeFeedback onPress={this.props.onPress} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ backgroundColor: '#fff', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: 30, alignSelf: 'flex-start',flex:1 }}>
                        {this.props.truck.truck_type == 2 && <Image source={{ uri: 'truck_tail' }} style={{ width: 30, height: 30 }} />}
                        {this.props.truck.truck_type == 1 && <Image source={{ uri: 'truck_head' }} style={{ width: 30, height: 30 }} />}
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, alignSelf: 'center',flex:1 }}>
                        {this.props.truck.operate_type == 1 && <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' />}
                        {this.props.truck.operate_type == 2 && <FontTag size={26} title='协' color='#73de8a' fontColor='#fff' />}
                        {this.props.truck.operate_type == 3 && <FontTag size={26} title='供' color='#efbb7a' fontColor='#fff' />}
                        {this.props.truck.operate_type == 4 && <FontTag size={26} title='包' color='#e08ddd' fontColor='#fff' />}
                    </View>
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10,flex:5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ lineHeight: 18, fontSize: 18, color: '#00cade' }}>{this.props.truck.truck_num}</Text>
                            {this.props.truck.truck_type == 1 && <Text style={{ fontSize: 12, color: '#b9c8cf', paddingLeft: 10 }}>{this.props.truck.brand_name ? this.props.truck.brand_name : ''}</Text>}
                            {this.props.truck.truck_type == 2 && <Text style={{ fontSize: 12, color: '#b9c8cf', paddingLeft: 10 }}>车位：{this.props.truck.number ? this.props.truck.number : ''}</Text>}
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <Text style={{ fontSize: 12, color: '#b9c8cf' }}>{this.props.truck.company_name}</Text>
                            {this.props.truck.truck_type == 1 && <Text style={{ fontSize: 12, color: '#b9c8cf', paddingLeft: 20 }}>主驾：张宝全</Text>}
                            {this.props.truck.truck_type == 2 && <Text style={{ fontSize: 12, color: '#b9c8cf', paddingLeft: 20 }}>车头：张宝全</Text>}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: 62,flex:2 }}>
                        { confirmFlag && <View style={{ paddingVertical: 10, paddingLeft: 10, alignSelf: 'flex-end' }}>
                            <FontTag size={16} title='检' color='#f87775' fontColor='#fff' />
                        </View>}
                        {this.props.truck.repair_status == 0 && <View style={{ paddingVertical: 10, paddingHorizontal: 10, alignSelf: 'flex-end' }}>
                            <FontTag size={16} title='修' color='#f8cc71' fontColor='#fff' />
                        </View>}
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}