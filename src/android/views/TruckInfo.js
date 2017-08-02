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
import RecordListItem from '../components/recordListItem/TruckInfo'
import { connect } from 'react-redux'
import actionTypes from '../../actions/actionTypes'
import { base_host, record_host, file_host } from '../../config/Host'
import { getAction } from '../../actions/Action'
import { ObjectToUrl } from '../../util/ObjectToUrl'

class TruckInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0,
            truckInfo: {
                truck_num: '',      //车牌号
                brand_name: '',     //识别码
                truck_tel: '',      //车辆管理的电话
                company_name: '',   //所属公司名称
                driving_date: '',   //行驶证检证日期
                license_date: '',   //营运证检证日期
                driving_image: '',  //行驶证照片
                license_image: '',  //营运证照片
                remark: ''          //备注
            }
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

    componentWillReceiveProps(nextProps) {
        const { truckInfo, truckInsureRel, truckRecord } = nextProps.truckInfoReducer
        /*truckInfo*/
        if (truckInfo.isExecStatus == 0)
        { console.log('truckInfo', '初始状态') }
        else if (truckInfo.isExecStatus == 1)
        { console.log('truckInfo', '等待执行结果') }
        else if (truckInfo.isExecStatus == 2) {
            console.log('truckInfo', '执行结束')
            if (truckInfo.isResultStatus == 0) {
                console.log('truckInfo', '执行成功')
                //console.log()
            }
            else if (truckInfo.isResultStatus == 1) {
                console.log('truckInfo', '异常')
            }
            else if (truckInfo.isResultStatus == 2) {
                console.log('truckInfo', '执行失败')
            }
            else if (truckInfo.isResultStatus == 3) {
                console.log('truckInfo', '服务器异常')
            }
        }
        /************************************ */


        /*truckInsureRel*/
        if (truckInsureRel.isExecStatus == 0)
        { console.log('truckInsureRel', '初始状态') }
        else if (truckInsureRel.isExecStatus == 1)
        { console.log('truckInsureRel', '等待执行结果') }
        else if (truckInsureRel.isExecStatus == 2) {
            console.log('truckInsureRel', '执行结束')
            if (truckInsureRel.isResultStatus == 0) {
                console.log('truckInsureRel', '执行成功')
            }
            else if (truckInsureRel.isResultStatus == 1) {
                console.log('truckInsureRel', '异常')
            }
            else if (truckInsureRel.isResultStatus == 2) {
                console.log('truckInsureRel', '执行失败')
            }
            else if (truckInsureRel.isResultStatus == 3) {
                console.log('truckInsureRel', '服务器异常')
            }
        }
        /************************************ */


        /*truckRecord*/
        if (truckRecord.isExecStatus == 0)
        { console.log('truckRecord', '初始状态') }
        else if (truckRecord.isExecStatus == 1)
        { console.log('truckRecord', '等待执行结果') }
        else if (truckRecord.isExecStatus == 2) {
            console.log('truckRecord', '执行结束')
            if (truckRecord.isResultStatus == 0) {
                console.log('truckRecord', '执行成功')
            }
            else if (truckRecord.isResultStatus == 1) {
                console.log('truckRecord', '异常')
            }
            else if (truckRecord.isResultStatus == 2) {
                console.log('truckRecord', '执行失败')
            }
            else if (truckRecord.isResultStatus == 3) {
                console.log('truckRecord', '服务器异常')
            }
        }
        /************************************ */
    }

    componentDidMount() {
        this.props.getTruckInfo(`${base_host}/truckFirst?truckId=${this.props.initParam.truckId}`)
        this.props.getTruckInsureRel(`${base_host}/truckInsureRel?truckId=${this.props.initParam.truckId}&active=1`)
        this.props.getTruckRecord(`${record_host}/user/38/truck/${this.props.initParam.truck_num}/record`)
    }

    onPressSegment(index) {
        if (this.state.active != index)
            this.setState({ active: index })
    }

    updateTruckInfo() {
        //this.props.putUpdateTruckInfo(`${base_host}/truckFirst?truckId=${this.props.initParam.truckId}`)
    }

    onSelect(param) {
        // console.log(param)
    }

    unBindDriver() {

    }

    bindDriver() {

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
                                value={this.state.truck_num}
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

    renderTruckPhoto() {
        const { driving_image, license_image } = this.props.truckInfoReducer.data.truckInfo
        console.log(driving_image)
        console.log(license_image)
        return (
            <FlatList showsVerticalScrollIndicator={false}
                data={[<View style={{ flexDirection: 'row' }}>
                    <PanelSingleItem title='行驶证' imageUrl={driving_image} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                    <PanelSingleItem title='营运证' imageUrl={license_image} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
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
                    <Camera title='上传车辆照片' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                </View>]}
                renderItem={({ item }) => item}
            />
        )
    }

    renderTruckRecord() {
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
        console.log(this.props)
        const { truck_status, truck_type } = this.props.truckInfoReducer.data.truckInfo
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
                    {this.state.active == 0 && truck_status == 1 && truck_type == 1 && this.renderTractorInfoEnable()}
                    {this.state.active == 0 && truck_status == 0 && truck_type == 1 && this.renderTractorInfoDisable()}

                    {this.state.active == 0 && truck_status == 1 && truck_type == 2 && this.renderTrailerInfoEnable()}
                    {this.state.active == 0 && truck_status == 0 && truck_type == 2 && this.renderTrailerInfoDisable()}

                    {this.state.active == 1 && this.renderTruckPhoto()}
                    {this.state.active == 3 && this.renderTruckRecord()}
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        truckInfoReducer: state.truckInfoReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTruckInfo: (url) => {
        dispatch(getAction(actionTypes.truckInfoActionTypes.truckInfo, url))
    },
    getTruckRecord: (url) => {
        dispatch(getAction(actionTypes.truckInfoActionTypes.truckRecord, url))
    },
    getTruckInsureRel: (url) => {
        dispatch(getAction(actionTypes.truckInfoActionTypes.truckInsureRel, url))
    },
    putUpdateTruckInfo: (url, param) => {
        dispatch(putAction(actionTypes.truckInfoActionTypes.updateTruckInfo, param, url))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TruckInfo)