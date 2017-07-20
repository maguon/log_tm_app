import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Button } from 'native-base'
import TextBox from '../../components/form/TextBox'
import Select from '../../components/form/Select'
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
            <View>
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
                    //isRequire={false}
                    title='所属：'
                    //value={this.state.queryCar.routeStart}
                    //showList={RouterDirection.selectCity(this.props.parent)}
                    onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                    defaultValue={'请选择'}
                />

                <Select
                    //isRequire={false}
                    title='关联货车：'
                    //value={this.state.queryCar.routeStart}
                    //showList={RouterDirection.selectCity(this.props.parent)}
                    onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                    defaultValue={'请选择'}
                />
                <Select
                    //isRequire={false}
                    title='司机状态：'
                    //value={this.state.queryCar.routeStart}
                    //showList={RouterDirection.selectCity(this.props.parent)}
                    onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                    defaultValue={'请选择'}
                />
                <Select
                    //isRequire={false}
                    title='驾证类型：'
                    //value={this.state.queryCar.routeStart}
                    //showList={RouterDirection.selectCity(this.props.parent)}
                    onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                    defaultValue={'请选择'}
                />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 8 }}>
                        <DateTimePicker
                            isRequire={false}
                            // value={this.state.queryCar.enterStart}
                            labelStyle={{
                                fontSize: 12,
                                flex: 13,
                                textAlign: 'right'
                            }}
                            iconSytle={{
                                fontSize: 18,
                                flex: 2,
                                textAlign: 'right',
                                color: '#7a7a7a'
                            }}
                            title='检证日期：'
                            defaultValue={'请选择'}
                            onValueChange={(param) => this.onSelect({ enterStart: param })}
                        />
                    </View>
                    <View style={{ flex: 7 }}>
                        <DateTimePicker
                            isRequire={false}
                            // value={this.state.queryCar.enterEnd}
                            title='至：'
                            defaultValue={'请选择'}
                            onValueChange={(param) => this.onSelect({ enterEnd: param })}
                        />
                    </View>
                </View>
                <Button
                    full
                    //disabled={!this.state.vinRequire}
                    // style={this.state.vinRequire ? styles.btnSytle : styles.btnDisabledSytle}
                    onPress={this.onPressSearch}
                >
                    <Text style={{ color: '#fff' }}>搜索</Text>
                </Button>

            </View>
        )
    }
}