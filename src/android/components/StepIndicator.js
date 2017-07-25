import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Button, Icon } from 'native-base'

export default class StepIndicator extends Component {
    constructor(props) {
        super(props)
        this.renderBeforeItem = this.renderBeforeItem.bind(this)
        this.renderAfterItem = this.renderAfterItem.bind(this)
    }

    static defaultProps = {
        stepList: [{ step: '1', title: '基本信息' }, { step: '2', title: '上传照片' }],
        current: 1
    }

    renderBeforeItem(step) {
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 7 }}>
                <View style={{ backgroundColor: '#ff9aa9', height: 20, width: 20, borderWidth: 2, borderRadius: 10, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#fff' }}>{step}</Text>
                </View>
                <View style={{ paddingLeft: 5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12 }}>基本信息</Text>
                </View>
            </View>
        )
    }

    renderAfterItem(step) {
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 7 }}>
                <View style={{ backgroundColor: '#adadad', height: 20, width: 20, borderWidth: 2, borderRadius: 10, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#fff' }}>{step}</Text>
                </View>
                <View style={{ paddingLeft: 5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12 }}>基本信息</Text>
                </View>
            </View>
        )
    }

    renderCurrentItem(step) {
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 7 }}>
                <View style={{ backgroundColor: '#fff', height: 20, width: 20, borderWidth: 2, borderRadius: 10, borderColor: '#ff9aa9', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#ff9aa9' }}>{step}</Text>
                </View>
                <View style={{ paddingLeft: 5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12 }}>基本信息</Text>
                </View>
            </View>
        )
    }


    render() {
        return (
            <View style={{ backgroundColor: '#edf1f4', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {/*<View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10 }}>*/}
                {this.renderBeforeItem('1')}
                <View style={{ height: 1, width: 10, backgroundColor: '#adadad' }} />
                {this.renderCurrentItem('2')}
                <View style={{ height: 1, width: 10, backgroundColor: '#adadad' }} />
                {this.renderAfterItem('3')}

                {/*</View>*/}
            </View>
        )
    }
}