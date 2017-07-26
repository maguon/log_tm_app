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
import CheckBox from '../../components/form/CheckBox'
import * as RouterDirection from '../../../util/RouterDirection'

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
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
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
                            <Select
                                title='品牌：'
                                //value={this.state.queryCar.routeStart}
                                showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                                defaultValue={'请选择'}
                            />
                            <Select
                                title='车辆所属：'
                                //value={this.state.queryCar.routeStart}
                                showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                                defaultValue={'请选择'}
                            />
                            <CheckBox listTitle='维修状态' title='维修状态：' itemList={[{ id: 0, value: '正常' }, { id: 1, value: '维修' }]} onCheck={(item) => { console.log(item) }} />
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <DateTimePicker
                                        isRequire={false}
                                        title='检证日期：'
                                        defaultValue={'请选择'}
                                        onValueChange={(param) => this.onSelect({ enterStart: param })}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <DateTimePicker
                                        isRequire={false}
                                        // value={this.state.queryCar.enterEnd}
                                        title='至：'
                                        defaultValue={'请选择'}
                                        onValueChange={(param) => this.onSelect({ enterEnd: param })}
                                    />
                                </View>
                            </View>
                            <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                                <Button full onPress={() => { }} style={{ backgroundColor: '#00cade' }}>
                                    <Text style={{ color: '#fff' }}>搜索</Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView >
                </View>

            </View>

        )
    }
}