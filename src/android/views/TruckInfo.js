import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    ScrollView
} from 'react-native'

import { Button } from 'native-base'
import TextBox from '../components/form/TextBox'
import Select from '../components/form/Select'
import DateTimePicker from '../components/form/DateTimePicker'
import CheckBox from '../components/form/CheckBox'
import RichTextBox from '../components/form/RichTextBox'
import FontTag from '../components/tag/FontTag'
import Camera from '../components/camera/Camera'
import PanelSingleItem from '../components/camera/PanelSingleItem'
import PanelCustomItem from '../components/camera/PanelCustomItem'
import * as RouterDirection from '../../util/RouterDirection'

export default class TruckInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0
        }
        this.renderTractorInfoEnable = this.renderTractorInfoEnable.bind(this)
        this.renderTractorInfoDisable = this.renderTractorInfoDisable.bind(this)
        this.renderTrailerInfoEnable = this.renderTrailerInfoEnable.bind(this)
        this.renderTrailerInfoDisable = this.renderTrailerInfoDisable.bind(this)
        this.renderTruckPhoto = this.renderTruckPhoto.bind(this)
        this.renderTruckRecord = this.renderTruckRecord.bind(this)
        this.onPressSegment = this.onPressSegment.bind(this)
        this.onSelect = this.onSelect.bind(this)
    }

    onPressSegment(index) {
        if (this.state.active != index)
            this.setState({ active: index })
    }

    onSelect(param) {
        console.log(param)
    }

    renderTractorInfoEnable() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#ddd' }}>
                        <View style={{ flex: 6 }}>
                            <TextBox
                                title='车牌号：'
                                containerSytle={{
                                    paddingVertical: 5,
                                    paddingHorizontal: 10
                                }}
                                //value={this.state.queryCar.vinCode}
                                defaultValue={''}
                                /*verifications={[{
                                    type: 'isLength',
                                    arguments: [0, 17],
                                    message: '长度不能超过17位'
                                }]}*/
                                onValueChange={(param) => this.onSelect({ vinCode: param })}
                                placeholder='请输入车牌号'
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}><FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' /></View>
                    </View>
                    <Select
                        title='品牌：'
                        //value={this.state.queryCar.routeStart}
                        showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
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
                        title='所属公司：'
                        //value={this.state.queryCar.routeStart}
                        showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                        onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                        defaultValue={'请选择'}
                    />
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联挂车：辽B12345</Text></View>
                        <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                            <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联司机：张宝全</Text></View>
                        <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                            <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                        </View>
                    </View>
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
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>车辆状态：正常</Text></View>
                        <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                            <Text style={{ fontSize: 10, color: '#fff' }}>维修</Text>
                        </View>
                    </View>
                    <DateTimePicker
                        // value={this.state.queryCar.enterEnd}
                        title='行驶证检证日期：'
                        defaultValue={'请选择'}
                        onValueChange={(param) => this.onSelect({ enterEnd: param })}
                    />
                    <DateTimePicker
                        // value={this.state.queryCar.enterEnd}
                        title='营运证检证日期：'
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
                        <Button full onPress={() => { }} style={{ backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>保存信息</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        )
    }

    renderTractorInfoDisable() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#ddd' }}>
                        <View style={{ flex: 5 }}>
                            <TextBox
                                title='车牌号：'
                                containerSytle={{
                                    paddingVertical: 5,
                                    paddingHorizontal: 10
                                }}
                                //value={this.state.queryCar.vinCode}
                                defaultValue={''}
                                /*verifications={[{
                                    type: 'isLength',
                                    arguments: [0, 17],
                                    message: '长度不能超过17位'
                                }]}*/
                                onValueChange={(param) => this.onSelect({ vinCode: param })}
                                placeholder='请输入车牌号'
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}><Text style={{ color: '#ccc', fontSize: 10 }}>已停用</Text></View>
                        <View style={{ flex: 1, justifyContent: 'center' }}><FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' /></View>
                    </View>
                    <Select
                        title='品牌：'
                        //value={this.state.queryCar.routeStart}
                        showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
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
                        title='所属公司：'
                        //value={this.state.queryCar.routeStart}
                        showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                        onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                        defaultValue={'请选择'}
                    />
                    <DateTimePicker
                        // value={this.state.queryCar.enterEnd}
                        title='行驶证检证日期：'
                        defaultValue={'请选择'}
                        onValueChange={(param) => this.onSelect({ enterEnd: param })}
                    />
                    <DateTimePicker
                        // value={this.state.queryCar.enterEnd}
                        title='营运证检证日期：'
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
                        <Button full onPress={() => { }} style={{ backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>保存信息</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        )
    }

    renderTrailerInfoEnable() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#ddd' }}>
                        <View style={{ flex: 6 }}>
                            <TextBox
                                title='车牌号：'
                                containerSytle={{
                                    paddingVertical: 5,
                                    paddingHorizontal: 10
                                }}
                                //value={this.state.queryCar.vinCode}
                                defaultValue={''}
                                /*verifications={[{
                                    type: 'isLength',
                                    arguments: [0, 17],
                                    message: '长度不能超过17位'
                                }]}*/
                                onValueChange={(param) => this.onSelect({ vinCode: param })}
                                placeholder='请输入车牌号'
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}><FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' /></View>
                    </View>
                    <TextBox
                        title='挂车货位：'
                        //value={this.state.queryCar.vinCode}
                        defaultValue={''}
                        /*verifications={[{
                            type: 'isLength',
                            arguments: [0, 17],
                            message: '长度不能超过17位'
                        }]}*/
                        onValueChange={(param) => this.onSelect({ vinCode: param })}
                        placeholder='请输入挂车货位'
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
                        title='所属公司：'
                        //value={this.state.queryCar.routeStart}
                        showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                        onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                        defaultValue={'请选择'}
                    />
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联车头：辽B12345</Text></View>
                        <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                            <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>车辆状态：维修</Text></View>
                        <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                            <Text style={{ fontSize: 10, color: '#fff' }}>已修</Text>
                        </View>
                    </View>
                    <DateTimePicker
                        // value={this.state.queryCar.enterEnd}
                        title='行驶证检证日期：'
                        defaultValue={'请选择'}
                        onValueChange={(param) => this.onSelect({ enterEnd: param })}
                    />
                    <DateTimePicker
                        // value={this.state.queryCar.enterEnd}
                        title='营运证检证日期：'
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
                        <Button full onPress={() => { }} style={{ backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>保存信息</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        )
    }

    renderTrailerInfoDisable() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text>renderTrailerInfoDisable</Text>
                </View>
            </ScrollView>
        )
    }

    renderTruckPhoto() {
        return (
            <View>
                <Text>renderTruckPhoto</Text>
            </View>
        )
    }

    renderTruckRecord() {
        return (
            <View>
                <Text>renderTruckRecord</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', borderWidth: 1, borderColor: '#00cade' }}>
                    <Button small style={{ flex: 2, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 0 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(0)}>
                        <Text style={{ color: this.state.active == 0 ? '#fff' : '#00cade' }}>基本信息</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 1 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(1)}>
                        <Text style={{ color: this.state.active == 1 ? '#fff' : '#00cade' }}>照片</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 2 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(2)}>
                        <Text style={{ color: this.state.active == 2 ? '#fff' : '#00cade' }}>车保</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, justifyContent: 'center', backgroundColor: this.state.active == 3 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(3)}>
                        <Text style={{ color: this.state.active == 3 ? '#fff' : '#00cade' }}>记录</Text>
                    </Button>
                </View>
                <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#00cade', flex: 1 }}>
                    {this.state.active == 0 && this.renderTrailerInfoDisable()}
                    {this.state.active == 1 && this.renderTruckPhoto()}
                    {this.state.active == 3 && this.renderTruckRecord()}
                </View>
            </View>
        )
    }
}