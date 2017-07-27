import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView
} from 'react-native'
import { Button, Icon } from 'native-base'
import Select from '../../components/form/Select'
import DateTimePicker from '../../components/form/DateTimePicker'
import CheckBox from '../../components/form/CheckBox'
import RichTextBox from '../../components/form/RichTextBox'
import TextBox from '../../components/form/TextBox'
import * as RouterDirection from '../../../util/RouterDirection'
import StepIndicator from '../../components/StepIndicator'
import { Actions } from 'react-native-router-flux'

export default class First extends Component {
    constructor(props) {
        super(props)
        this.onSelect = this.onSelect.bind(this)
    }

    onSelect(param) {
        console.log(param)
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator stepList={[{ step: '1', title: '基本信息' }, { step: '2', title: '上传照片' }, { step: '3', title: '车保信息' }]} current={0} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <CheckBox listTitle='车辆类型' title='车辆类型：' itemList={[{ id: 0, value: '头车' }, { id: 1, value: '挂车' }]} onCheck={(item) => { console.log(item) }} />
                        <TextBox
                            title='车牌号码：'
                            //value={this.state.queryCar.vinCode}
                            defaultValue={''}
                            /*verifications={[{
                                type: 'isLength',
                                arguments: [0, 17],
                                message: '长度不能超过17位'
                            }]}*/
                            onValueChange={(param) => this.onSelect({ vinCode: param })}
                            placeholder='请输入车牌号码'
                        />
                        <Select
                            title='车辆所属：'
                            //value={this.state.queryCar.routeStart}
                            showList={RouterDirection.selectDriverCompany(this.props.parent)}
                            onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='车辆品牌：'
                            //value={this.state.queryCar.routeStart}
                            showList={RouterDirection.selectDriverCompany(this.props.parent)}
                            onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                            defaultValue={'请选择'}
                        />
                        <TextBox
                            title='联系电话：'
                            //value={this.state.queryCar.vinCode}
                            defaultValue={''}
                            /*verifications={[{
                                type: 'isLength',
                                arguments: [0, 17],
                                message: '长度不能超过17位'
                            }]}*/
                            onValueChange={(param) => this.onSelect({ vinCode: param })}
                            placeholder='请输入联系电话'
                        />
                        <TextBox
                            title='识别代码：'
                            //value={this.state.queryCar.vinCode}
                            defaultValue={''}
                            /*verifications={[{
                                type: 'isLength',
                                arguments: [0, 17],
                                message: '长度不能超过17位'
                            }]}*/
                            onValueChange={(param) => this.onSelect({ vinCode: param })}
                            placeholder='请输入识别代码'
                        />
                        <Select
                            title='关联挂车：'
                            //value={this.state.queryCar.routeStart}
                            showList={RouterDirection.selectDriverCompany(this.props.parent)}
                            onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='主驾司机：'
                            //value={this.state.queryCar.routeStart}
                            showList={RouterDirection.selectDriverCompany(this.props.parent)}
                            onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                            defaultValue={'请选择'}
                        />
                        <TextBox
                            title='副驾司机：'
                            //value={this.state.queryCar.vinCode}
                            defaultValue={''}
                            /*verifications={[{
                                type: 'isLength',
                                arguments: [0, 17],
                                message: '长度不能超过17位'
                            }]}*/
                            onValueChange={(param) => this.onSelect({ vinCode: param })}
                            placeholder='请输入副驾司机'
                        />
                        <DateTimePicker
                            // value={this.state.queryCar.enterEnd}
                            title='到期时间：'
                            defaultValue={'请选择'}
                            onValueChange={(param) => this.onSelect({ enterEnd: param })}
                        />
                        <DateTimePicker
                            // value={this.state.queryCar.enterEnd}
                            title='检证时间：'
                            defaultValue={'请选择'}
                            onValueChange={(param) => this.onSelect({ enterEnd: param })}
                        />
                        <RichTextBox
                            // isRequire={false}
                            title='备注：'
                            //verifications={[{
                            //     type: 'isLength',
                            //      arguments: [0, 300],
                            //      message: '长度0-300位'
                            //  }]}
                            // value={remark}
                            defaultValue={'请填写'}
                            onValueChange={(param) => this.props.changeAddCarField({ remark: param })}
                            // onRequire={(flag) => { this.setState({ remarkRequire: flag }) }}
                            showRichText={RouterDirection.richText(this.props.parent)}
                        />
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Button full onPress={Actions.addTruckSecond} style={{ backgroundColor: '#00cade' }}>
                                <Text style={{ color: '#fff' }}>下一步</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}