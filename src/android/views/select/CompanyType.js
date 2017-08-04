import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableNativeFeedback
} from 'react-native'
import { Button, Icon } from 'native-base'
import FontTag from '../../components/tag/FontTag'
import * as RouterDirection from '../../../util/RouterDirection'

export default class CompanyType extends Component {
    constructor(props) {
        super(props)
        this.renderItem = this.renderItem.bind(this)
    }

    renderItem(param) {
        return (
            <TouchableNativeFeedback onPress={param.router} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#e2e9ec', paddingVertical: 15, paddingHorizontal: 10 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {param.type == 0 && <FontTag size={30} title='自' color='#12c3eb' fontColor='#fff' />}
                        {param.type == 1 && <FontTag size={30} title='协' color='#73de8a' fontColor='#fff' />}
                        {param.type == 2 && <FontTag size={30} title='供' color='#efbb7a' fontColor='#fff' />}
                        {param.type == 3 && <FontTag size={30} title='包' color='#e08ddd' fontColor='#fff' />}
                    </View>
                    <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text>{param.title}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Icon name='ios-arrow-forward' style={{ fontSize: 25, color: '#7a7a7a' }} />
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    render() {
        console.log(this.props)
        return (
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        {this.renderItem({ title: '自营', type: 0, router: () => this.props.router({ initParam: { onSelect: this.props.onSelect, operateType: 1 } }) })}
                        {this.renderItem({ title: '外协', type: 1, router: () => this.props.router({ initParam: { onSelect: this.props.onSelect, operateType: 2 } }) })}
                        {this.renderItem({ title: '供方', type: 2, router: () => this.props.router({ initParam: { onSelect: this.props.onSelect, operateType: 3 } }) })}
                        {this.renderItem({ title: '承包', type: 3, router: () => this.props.router({ initParam: { onSelect: this.props.onSelect, operateType: 4 } }) })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}