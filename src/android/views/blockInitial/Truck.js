import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'
import { Button } from 'native-base'

import Select from '../../components/form/Select'
import DateTimePicker from '../../components/form/DateTimePicker'
import TextBox from '../../components/form/TextBox'

export default class Truck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0
        }
        this.onPressSegment = this.onPressSegment.bind(this)
        this.onSelect = this.onSelect.bind(this)
    }

    onPressSegment(index) {
        if (this.state.active != index)
            this.setState({ active: index })
    }

    onSelect(param) {

    }

    render() {
        return (

            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 30, marginVertical: 10, flexDirection: 'row', borderWidth: 1, borderColor: '#00cade' }}>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 0 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(0)}>
                        <Text style={{ color: this.state.active == 0 ? '#fff' : '#00cade' }}>车头</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 1 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(1)}>
                        <Text style={{ color: this.state.active == 1 ? '#fff' : '#00cade' }}>挂车</Text>
                    </Button>
                </View>
                <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#00cade', flex: 1 }}>
                    <ScrollView >
                        <View style={{ flex: 1 }}>
                            <TextBox
                                //isRequire={false}
                                title='车牌：'
                                //value={this.state.queryCar.vinCode}
                                defaultValue={''}
                                /*verifications={[{
                                    type: 'isLength',
                                    arguments: [0, 17],
                                    message: '长度不能超过17位'
                                }]}*/
                                onValueChange={(param) => this.onSelect({ vinCode: param })}
                                //onRequire={(param) => this.setState({ vinRequire: param })}
                                placeholder='请输入姓名'
                            />
                        </View>
                    </ScrollView >
                </View>

            </View>

        )
    }
}