import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    FlatList
} from 'react-native'
import { Button } from 'native-base'
import TextBox from '../components/form/TextBox'
import RecordListItem from '../components/recordListItem/DriveInfo'
import Select from '../components/form/Select'
import DateTimePicker from '../components/form/DateTimePicker'
import CheckBox from '../components/form/CheckBox'
import RichTextBox from '../components/form/RichTextBox'
import FontTag from '../components/tag/FontTag'
import Camera from '../components/camera/Camera'
import PanelSingleItem from '../components/camera/PanelSingleItem'
import PanelCustomItem from '../components/camera/PanelCustomItem'
import * as RouterDirection from '../../util/RouterDirection'

export default class DriverInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 1
        }
        this.onPressSegment = this.onPressSegment.bind(this)
        this.renderDriverInfoEnable = this.renderDriverInfoEnable.bind(this)
        this.renderDriverInfoDisable = this.renderDriverInfoDisable.bind(this)
        this.renderDriverPhoto = this.renderDriverPhoto.bind(this)
        this.renderDriverRecord = this.renderDriverRecord.bind(this)
        this.onSelect = this.onSelect.bind(this)
    }

    onPressSegment(index) {
        if (this.state.active != index)
            this.setState({ active: index })
    }

    onSelect(param) {
        console.log(param)
    }

    renderDriverInfoEnable() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#ddd' }}>
                        <View style={{ flex: 6 }}>
                            <TextBox
                                title='姓名：'
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
                                placeholder='请输入姓名'
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}><FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' /></View>
                    </View>
                    <Select
                        title='所属公司：'
                        //value={this.state.queryCar.routeStart}
                        showList={RouterDirection.selectDriverCompany(this.props.parent)}
                        onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                        defaultValue={'请选择'}
                    />

                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联货车：辽B12345</Text></View>
                        <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                            <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                        </View>
                    </View>
                    <CheckBox listTitle='选择性别' itemList={[{ id: 0, value: '男' }, { id: 1, value: '女' }]} onCheck={(item) => { console.log(item) }} />
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#ddd' }}>
                        <View style={{ flex: 6 }}>
                            <Select
                                title='驾证类别：'
                                //value={this.state.queryCar.routeStart}
                                containerSytle={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 10
                                }}
                                showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                                defaultValue={'请选择'}
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <FontTag size={16} title='检' color='#f87775' fontColor='#fff' />
                        </View>
                    </View>
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


    renderDriverInfoDisable() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#ddd' }}>
                        <View style={{ flex: 5 }}>
                            <TextBox
                                title='姓名：'
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
                                placeholder='请输入姓名'
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}><Text style={{ color: '#ccc', fontSize: 10 }}>已停用</Text></View>
                        <View style={{ flex: 1, justifyContent: 'center' }}><FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' /></View>
                    </View>
                    <Select
                        title='所属公司：'
                        //value={this.state.queryCar.routeStart}
                        showList={RouterDirection.selectDriverCompany(this.props.parent)}
                        onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                        defaultValue={'请选择'}
                    />
                    <CheckBox listTitle='选择性别' itemList={[{ id: 0, value: '男' }, { id: 1, value: '女' }]} onCheck={(item) => { console.log(item) }} />
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#ddd' }}>
                        <View style={{ flex: 6 }}>
                            <Select
                                title='驾证类别：'
                                //value={this.state.queryCar.routeStart}
                                containerSytle={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 10
                                }}
                                showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                                defaultValue={'请选择'}
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <FontTag size={16} title='检' color='#f87775' fontColor='#fff' />
                        </View>
                    </View>
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

    renderDriverPhoto() {
        return (
            <FlatList showsVerticalScrollIndicator={false}
                data={[<View style={{ flexDirection: 'row' }}>
                    <PanelSingleItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                    <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                </View>, <View style={{ flexDirection: 'row' }}>
                    <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                    <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                </View>, <View style={{ flexDirection: 'row' }}>
                    <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                    <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                </View>,
                <View style={{ flexDirection: 'row' }}>
                    <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                    <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
                </View>,
                <View style={{ flexDirection: 'row' }}>
                    <Camera containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                </View>]}
                renderItem={({ item }) => item}
            />
        )
    }

    renderDriverRecord() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }, { key: 'e' }, { key: 'f' }, { key: 'g' }, { key: 'h' }, { key: 'i' }, { key: 'j' },
                { key: 'k' }, { key: 'l' }, { key: 'm' }, { key: 'n' }, { key: 'o' }, { key: 'p' }, { key: 'q' }, { key: 'r' }, { key: 's' }, { key: 't' }, { key: 'u' },
                { key: 'v' }, { key: 'w' }, { key: 'x' }, { key: 'y' }, { key: 'z' }]}
                renderItem={({ item }) => <View style={{ borderColor: '#ddd', borderBottomWidth: 0.5, paddingHorizontal: 10 }}><RecordListItem /></View>}
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', borderWidth: 1, borderColor: '#00cade' }}>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 0 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(0)}>
                        <Text style={{ color: this.state.active == 0 ? '#fff' : '#00cade' }}>基本信息</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 1 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(1)}>
                        <Text style={{ color: this.state.active == 1 ? '#fff' : '#00cade' }}>照片</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, justifyContent: 'center', backgroundColor: this.state.active == 2 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(2)}>
                        <Text style={{ color: this.state.active == 2 ? '#fff' : '#00cade' }}>记录</Text>
                    </Button>
                </View>
                <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#00cade', flex: 1 }}>
                    {this.state.active == 0 && this.renderDriverInfoDisable()}
                    {this.state.active == 1 && this.renderDriverPhoto()}
                    {this.state.active == 2 && this.renderDriverRecord()}
                </View>
            </View>
        )
    }
}