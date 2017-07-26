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
                <StepIndicator stepList={[{ step: '1', title: '基本信息' }, { step: '2', title: '上传照片' }]} current={0} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <TextBox
                            title='姓名：'
                            //value={this.state.queryCar.vinCode}
                            defaultValue={''}
                            /*verifications={[{
                                type: 'isLength',
                                arguments: [0, 17],
                                message: '长度不能超过17位'
                            }]}*/
                            onValueChange={(param) => this.onSelect({ vinCode: param })}
                            placeholder='请输入姓名'
                        />
                        <CheckBox listTitle='选择性别' itemList={[{ id: 0, value: '男' }, { id: 1, value: '女' }]} onCheck={(item) => { console.log(item) }} />
                        <Select
                            title='所属公司：'
                            //value={this.state.queryCar.routeStart}
                            showList={RouterDirection.selectDriverCompany(this.props.parent)}
                            onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='关联货车：'
                            //value={this.state.queryCar.routeStart}
                            showList={RouterDirection.selectTractor(this.props.parent)}
                            onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                            defaultValue={'请选择'}
                        />
                        {/*<View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View><Text style={{ fontSize: 12 }}>关联货车：辽B12345</Text></View>
                            <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                            </View>
                        </View>*/}
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
                            //onRequire={(param) => this.setState({ vinRequire: param })}
                            placeholder='请输入联系电话'
                        />
                        <Select
                            title='驾证类别：'
                            //value={this.state.queryCar.routeStart}

                            showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                            onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                            defaultValue={'请选择'}
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
                        <DateTimePicker
                            // value={this.state.queryCar.enterEnd}
                            title='入职时间：'
                            defaultValue={'请选择'}
                            onValueChange={(param) => this.onSelect({ enterEnd: param })}
                        />
                        <TextBox
                            title='身份证：'
                            //value={this.state.queryCar.vinCode}
                            defaultValue={''}
                            /*verifications={[{
                                type: 'isLength',
                                arguments: [0, 17],
                                message: '长度不能超过17位'
                            }]}*/
                            onValueChange={(param) => this.onSelect({ vinCode: param })}
                            //onRequire={(param) => this.setState({ vinRequire: param })}
                            placeholder='请输入身份证'
                        />
                        <TextBox
                            title='家庭住址：'
                            //value={this.state.queryCar.vinCode}
                            defaultValue={''}
                            /*verifications={[{
                                type: 'isLength',
                                arguments: [0, 17],
                                message: '长度不能超过17位'
                            }]}*/
                            onValueChange={(param) => this.onSelect({ vinCode: param })}
                            //onRequire={(param) => this.setState({ vinRequire: param })}
                            placeholder='请输入家庭住址'
                        />
                        <TextBox
                            title='紧急联系人电话：'
                            //value={this.state.queryCar.vinCode}
                            defaultValue={''}
                            /*verifications={[{
                                type: 'isLength',
                                arguments: [0, 17],
                                message: '长度不能超过17位'
                            }]}*/
                            onValueChange={(param) => this.onSelect({ vinCode: param })}
                            //onRequire={(param) => this.setState({ vinRequire: param })}
                            placeholder='请输入紧急联系人电话'
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
                            <Button full onPress={Actions.addDriverSecond} style={{ backgroundColor: '#00cade' }}>
                                <Text style={{ color: '#fff' }}>下一步</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

