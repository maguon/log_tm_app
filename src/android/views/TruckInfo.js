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
import {
    getTruckInfo,
    getTruckRecord,
    getTruckInsureRel,
    updateTruckInfo,
    resetGetTruckInfo,
    resetGetTruckInsureRel,
    resetGetTruckRecord,
    resetChangeTruckFirstStatus,
    changeTruckFirstStatus,
    changeTruckTrailerStatus,
    resetChangeTruckTrailerStatus
} from '../../actions/TruckInfoAction'
import { Actions } from 'react-native-router-flux'

class TruckInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            truckType: 0,
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
        this.onChangeTruckStatus = this.onChangeTruckStatus.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const { truckInfo, truckInsureRel, truckRecord,changeTruckFirstStatus,changeTruckTrailerStatus } = nextProps.truckInfoReducer
        /*truckInfo*/
        if (truckInfo.isExecStatus == 2) {
            if (truckInfo.isResultStatus == 0) {
                console.log('truckInfo', '执行成功')
                Actions.refresh({
                    rightType: 1,
                    truckStatus: nextProps.truckInfoReducer.data.truckInfo.truck_status,
                    onPressRight: () => this.onChangeTruckStatus({
                        truckType: nextProps.truckInfoReducer.data.truckInfo.truck_type,
                        userId: nextProps.userReducer.data.user.userId,
                        truckId: nextProps.truckInfoReducer.data.truckInfo.id,
                        truckStatus: nextProps.truckInfoReducer.data.truckInfo.truck_status
                    })
                })
                this.props.resetGetTruckInfo()
            }
            else if (truckInfo.isResultStatus == 1) {
                console.log('truckInfo', '异常')
                this.props.resetGetTruckInfo()
            }
            else if (truckInfo.isResultStatus == 2) {
                console.log('truckInfo', '执行失败')
                this.props.resetGetTruckInfo()
            }
            else if (truckInfo.isResultStatus == 3) {
                console.log('truckInfo', '服务器异常')
                this.props.resetGetTruckInfo()
            }
        }
        /************************************ */


        /*truckInsureRel*/
        if (truckInsureRel.isExecStatus == 2) {
            if (truckInsureRel.isResultStatus == 0) {
                console.log('truckInsureRel', '执行成功')
                this.props.resetGetTruckInsureRel()
            }
            else if (truckInsureRel.isResultStatus == 1) {
                console.log('truckInsureRel', '异常')
                this.props.resetGetTruckInsureRel()
            }
            else if (truckInsureRel.isResultStatus == 2) {
                console.log('truckInsureRel', '执行失败')
                this.props.resetGetTruckInsureRel()
            }
            else if (truckInsureRel.isResultStatus == 3) {
                console.log('truckInsureRel', '服务器异常')
                this.props.resetGetTruckInsureRel()
            }
        }
        /************************************ */


        /*truckRecord*/
        if (truckRecord.isExecStatus == 2) {
            if (truckRecord.isResultStatus == 0) {
                console.log('truckRecord', '执行成功')
                this.props.resetGetTruckRecord()
            }
            else if (truckRecord.isResultStatus == 1) {
                console.log('truckRecord异常', truckRecord.errorMsg)
                this.props.resetGetTruckRecord()
            }
            else if (truckRecord.isResultStatus == 2) {
                console.log('truckRecord', '执行失败')
                this.props.resetGetTruckRecord()
            }
            else if (truckRecord.isResultStatus == 3) {
                console.log('truckRecord', '服务器异常')
                this.props.resetGetTruckRecord()
            }
        }
        /************************************ */


        /*changeTruckFirstStatus*/
        
        if (changeTruckFirstStatus.isExecStatus == 2) {
            if (changeTruckFirstStatus.isResultStatus == 0) {
                this.props.getTruckInfo({ OptionalParam: { truckId: this.props.initParam.truckId } })
                console.log('changeTruckFirstStatus', '执行成功')
                this.props.resetChangeTruckFirstStatus()
            }
            else if (changeTruckFirstStatus.isResultStatus == 1) {
                console.log('changeTruckFirstStatus异常', changeTruckFirstStatus.errorMsg)
                this.props.resetChangeTruckFirstStatus()    
            }
            else if (changeTruckFirstStatus.isResultStatus == 2) {
                console.log('changeTruckFirstStatus', '执行失败')
                this.props.resetChangeTruckFirstStatus()   
            }
            else if (changeTruckFirstStatus.isResultStatus == 3) {
                console.log('changeTruckFirstStatus', '服务器异常')
                this.props.resetChangeTruckFirstStatus()    
            }
        }
        /************************************ */


        /*changeTruckTrailerStatus*/
        if (changeTruckTrailerStatus.isExecStatus == 2) {
            if (changeTruckTrailerStatus.isResultStatus == 0) {
                this.props.getTruckInfo({ OptionalParam: { truckId: this.props.initParam.truckId } })
                console.log('changeTruckTrailerStatus', '执行成功')
                this.props.resetChangeTruckTrailerStatus()
            }
            else if (changeTruckTrailerStatus.isResultStatus == 1) {
                console.log('changeTruckTrailerStatus异常', changeTruckTrailerStatus.errorMsg)
                this.props.resetChangeTruckTrailerStatus()        
            }
            else if (changeTruckTrailerStatus.isResultStatus == 2) {
                console.log('changeTruckTrailerStatus', '执行失败')
                this.props.resetChangeTruckTrailerStatus()              
            }
            else if (changeTruckTrailerStatus.isResultStatus == 3) {
                console.log('changeTruckTrailerStatus', '服务器异常')
                this.props.resetChangeTruckTrailerStatus()                
            }
        }
        /************************************ */

    }

    componentDidMount() {
        // console.log(this.props.initParam)
        this.props.getTruckInfo({ OptionalParam: { truckId: this.props.initParam.truckId } })
        this.props.getTruckInsureRel({ OptionalParam: { truckId: this.props.initParam.truckId, active: 1 } })
        this.props.getTruckRecord({ requiredParam: { userId: this.props.userReducer.data.user.userId, truckNum: this.props.initParam.truck_num } })
    }

    onPressSegment(index) {
        if (this.state.truckType != index)
            this.setState({ truckType: index })
    }

    updateTruckInfo() {
        this.props.updateTruckInfo({
            requiredParam: {
                userId: this.props.userReducer.data.user.userId,
                truckId: this.props.initParam.truckId
            },
            putParam: {
                truckNum: "辽B1al12",
                companyId: 40,
                remark: "234234",
                truckType: 2,
                number: 8
            }
        })
    }

    onSelect(param) {

    }

    unBindDriver() {

    }

    bindDriver() {

    }

    onChangeTruckStatus(param) {
        const { truckId, truckType, userId, truckStatus } = param
        // let truckStatus
        // if (param.truckStatus == 0) {
        //     truckStatus = 1
        // } else if (param.truckStatus == 0) {
        //     truckStatus = 0
        // }
        if (truckType == 1) {
            this.props.changeTruckFirstStatus({
                requiredParam: {
                    truckId,
                    truckStatus: truckStatus == 0 ? 1 : 0,
                    userId
                }
            })
        } else if (truckType == 2) {
            this.props.changeTruckTrailerStatus({
                requiredParam: {
                    truckId,
                    truckStatus: truckStatus == 0 ? 1 : 0,
                    userId
                }
            })
        }
        // console.log(param)
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
                                value={this.props.truckInfoReducer.data.truckInfo.truck_num}
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
                        value={this.props.truckInfoReducer.data.truckInfo.brand_name}
                        showList={RouterDirection.selectMake(this.props.parent)}
                        onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                    />
                    <TextBox
                        title='联系电话：'
                        value={this.props.truckInfoReducer.data.truckInfo.truck_tel}
                        onValueChange={(param) => this.onSelect({ vinCode: param })}
                        placeholder='请输入联系电话'
                    />
                    <TextBox
                        title='识别代码：'
                        value={this.props.truckInfoReducer.data.truckInfo.the_code}
                        onValueChange={(param) => this.onSelect({ vinCode: param })}
                        placeholder='请输入识别代码'
                    />
                    <Select
                        title='所属公司：'
                        value={this.props.truckInfoReducer.data.truckInfo.company_name}
                        showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                        onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                    />
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联挂车：{this.props.truckInfoReducer.data.truckInfo.trail_num}</Text></View>
                        <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                            <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联司机：{this.props.truckInfoReducer.data.truckInfo.drive_name}</Text></View>
                        <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                            <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                        </View>
                    </View>
                    <TextBox
                        title='副驾司机：'
                        value={this.props.truckInfoReducer.data.truckInfo.copilot}
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
                        value={this.props.truckInfoReducer.data.truckInfo.driving_date}
                        title='行驶证检证日期：'
                        onValueChange={(param) => this.onSelect({ enterEnd: param })}
                    />
                    <DateTimePicker
                        value={this.props.truckInfoReducer.data.truckInfo.license_date}
                        title='营运证检证日期：'
                        onValueChange={(param) => this.onSelect({ enterEnd: param })}
                    />
                    <RichTextBox
                        title='备注：'
                        //verifications={[{
                        //     type: 'isLength',
                        //      arguments: [0, 300],
                        //      message: '长度0-300位'
                        //  }]}
                        // value={remark}
                        value={this.props.truckInfoReducer.data.truckInfo.remark}
                        onValueChange={(param) => this.props.changeAddCarField({ remark: param })}
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
        // console.log(this.props)
        const { truck_status, truck_type } = this.props.truckInfoReducer.data.truckInfo
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', borderWidth: 1, borderColor: '#00cade' }}>
                    <Button small style={{ flex: 2, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.truckType == 0 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(0)}>
                        <Text style={{ color: this.state.truckType == 0 ? '#fff' : '#00cade' }}>基本信息</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.truckType == 1 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(1)}>
                        <Text style={{ color: this.state.truckType == 1 ? '#fff' : '#00cade' }}>照片</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.truckType == 2 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(2)}>
                        <Text style={{ color: this.state.truckType == 2 ? '#fff' : '#00cade' }}>车保</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, justifyContent: 'center', backgroundColor: this.state.truckType == 3 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(3)}>
                        <Text style={{ color: this.state.truckType == 3 ? '#fff' : '#00cade' }}>记录</Text>
                    </Button>
                </View>
                <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#00cade', flex: 1 }}>
                    {this.state.truckType == 0 && truck_status == 1 && truck_type == 1 && this.renderTractorInfoEnable()}
                    {this.state.truckType == 0 && truck_status == 0 && truck_type == 1 && this.renderTractorInfoDisable()}

                    {this.state.truckType == 0 && truck_status == 1 && truck_type == 2 && this.renderTrailerInfoEnable()}
                    {this.state.truckType == 0 && truck_status == 0 && truck_type == 2 && this.renderTrailerInfoDisable()}

                    {this.state.truckType == 1 && this.renderTruckPhoto()}
                    {this.state.truckType == 3 && this.renderTruckRecord()}
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        truckInfoReducer: state.truckInfoReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTruckInfo: (param) => {
        dispatch(getTruckInfo(param))
    },
    getTruckRecord: (param) => {
        dispatch(getTruckRecord(param))
    },
    getTruckInsureRel: (param) => {
        dispatch(getTruckInsureRel(param))
    },
    resetGetTruckInfo: () => {
        dispatch(resetGetTruckInfo())
    },
    resetGetTruckInsureRel: () => {
        dispatch(resetGetTruckInsureRel())
    },
    resetGetTruckRecord: () => {
        dispatch(resetGetTruckRecord())
    },
    updateTruckInfo: (param) => {
        dispatch(updateTruckInfo(param))
    },
    changeTruckFirstStatus: (param) => {
        dispatch(changeTruckFirstStatus(param))
    },
    changeTruckTrailerStatus: (param) => {
        dispatch(changeTruckTrailerStatus(param))
    },
    resetChangeTruckFirstStatus: () => {
        dispatch(resetChangeTruckFirstStatus())
    },
    resetChangeTruckTrailerStatus: () => {
        dispatch(resetChangeTruckTrailerStatus())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TruckInfo)