import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'
import { Button } from 'native-base'
import TextBox from '../components/form/TextBox'
import Select from '../components/form/Select'
import DateTimePicker from '../components/form/DateTimePicker'
import RichTextBox from '../components/form/RichTextBox'

export default class DriverInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0
        }
        this.onPressSegment = this.onPressSegment.bind(this)
        this.renderDriverInfo = this.renderDriverInfo.bind(this)
        this.renderDriverPhoto = this.renderDriverPhoto.bind(this)
        this.renderDriverRecord = this.renderDriverRecord.bind(this)
        this.onSelect = this.onSelect.bind(this)
    }

    onPressSegment(index) {
        if (this.state.active != index)
            this.setState({ active: index })
    }

    onSelect(param) {

    }

    renderDriverInfo() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: '#fff' }}>
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
                    <Select
                        title='所属公司：'
                        //value={this.state.queryCar.routeStart}
                        //showList={RouterDirection.selectCity(this.props.parent)}
                        onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                        defaultValue={'请选择'}
                    />
                    <Text>关联货车：辽B12345</Text>
                    <Select
                        title='性别：'
                        //value={this.state.queryCar.routeStart}
                        //showList={RouterDirection.selectCity(this.props.parent)}
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
                        //onRequire={(param) => this.setState({ vinRequire: param })}
                        placeholder='请输入姓名'
                    />
                    <DateTimePicker
                        // value={this.state.queryCar.enterEnd}
                        title='入职时间：'
                        defaultValue={'请选择'}
                        onValueChange={(param) => this.onSelect({ enterEnd: param })}
                    />
                    <TextBox
                        title='身份证:'
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
                        title='家庭住址:'
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
                        title='紧急联系人电话:'
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
                        title='驾证类别：'
                        //value={this.state.queryCar.routeStart}
                        //showList={RouterDirection.selectCity(this.props.parent)}
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
                    // showRichText={RouterDirection.richText(this.props.parent)}
                    />
                    <View style={{paddingTop:10}}>
                        <Button full onPress={() => { }} style={{ backgroundColor: '#00cade' }}>
                            <Text style={{color:'#fff'}}>保存信息</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        )
    }

    renderDriverPhoto() {
        return (
            <ScrollView>
                <Text>renderDriverPhoto</Text>
            </ScrollView>
        )
    }

    renderDriverRecord() {
        return (
            <ScrollView>
                <Text>renderDriverRecord</Text>
            </ScrollView>
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
                <View style={{ paddingHorizontal: 10, paddingBottom: 10, backgroundColor: '#eff3f6', borderTopWidth: 1, borderColor: '#00cade', flex: 1 }}>
                    {this.state.active == 0 && this.renderDriverInfo()}
                    {this.state.active == 1 && this.renderDriverPhoto()}
                    {this.state.active == 2 && this.renderDriverRecord()}
                </View>
            </View>
        )
    }
}