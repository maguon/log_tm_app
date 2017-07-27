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

    static defaultProps = {
        type: 1,  //0:自,1：协,2：供,3：包
        truckType: 0,//0:truck_head,1:truck_tail
        isInspect: false, //true：检查，false:不检查
        isRepair: false,//true：维修，false:维修完毕
        onPress: () => { }
    }

    render() {
        return (
            <TouchableNativeFeedback onPress={this.props.onPress} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ backgroundColor: '#fff', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: 30, alignSelf: 'flex-start' }}>
                        {this.props.truckType == 1 && <Image source={{ uri: 'truck_tail' }} style={{ width: 30, height: 30 }} />}
                        {this.props.truckType == 0 && <Image source={{ uri: 'truck_head' }} style={{ width: 30, height: 30 }} />}
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, alignSelf: 'center' }}>
                        {this.props.type == 0 && <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' />}
                        {this.props.type == 1 && <FontTag size={26} title='协' color='#73de8a' fontColor='#fff' />}
                        {this.props.type == 2 && <FontTag size={26} title='供' color='#efbb7a' fontColor='#fff' />}
                        {this.props.type == 3 && <FontTag size={26} title='包' color='#e08ddd' fontColor='#fff' />}
                    </View>
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ lineHeight: 18, fontSize: 18, color: '#00cade' }}>辽A156845</Text>
                            <Text style={{ fontSize: 12, color: '#b9c8cf', paddingLeft: 10 }}>东风</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <Text style={{ fontSize: 12, color: '#b9c8cf' }}>安吉物流</Text>
                            <Text style={{ fontSize: 12, color: '#b9c8cf', paddingLeft: 20 }}>主驾：张宝全</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: 62 }}>
                        {this.props.isInspect && <View style={{ paddingVertical: 10, paddingLeft: 10, alignSelf: 'flex-end' }}>
                            <FontTag size={16} title='检' color='#f87775' fontColor='#fff' />
                        </View>}
                        {this.props.isRepair && <View style={{ paddingVertical: 10, paddingHorizontal: 10, alignSelf: 'flex-end' }}>
                            <FontTag size={16} title='修' color='#f8cc71' fontColor='#fff' />
                        </View>}
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}