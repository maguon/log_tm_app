import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    ScrollView,
    TouchableNativeFeedback
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
    resetChangeTruckTrailerStatus,
    bindTruck,
    unBindTruck,
    bindDriver,
    unBindDriver,
    resetBindTruck,
    resetUnBindTruck,
    resetBindDriver,
    resetUnBindDriver,
    updateTruckRepairRel,
    resetUpdateTruckRepairRel,
    createTruckRepairRel,
    resetCreateTruckRepairRel,
    getTruckRepairRelList,
    resetGetTruckRepairRelList,
    updateDrivingImage,
    updateLicenseImage,
    createTruckImage,
    delTruckImage,
    resetUpdateDrivingImage,
    resetUpdateLicenseImage,
    resetCreateTruckImage,
    resetDelTruckImage
} from '../../actions/TruckInfoAction'
import { Actions } from 'react-native-router-flux'
import insuranceTypeList from '../../config/insuranceType.json'

class TruckInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            truckType: 1,
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
        this.renderRepair=this.renderRepair.bind(this)
        this.onPressSegment = this.onPressSegment.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onChangeTruckStatus = this.onChangeTruckStatus.bind(this)
        this.renderInsuranceList = this.renderInsuranceList.bind(this)
        this.unBindDriver = this.unBindDriver.bind(this)
        this.bindDriver = this.bindDriver.bind(this)
        this.bindTrail = this.bindTrail.bind(this)
        this.unBindTrail = this.unBindTrail.bind(this)
        this.OnRepairSave=this.OnRepairSave.bind(this)
        this.onRepairUpdate = this.onRepairUpdate.bind(this)
        this.onAddInsurance = this.onAddInsurance.bind(this)
        this.updateDrivingImage = this.updateDrivingImage.bind(this)
        this.updateLicenseImage = this.updateLicenseImage.bind(this)
        this.createTruckImage = this.createTruckImage.bind(this)
        this.delTruckImage = this.delTruckImage.bind(this)

    }

    componentWillReceiveProps(nextProps) {
        const { truckInfo,
            truckInsureRel,
            truckRecord,
            changeTruckFirstStatus,
            changeTruckTrailerStatus,
            bindTrail,
            unBindTrail,
            bindDriver,
            unBindDriver,
            truckRepairRelList,
            createTruckRepairRel,
            updateTruckRepairRel } = nextProps.truckInfoReducer
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

        /*truckRepairRelList*/
        if (truckRepairRelList.isExecStatus == 2) {
            if (truckRepairRelList.isResultStatus == 0) {
                console.log('truckRepairRelList', '执行成功')
                this.props.resetGetTruckRepairRelList()
            }
            else if (truckRepairRelList.isResultStatus == 1) {
                console.log('truckRepairRelList异常', truckRepairRelList.errorMsg)
                this.props.resetGetTruckRepairRelList()
            }
            else if (truckRepairRelList.isResultStatus == 2) {
                console.log('truckRepairRelList', '执行失败')
                this.props.resetGetTruckRepairRelList()
            }
            else if (truckRepairRelList.isResultStatus == 3) {
                console.log('truckRepairRelList', '服务器异常')
                this.props.resetGetTruckRepairRelList()
            }
        }
        /************************************ */

        /*createTruckRepairRel*/
        if (createTruckRepairRel.isExecStatus == 2) {
            if (createTruckRepairRel.isResultStatus == 0) {
                this.props.getTruckRepairRelList({ OptionalParam: {  truckId: this.props.initParam.truckId } })
                console.log('createTruckRepairRel执行成功')
                this.props.resetCreateTruckRepairRel()
            }
            else if (createTruckRepairRel.isResultStatus == 1) {
                console.log('createTruckRepairRel异常', createTruckRepairRel.errorMsg)
                this.props.resetCreateTruckRepairRel()
            }
            else if (createTruckRepairRel.isResultStatus == 2) {
                console.log('createTruckRepairRel执行失败', createTruckRepairRel.failedMsg)
                this.props.resetCreateTruckRepairRel()
            }
            else if (createTruckRepairRel.isResultStatus == 3) {
                console.log('createTruckRepairRel服务器异常')
                this.props.resetCreateTruckRepairRel()
            }
        }
        /************************************ */

        /*updateTruckRepairRel*/
        if (updateTruckRepairRel.isExecStatus == 2) {
            if (updateTruckRepairRel.isResultStatus == 0) {
                this.props.getTruckRepairRelList({ OptionalParam: {  truckId: this.props.initParam.truckId } })
                console.log('updateTruckRepairRel', '执行成功')
                this.props.resetUpdateTruckRepairRel()
            }
            else if (updateTruckRepairRel.isResultStatus == 1) {
                console.log('updateTruckRepairRel异常', updateTruckRepairRel.errorMsg)
                this.props.resetUpdateTruckRepairRel()
            }
            else if (updateTruckRepairRel.isResultStatus == 2) {
                console.log('updateTruckRepairRel', '执行失败')
                this.props.resetUpdateTruckRepairRel()
            }
            else if (updateTruckRepairRel.isResultStatus == 3) {
                console.log('updateTruckRepairRel', '服务器异常')
                this.props.resetUpdateTruckRepairRel()
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

        /*bindTrail*/
        if (bindTrail.isExecStatus == 2) {
            if (bindTrail.isResultStatus == 0) {
                this.props.getTruckInfo({ OptionalParam: { truckId: this.props.initParam.truckId } })
                console.log('bindTrail执行成功')
                this.props.resetBindTruck()
            }
            else if (bindTrail.isResultStatus == 1) {
                console.log('bindTrail异常', bindTrail.errorMsg)
                this.props.resetBindTruck()
            }
            else if (bindTrail.isResultStatus == 2) {
                console.log('bindTrail执行失败',bindTrail.failedMsg)
                this.props.resetBindTruck()
            }
            else if (bindTrail.isResultStatus == 3) {
                console.log('bindTrail', '服务器异常')
                this.props.resetBindTruck()
            }
        }
        /************************************ */

        /*unBindTrail*/
        if (unBindTrail.isExecStatus == 2) {
            if (unBindTrail.isResultStatus == 0) {
                this.props.getTruckInfo({ OptionalParam: { truckId: this.props.initParam.truckId } })
                console.log('unBindTrail', '执行成功')
                this.props.resetUnBindTruck()
            }
            else if (unBindTrail.isResultStatus == 1) {
                console.log('unBindTrail异常', unBindTrail.errorMsg)
                this.props.resetUnBindTruck()
            }
            else if (unBindTrail.isResultStatus == 2) {
                console.log('unBindTrail', '执行失败')
                this.props.resetUnBindTruck()
            }
            else if (unBindTrail.isResultStatus == 3) {
                console.log('unBindTrail', '服务器异常')
                this.props.resetUnBindTruck()
            }
        }
        /************************************ */

        /*bindDriver*/
        if (bindDriver.isExecStatus == 2) {
            if (bindDriver.isResultStatus == 0) {
                this.props.getTruckInfo({ OptionalParam: { truckId: this.props.initParam.truckId } })
                console.log('bindDriver', '执行成功')
                this.props.resetBindDriver()
            }
            else if (bindDriver.isResultStatus == 1) {
                console.log('bindDriver异常', unBindTrail.errorMsg)
                this.props.resetBindDriver()
            }
            else if (bindDriver.isResultStatus == 2) {
                console.log('bindDriver', '执行失败')
                this.props.resetBindDriver()
            }
            else if (bindDriver.isResultStatus == 3) {
                console.log('bindDriver', '服务器异常')
               this.props.resetBindDriver()
            }
        }
        /************************************ */

        /*bindDriver*/
        if (unBindDriver.isExecStatus == 2) {
            if (unBindDriver.isResultStatus == 0) {
                this.props.getTruckInfo({ OptionalParam: { truckId: this.props.initParam.truckId } })
                console.log('unBindDriver', '执行成功')
                this.props.resetUnBindDriver()
            }
            else if (unBindDriver.isResultStatus == 1) {
                console.log('unBindDriver异常', unBindTrail.errorMsg)
                this.props.resetUnBindDriver()
            }
            else if (unBindDriver.isResultStatus == 2) {
                console.log('unBindDriver', '执行失败')
                this.props.resetUnBindDriver()
            }
            else if (unBindDriver.isResultStatus == 3) {
                console.log('unBindDriver', '服务器异常')
                this.props.resetUnBindDriver()
            }
        }
        /************************************ */

        /*updateDrivingImage*/
        if (updateDrivingImage.isExecStatus == 2) {
            if (updateDrivingImage.isResultStatus == 0) {
                console.log('updateDrivingImage', '执行成功') 
            }
            else if (updateDrivingImage.isResultStatus == 1) {
                console.log('updateDrivingImage异常', updateDrivingImage.errorMsg)  
            }
            else if (updateDrivingImage.isResultStatus == 2) {
                console.log('updateDrivingImage', '执行失败')   
            }
            else if (updateDrivingImage.isResultStatus == 3) {
                console.log('updateDrivingImage', '服务器异常')  
            }
        }
        /************************************ */

        /*updateLicenseImage*/
        if (updateLicenseImage.isExecStatus == 2) {
            if (updateLicenseImage.isResultStatus == 0) {
                console.log('updateLicenseImage', '执行成功')
            }
            else if (updateLicenseImage.isResultStatus == 1) {
                console.log('updateLicenseImage异常', updateLicenseImage.errorMsg)
            }
            else if (updateLicenseImage.isResultStatus == 2) {
                console.log('updateLicenseImage', '执行失败')
            }
            else if (updateLicenseImage.isResultStatus == 3) {
                console.log('updateLicenseImage', '服务器异常')
            }
        }
        /************************************ */

        /*createTruckImage*/
        if (createTruckImage.isExecStatus == 2) {
            if (createTruckImage.isResultStatus == 0) {
                console.log('createTruckImage', '执行成功')
            }
            else if (createTruckImage.isResultStatus == 1) {
                console.log('createTruckImage异常', createTruckImage.errorMsg)
            }
            else if (createTruckImage.isResultStatus == 2) {
                console.log('createTruckImage', '执行失败')
            }
            else if (createTruckImage.isResultStatus == 3) {
                console.log('createTruckImage', '服务器异常')
            }
        }
        /************************************ */

        /*delTruckImage*/
        if (delTruckImage.isExecStatus == 2) {
            if (delTruckImage.isResultStatus == 0) {
                console.log('delTruckImage', '执行成功')
            }
            else if (delTruckImage.isResultStatus == 1) {
                console.log('delTruckImage', delTruckImage.errorMsg)
            }
            else if (delTruckImage.isResultStatus == 2) {
                console.log('delTruckImage', '执行失败')
            }
            else if (delTruckImage.isResultStatus == 3) {
                console.log('delTruckImage', '服务器异常')
            }
        }
        /************************************ */

    }

    componentDidMount() {

        this.props.getTruckInfo({ OptionalParam: { truckId: this.props.initParam.truckId } })
        this.props.getTruckInsureRel({ OptionalParam: { truckId: this.props.initParam.truckId, active: 1 } })
        this.props.getTruckRecord({ requiredParam: { userId: this.props.userReducer.data.user.userId, truckNum: this.props.initParam.truck_num } })
        this.props.getTruckRepairRelList({ OptionalParam: {  truckId: this.props.initParam.truckId } })
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
        this.props.unBindDriver({
            requiredParam: {
                userId: this.props.userReducer.data.user.userId,
                truckId: this.props.truckInfoReducer.data.truckInfo.id,
                driverId: this.props.truckInfoReducer.data.truckInfo.drive_id,
            }
        })
    }

    bindDriver(param) {
        //console.log(param)
        this.props.bindDriver({
            requiredParam: {
                userId: this.props.userReducer.data.user.userId,
                truckId: this.props.truckInfoReducer.data.truckInfo.id,
                driverId: param.id,
            }
        })
    }

    bindTrail(param) {
        if (this.props.truckInfoReducer.data.truckInfo.truck_type == 1) {
            this.props.bindTruck({
                requiredParam: {
                    userId: this.props.userReducer.data.user.userId,
                    truckId: this.props.truckInfoReducer.data.truckInfo.id,
                    trailId: param.id,
                }
            })
        } else if (this.props.truckInfoReducer.data.truckInfo.truck_type == 2) {
            this.props.bindTruck({
                requiredParam: {
                    userId: this.props.userReducer.data.user.userId,
                    truckId: param.id,
                    trailId: this.props.truckInfoReducer.data.truckInfo.id,
                }
            })
        }
    }

    unBindTrail() {
        if (this.props.truckInfoReducer.data.truckInfo.truck_type == 1) {
            this.props.unBindTruck({
                requiredParam: {
                    userId: this.props.userReducer.data.user.userId,
                    truckId: this.props.truckInfoReducer.data.truckInfo.id,
                    trailId: this.props.truckInfoReducer.data.truckInfo.trail_id,
                }
            })
        } else if (this.props.truckInfoReducer.data.truckInfo.truck_type == 2) {
            this.props.unBindTruck({
                requiredParam: {
                    userId: this.props.userReducer.data.user.userId,
                    truckId: this.props.truckInfoReducer.data.truckInfo.first_id,
                    trailId: this.props.truckInfoReducer.data.truckInfo.id,
                }
            })
        }
    }

    onChangeTruckStatus(param) {
        const { truckId, truckType, userId, truckStatus } = param
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
    }

    renderTractorInfoEnable() {
        console.log(this.props.truckInfoReducer)
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
                        <View><Text style={{ fontSize: 12 }}>关联挂车：{this.props.truckInfoReducer.data.truckInfo.trail_num ? this.props.truckInfoReducer.data.truckInfo.trail_num : '您还没有关联挂车'}</Text></View>
                        {!this.props.truckInfoReducer.data.truckInfo.trail_id ? <TouchableNativeFeedback onPress={()=>RouterDirection.selectTruck(this.props.parent)({initParam:{type:2},onSelect:(param)=>this.bindTrail(param)})} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>绑定</Text>
                            </View>
                        </TouchableNativeFeedback> : <TouchableNativeFeedback onPress={this.unBindTrail} background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                    <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                                </View>
                            </TouchableNativeFeedback>}
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联司机：{this.props.truckInfoReducer.data.truckInfo.drive_name ? this.props.truckInfoReducer.data.truckInfo.drive_name : '您还没有关联司机'}</Text></View>
                        {!this.props.truckInfoReducer.data.truckInfo.drive_id ? <TouchableNativeFeedback onPress={()=>RouterDirection.selectDriver(this.props.parent)({initParam:{type:2},onSelect:(param)=>this.bindDriver(param)})} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>绑定</Text>
                            </View>
                        </TouchableNativeFeedback> : <TouchableNativeFeedback onPress={this.unBindDriver} background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={{ backgroundColor: '#00cade', height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                    <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                                </View>
                            </TouchableNativeFeedback>}
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


    updateDrivingImage(param){
        console.log(param)
    }

    updateLicenseImage(param){
        console.log(param)
    }

    createTruckImage(param){
        console.log(param)
    }

    delTruckImage(param){
        console.log(param)
    }

    renderTruckPhoto() {
        // [ <View style={{ flexDirection: 'row' }}>
        //             <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
        //             <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
        //         </View>, <View style={{ flexDirection: 'row' }}>
        //             <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
        //             <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
        //         </View>,
        //         <View style={{ flexDirection: 'row' }}>
        //             <PanelCustomItem containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
        //             <PanelCustomItem containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
        //         </View>,
        //         <View style={{ flexDirection: 'row' }}>
        //             <Camera title='上传车辆照片' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} onGetPhoto={(param)=>{console.log(param)}} />
        //         </View>]
        const { driving_image, license_image } = this.props.truckInfoReducer.data.truckInfo
        let { imageList } = this.props.truckInfoReducer.data
        console.log(this.props.truckInfoReducer.data)

        let imageListFoot
        if (imageList.length % 2 == 0) {
            imageListFoot = <View key={'f'} style={{ flexDirection: 'row' }}>
                <Camera onGetPhoto={this.createTruckImage} title='上传车辆照片' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
            </View>
        } else {
            const lastImage = imageList.pop()
            imageListFoot = <View key={'f'} style={{ flexDirection: 'row' }}>
                <PanelCustomItem onShowPhoto={() => this.onShowTruckImage(imageList.length)} imageUrl={lastImage} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                <Camera onGetPhoto={this.createTruckImage} title='上传车辆照片' containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
            </View>
        }

        let imageBody = []
        for (let i = 0; i < imageList.length; i += 2) {
            const viewItem = (<View key={i} style={{ flexDirection: 'row' }}>
                <PanelCustomItem onShowPhoto={() => this.onShowTruckImage(i)} imageUrl={imageList[i]} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                <PanelCustomItem onShowPhoto={() => this.onShowTruckImage(i + 1)} imageUrl={imageList[i + 1]} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
            </View>)
            imageBody.push(viewItem)
        }
        console.log([...imageBody, imageListFoot])
        return (
            <FlatList showsVerticalScrollIndicator={false}
                ListHeaderComponent={<View style={{ flexDirection: 'row' }}>
                    {driving_image
                        ? <PanelSingleItem title='行驶证' imageUrl={driving_image} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        : <Camera title='上传行驶证照片' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} onGetPhoto={this.updateDrivingImage} />}
                    {driving_image
                        ? <PanelSingleItem title='营运证' imageUrl={license_image} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        : <Camera title='上传营运证照片' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} onGetPhoto={this.updateLicenseImage} />}
                </View>}
                data={[...imageBody, imageListFoot]}
                renderItem={({ item }) => item}
            />
        )
    }

    renderTruckRecord() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.truckInfoReducer.data.recordList}
                renderItem={({ item }) => <View style={{ borderColor: '#ddd', borderBottomWidth: 0.5, paddingHorizontal: 10 }}><RecordListItem content={item.content} name={item.name} time={new Date(item.timez).toLocaleString()}/></View>}
            />
        )
    }

    OnRepairSave(param) {
        let p = {
            requiredParam: {
                userId: this.props.userReducer.data.user.userId,
                truckId: this.props.truckInfoReducer.data.truckInfo.id
            },
            postParam:{
                repairReason: param.repairReason
            }
        }
        if (this.props.truckInfoReducer.data.truckInfo.drive_id && this.props.truckInfoReducer.data.truckInfo.drive_name) {
            p.postParam.driveId = this.props.truckInfoReducer.data.truckInfo.drive_id
            p.postParam.driveName = this.props.truckInfoReducer.data.truckInfo.drive_name
        }
        this.props.createTruckRepairRel(p)
    }

    onRepairUpdate(param) {
        let truckRepairing = this.props.truckInfoReducer.data.truckRepairRelList.find((item) => item.repair_status == 0)
        this.props.updateTruckRepairRel({
            requiredParam: {
                userId: this.props.userReducer.data.user.userId,
                relId: truckRepairing.id
            },
            putParam: {
                remark: param.remark,
                repairMoney: param.repairMoney
            }
        })
    }

    renderRepair(){
        let truckRepairing=this.props.truckInfoReducer.data.truckRepairRelList.find((item)=>item.repair_status==0)
       // console.log(truckRepairing)
        return(
            <View style={{flex: 1}}>
                {truckRepairing ? <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#e3e3e3' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12 }}>维修日期：{new Date(truckRepairing.repair_date).toLocaleDateString()}</Text>
                        <Button small style={{ backgroundColor: '#00cade' }} onPress={()=>Actions.updateRepairAtTruckBlock({onRepairUpdate:this.onRepairUpdate})}>
                            <Text style={{ color: '#fff' }}>结束</Text>
                        </Button>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>维修原因</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 12 }}>{truckRepairing.repair_reason}</Text>
                    </View>
                </View> : <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#e3e3e3' }}>
                        <Button small onPress={()=>Actions.addRepairAtTruckBlock({OnRepairSave:this.OnRepairSave})} style={{ backgroundColor: '#f27d80', alignSelf: 'center' }}>
                            <Text style={{ color: '#fff' }}>维修</Text>
                        </Button>
                    </View>}
                <View style={{flex: 1}} >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.truckInfoReducer.data.truckRepairRelList.filter((item)=>item.repair_status==1)}
                    renderItem={({ item }) => <View style={{ paddingVertical: 10, paddingHorizontal: 10, borderBottomWidth: 0.5, borderColor: '#e3e3e3' }}>
                        <Text style={{fontSize:12,fontWeight:'bold'}}>{new Date(item.repair_date).toLocaleDateString()} 至 {new Date(item.end_date).toLocaleDateString()}</Text>
                        <Text numberOfLines={1} style={{fontSize:12,paddingVertical:5}}><Text style={{fontWeight:'bold'}}>维修描述：</Text>{item.repair_reason}</Text>
                        <Text style={{ alignSelf: 'flex-end' ,fontSize:10}}>金额：<Text style={{ color: '#f27d80',fontSize:12 }}>{item.repair_money}</Text>元</Text>
                    </View>}
                />
                </View>
                
            </View>
        )
    }

    onAddInsurance() {
        this.props.getTruckInsureRel({ OptionalParam: { truckId: this.props.initParam.truckId, active: 1 } })
    }
    renderInsuranceList() {
        let insuranceList = this.props.truckInfoReducer.data.truckInsureRelList.map((item, i) => {
            let panelStyle = (i == this.props.truckInfoReducer.data.truckInsureRelList.length - 1) ? { marginVertical: 10 } : { marginTop: 10 }
            return (
                <View key={i} style={{ backgroundColor: '#edf1f4' }}>
                    <View style={{ marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#fff', borderColor: '#e8e8e8', borderWidth: 0.5, ...panelStyle }}>
                        <View style={{ flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8', alignItems: 'flex-end' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#00cade' }}>{insuranceTypeList.find((typeItem)=>typeItem.id==item.insure_type).insuranceType}</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={{ fontSize: 11 }}>编号：{item.insure_num}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 11 }}>保险公司：{item.insure_name}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 11 }}>投保日期：{new Date(item.insure_date).toLocaleDateString()}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontSize: 11 }}>生效期：{new Date(item.start_date).toLocaleDateString()} 到：{new Date(item.end_date).toLocaleDateString()}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 11 }}>¥ <Text style={{ color: 'red' }}>{item.insure_money}</Text>元</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })

        let addInsuranceBtn = (
            <View style={{ paddingVertical: 10, paddingHorizontal: 10, backgroundColor: '#fff' }}>
                <Button
                    small
                    onPress={() => Actions.addInsurance({ initParam: this.props.initParam ,onAddInsurance:this.onAddInsurance})}
                    style={{ backgroundColor: '#00cade', alignSelf: 'flex-end' }}>
                    <Text style={{ color: '#fff', fontSize: 12 }}>增加保单</Text>
                </Button>
            </View>
        )

        return [...insuranceList, addInsuranceBtn]
    }

    render() {
        const { truck_status, truck_type } = this.props.truckInfoReducer.data.truckInfo
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', borderWidth: 1, borderColor: '#00cade' }}>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.truckType == 0 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(0)}>
                        <Text style={{ color: this.state.truckType == 0 ? '#fff' : '#00cade' }}>信息</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.truckType == 1 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(1)}>
                        <Text style={{ color: this.state.truckType == 1 ? '#fff' : '#00cade' }}>照片</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.truckType == 2 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(2)}>
                        <Text style={{ color: this.state.truckType == 2 ? '#fff' : '#00cade' }}>车保</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.truckType == 3 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(3)}>
                        <Text style={{ color: this.state.truckType == 3 ? '#fff' : '#00cade' }}>记录</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, justifyContent: 'center', backgroundColor: this.state.truckType == 4 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(4)}>
                        <Text style={{ color: this.state.truckType == 4 ? '#fff' : '#00cade' }}>维修</Text>
                    </Button>
                </View>
                <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#00cade', flex: 1 }}>
                    {this.state.truckType == 0 && truck_status == 1 && truck_type == 1 && this.renderTractorInfoEnable()}
                    {this.state.truckType == 0 && truck_status == 0 && truck_type == 1 && this.renderTractorInfoDisable()}

                    {this.state.truckType == 0 && truck_status == 1 && truck_type == 2 && this.renderTrailerInfoEnable()}
                    {this.state.truckType == 0 && truck_status == 0 && truck_type == 2 && this.renderTrailerInfoDisable()}

                    {this.state.truckType == 1 && this.renderTruckPhoto()}
                    {this.state.truckType == 2 && <FlatList showsVerticalScrollIndicator={false}
                        data={this.renderInsuranceList()}
                        renderItem={({ item }) => item} />}
                    {this.state.truckType == 3 && this.renderTruckRecord()}
                    {this.state.truckType == 4 && this.renderRepair()}
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
    },
    bindTruck: (param) => {
        dispatch(bindTruck(param))
    },
    unBindTruck: (param) => {
        dispatch(unBindTruck(param))
    },
    bindDriver: (param) => {
        dispatch(bindDriver(param))
    },
    unBindDriver: (param) => {
        dispatch(unBindDriver(param))
    },
    resetBindTruck: () => {
        dispatch(resetBindTruck())
    },
    resetUnBindTruck: () => {
        dispatch(resetUnBindTruck())
    },
    resetBindDriver: () => {
        dispatch(resetBindDriver())
    },
    resetUnBindDriver: () => {
        dispatch(resetUnBindDriver())
    },
    updateTruckRepairRel: (param) => {
        dispatch(updateTruckRepairRel(param))
    },
    resetUpdateTruckRepairRel: () => {
        dispatch(resetUpdateTruckRepairRel())
    },
    createTruckRepairRel: (param) => {
        dispatch(createTruckRepairRel(param))
    },
    resetCreateTruckRepairRel: () => {
        dispatch(resetCreateTruckRepairRel())
    },
    getTruckRepairRelList: (param) => {
        dispatch(getTruckRepairRelList(param))
    },
    resetGetTruckRepairRelList: () => {
        dispatch(resetGetTruckRepairRelList())
    },
    updateDrivingImage: (param) => {
        dispatch(updateDrivingImage(param))
    },
    updateLicenseImage: (param) => {
        dispatch(updateLicenseImage(param))   
    },
    createTruckImage: (param) => {
        dispatch(createTruckImage(param)) 
    },
    delTruckImage: (param) => {
        dispatch(delTruckImage(param)) 
    },
    resetUpdateDrivingImage: () => {
        dispatch(resetUpdateDrivingImage())
    },
    resetUpdateLicenseImage: () => {
        dispatch(resetUpdateLicenseImage())
    },
    resetCreateTruckImage: () => {
        dispatch(resetCreateTruckImage())
    },
    resetDelTruckImage: () => {
        dispatch(resetDelTruckImage())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TruckInfo)