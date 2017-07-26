import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'
import { Button } from 'native-base'
import TextBox from '../../components/form/TextBox'
import Select from '../../components/form/Select'
import CheckBox from '../../components/form/CheckBox'
import DateTimePicker from '../../components/form/DateTimePicker'
import * as RouterDirection from '../../../util/RouterDirection'

export default class Driver extends Component {
    constructor(props) {
        super(props)
        this.onSelect = this.onSelect.bind(this)
        this.onPressSearch = this.onPressSearch.bind(this)
    }

    onSelect(param) {

    }

    onPressSearch() {
        RouterDirection.driverList(this.props.parent)()
    }

    render() {
        return (
            <ScrollView >
                <View style={{ flex: 1 }}>
                    <TextBox
                        //isRequire={false}
                        title='姓名:'
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


                    <TextBox
                        //isRequire={false}
                        title='联系电话:'
                        //value={this.state.queryCar.vinCode}
                        defaultValue={''}
                        /*verifications={[{
                            type: 'isLength',
                            arguments: [0, 17],
                            message: '长度不能超过17位'
                        }]}*/
                        onValueChange={(param) => this.onSelect({ vinCode: param })}
                        //onRequire={(param) => this.setState({ vinRequire: param })}
                        placeholder='请输入联系电话'
                    />
                    <Select
                        title='所属公司：'
                        //value={this.state.queryCar.routeStart}
                        showList={RouterDirection.selectDriverCompany(this.props.parent)}
                        onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                        defaultValue={'请选择'}
                    />

                    <Select
                        //isRequire={false}
                        title='关联货车：'
                        //value={this.state.queryCar.routeStart}
                        showList={RouterDirection.selectTractor(this.props.parent)}
                        onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                        defaultValue={'请选择'}
                    />
                    <CheckBox listTitle='所有状态' title='司机状态：' itemList={[{ id: 0, value: '正常' }, { id: 1, value: '停用' }]} onCheck={(item) => { console.log(item) }} />
                    <Select
                        //isRequire={false}
                        title='驾证类型：'
                        //value={this.state.queryCar.routeStart}
                        showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                        onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                        defaultValue={'请选择'}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <DateTimePicker
                                isRequire={false}
                                // value={this.state.queryCar.enterStart}
                                /*labelStyle={{
                                    fontSize: 12,
                                    flex: 13,
                                    textAlign: 'right'
                                }}
                                iconSytle={{
                                    fontSize: 18,
                                    flex: 2,
                                    textAlign: 'right',
                                    color: '#7a7a7a'
                                }}*/
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
                        <Button full onPress={this.onPressSearch} style={{ backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>搜索</Text>
                        </Button>
                    </View>

                </View>
            </ScrollView >

        )
    }
}