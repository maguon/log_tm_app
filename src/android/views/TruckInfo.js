import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    ScrollView,
    TouchableNativeFeedback,
    ToastAndroid, Alert
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
    resetDelTruckImage,
    changeTruckInfoField,
    resetUpdateTruckInfo,
    addTruckInfoInsurance,
    bindViceDriver,
    resetBindViceDriver,
    unBindViceDriver,
    resetUnBindViceDriver
} from '../../actions/TruckInfoAction'
import { Actions } from 'react-native-router-flux'
import insuranceTypeList from '../../config/insuranceType.json'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
import { setPhoto } from '../../actions/SinglePhotoViewAction'
import { initPhotoList, delPhoto } from '../../actions/CustomPhotoViewAction'
import TagTextBox from '../components/form/TagTextBox'
import moment from 'moment'
import globalStyles, { styleColor } from '../GlobalStyles'


var photoOptions = {
    //底部弹出框选项
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: null,
    customButtons: [{ title: '选择照片', name: 'choosePhoto' }],
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    maxWidth: 960,
    maxHeight: 960,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}

class TruckInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            truckType: 0,
            // truckNumTractorValidater: true,
            // truckTelTractorValidater: true,
            // theCodeTractorValidater: true,
            // remarkTractorValidater: true,

            // truckNumTrailerValidater: true,
            // numberTrailerValidater: true,
            // theCodeTrailerValidater: true,
            // remarkTrailerValidater: true
            // truckInfo: {
            //     truck_num: '',      //车牌号
            //     brand_name: '',     //识别码
            //     truck_tel: '',      //车辆管理的电话
            //     company_name: '',   //所属公司名称
            //     driving_date: '',   //行驶证检证日期
            //     license_date: '',   //营运证检证日期
            //     driving_image: '',  //行驶证照片
            //     license_image: '',  //营运证照片
            //     remark: ''          //备注
            // }
        }
        this.renderTractorInfoEnable = this.renderTractorInfoEnable.bind(this)
        this.renderTractorInfoDisable = this.renderTractorInfoDisable.bind(this)
        this.renderTrailerInfoEnable = this.renderTrailerInfoEnable.bind(this)
        this.renderTrailerInfoDisable = this.renderTrailerInfoDisable.bind(this)
        this.renderTruckPhoto = this.renderTruckPhoto.bind(this)
        this.renderTruckRecord = this.renderTruckRecord.bind(this)
        this.renderRepair = this.renderRepair.bind(this)
        this.onPressSegment = this.onPressSegment.bind(this)
        this.onChangeTruckStatus = this.onChangeTruckStatus.bind(this)
        this.renderInsuranceList = this.renderInsuranceList.bind(this)
        this.unBindDriver = this.unBindDriver.bind(this)
        this.bindDriver = this.bindDriver.bind(this)
        this.bindTrail = this.bindTrail.bind(this)
        this.unBindTrail = this.unBindTrail.bind(this)
        this.OnRepairSave = this.OnRepairSave.bind(this)
        this.onRepairUpdate = this.onRepairUpdate.bind(this)
        this.onAddInsurance = this.onAddInsurance.bind(this)
        this.updateDrivingImage = this.updateDrivingImage.bind(this)
        this.updateLicenseImage = this.updateLicenseImage.bind(this)
        this.createTruckImage = this.createTruckImage.bind(this)
        this.delTruckImage = this.delTruckImage.bind(this)
        this.launchCamera = this.launchCamera.bind(this)
        this.openPicker = this.openPicker.bind(this)
        this.onPressUpdateDrivingImage = this.onPressUpdateDrivingImage.bind(this)
        this.onPressUpdateLicenseImage = this.onPressUpdateLicenseImage.bind(this)
        this.onShowLicenseImage = this.onShowLicenseImage.bind(this)
        this.onShowTruckImage = this.onShowTruckImage.bind(this)
        this.onShowDrivingImage = this.onShowDrivingImage.bind(this)
        this.updateTruckInfo = this.updateTruckInfo.bind(this)
        this.bindViceDriver = this.bindViceDriver.bind(this)
        this.unBindViceDriver = this.unBindViceDriver.bind(this)
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
            updateTruckRepairRel,
            updateDrivingImage,
            updateLicenseImage,
            createTruckImage,
            delTruckImage,
            updateTruckInfo,
            bindViceDriver,
            unBindViceDriver,
            data } = nextProps.truckInfoReducer
        /*truckInfo*/ //完成
        if (truckInfo.isExecStatus == 2) {
            if (truckInfo.isResultStatus == 0) {
                Actions.refresh({
                    rightType: 1,
                    truckStatus: nextProps.truckInfoReducer.data.truckInfo.truck_status,
                    onPressRight: () => this.onChangeTruckStatus({
                        truckType: nextProps.truckInfoReducer.data.truckInfo.truck_type,
                        userId: nextProps.loginReducer.data.user.uid,
                        truckId: nextProps.truckInfoReducer.data.truckInfo.id,
                        truckStatus: nextProps.truckInfoReducer.data.truckInfo.truck_status
                    })
                })
                this.props.resetGetTruckInfo()
            }
            else if (truckInfo.isResultStatus == 1) {
                this.props.resetGetTruckInfo()
            }
            else if (truckInfo.isResultStatus == 2) {
                this.props.resetGetTruckInfo()
            }
            else if (truckInfo.isResultStatus == 3) {
                this.props.resetGetTruckInfo()
            }
        }
        /************************************ */

        /*truckInsureRel*/
        if (truckInsureRel.isExecStatus == 2) {
            if (truckInsureRel.isResultStatus == 0) {
                // console.log('truckInsureRel', '执行成功')
                this.props.resetGetTruckInsureRel()
            }
            else if (truckInsureRel.isResultStatus == 1) {
                // console.log('truckInsureRel', '异常')
                this.props.resetGetTruckInsureRel()
            }
            else if (truckInsureRel.isResultStatus == 2) {
                // console.log('truckInsureRel', '执行失败')
                this.props.resetGetTruckInsureRel()
            }
            else if (truckInsureRel.isResultStatus == 3) {
                // console.log('truckInsureRel', '服务器异常')
                this.props.resetGetTruckInsureRel()
            }
        }
        /************************************ */

        /*truckRecord*/
        if (truckRecord.isExecStatus == 2) {
            if (truckRecord.isResultStatus == 0) {
                //console.log('truckRecord', '执行成功')
                this.props.resetGetTruckRecord()
            }
            else if (truckRecord.isResultStatus == 1) {
                //console.log('truckRecord异常', truckRecord.errorMsg)
                this.props.resetGetTruckRecord()
            }
            else if (truckRecord.isResultStatus == 2) {
                //console.log('truckRecord', '执行失败')
                this.props.resetGetTruckRecord()
            }
            else if (truckRecord.isResultStatus == 3) {
                //console.log('truckRecord', '服务器异常')
                this.props.resetGetTruckRecord()
            }
        }
        /************************************ */

        /*truckRepairRelList*/
        if (truckRepairRelList.isExecStatus == 2) {
            if (truckRepairRelList.isResultStatus == 0) {
                //console.log('truckRepairRelList', '执行成功')
                this.props.resetGetTruckRepairRelList()
            }
            else if (truckRepairRelList.isResultStatus == 1) {
                //console.log('truckRepairRelList异常', truckRepairRelList.errorMsg)
                this.props.resetGetTruckRepairRelList()
            }
            else if (truckRepairRelList.isResultStatus == 2) {
                //console.log('truckRepairRelList', '执行失败')
                this.props.resetGetTruckRepairRelList()
            }
            else if (truckRepairRelList.isResultStatus == 3) {
                //console.log('truckRepairRelList', '服务器异常')
                this.props.resetGetTruckRepairRelList()
            }
        }
        /************************************ */

        /*createTruckRepairRel*/
        if (createTruckRepairRel.isExecStatus == 2) {
            if (createTruckRepairRel.isResultStatus == 0) {
                this.props.getTruckRepairRelList({ OptionalParam: { truckId: this.props.initParam.truckId } })
                ToastAndroid.showWithGravity('创建维修成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                //console.log('createTruckRepairRel执行成功')
                this.props.resetCreateTruckRepairRel()
            }
            else if (createTruckRepairRel.isResultStatus == 1) {
                //console.log('createTruckRepairRel异常', createTruckRepairRel.errorMsg)
                ToastAndroid.showWithGravity('创建维修失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateTruckRepairRel()
            }
            else if (createTruckRepairRel.isResultStatus == 2) {
                //console.log('createTruckRepairRel执行失败', createTruckRepairRel.failedMsg)
                ToastAndroid.showWithGravity('创建维修失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateTruckRepairRel()
            }
            else if (createTruckRepairRel.isResultStatus == 3) {
                ToastAndroid.showWithGravity('创建维修失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                // console.log('createTruckRepairRel服务器异常')
                this.props.resetCreateTruckRepairRel()
            }
        }
        /************************************ */

        /*updateTruckRepairRel*/
        if (updateTruckRepairRel.isExecStatus == 2) {
            if (updateTruckRepairRel.isResultStatus == 0) {
                this.props.getTruckRepairRelList({ OptionalParam: { truckId: this.props.initParam.truckId } })
                ToastAndroid.showWithGravity('终止维修成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                //console.log('updateTruckRepairRel', '执行成功')
                this.props.resetUpdateTruckRepairRel()
            }
            else if (updateTruckRepairRel.isResultStatus == 1) {
                //console.log('updateTruckRepairRel异常', updateTruckRepairRel.errorMsg)
                ToastAndroid.showWithGravity('终止维修失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateTruckRepairRel()
            }
            else if (updateTruckRepairRel.isResultStatus == 2) {
                //console.log('updateTruckRepairRel', '执行失败')
                ToastAndroid.showWithGravity('终止维修失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateTruckRepairRel()
            }
            else if (updateTruckRepairRel.isResultStatus == 3) {
                //console.log('updateTruckRepairRel', '服务器异常')
                ToastAndroid.showWithGravity('终止维修失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateTruckRepairRel()
            }
        }
        /************************************ */

        /*changeTruckFirstStatus*/ //完成
        if (changeTruckFirstStatus.isExecStatus == 2) {
            if (changeTruckFirstStatus.isResultStatus == 0) {
                Actions.refresh({
                    rightType: 1,
                    truckStatus: nextProps.truckInfoReducer.data.truckInfo.truck_status,
                    onPressRight: () => this.onChangeTruckStatus({
                        truckType: nextProps.truckInfoReducer.data.truckInfo.truck_type,
                        userId: nextProps.loginReducer.data.user.uid,
                        truckId: nextProps.truckInfoReducer.data.truckInfo.id,
                        truckStatus: nextProps.truckInfoReducer.data.truckInfo.truck_status
                    })
                })
                ToastAndroid.showWithGravity('操作成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetChangeTruckFirstStatus()
            }
            else if (changeTruckFirstStatus.isResultStatus == 1) {
                ToastAndroid.showWithGravity('操作失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetChangeTruckFirstStatus()
            }
            else if (changeTruckFirstStatus.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`操作失败，${changeTruckFirstStatus.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetChangeTruckFirstStatus()
            }
            else if (changeTruckFirstStatus.isResultStatus == 3) {
                ToastAndroid.showWithGravity('操作失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetChangeTruckFirstStatus()
            }
        }
        /************************************ */

        /*changeTruckTrailerStatus*/ //完成
        if (changeTruckTrailerStatus.isExecStatus == 2) {
            if (changeTruckTrailerStatus.isResultStatus == 0) {
                Actions.refresh({
                    rightType: 1,
                    truckStatus: nextProps.truckInfoReducer.data.truckInfo.truck_status,
                    onPressRight: () => this.onChangeTruckStatus({
                        truckType: nextProps.truckInfoReducer.data.truckInfo.truck_type,
                        userId: nextProps.loginReducer.data.user.uid,
                        truckId: nextProps.truckInfoReducer.data.truckInfo.id,
                        truckStatus: nextProps.truckInfoReducer.data.truckInfo.truck_status
                    })
                })
                ToastAndroid.showWithGravity('操作成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetChangeTruckTrailerStatus()
            }
            else if (changeTruckTrailerStatus.isResultStatus == 1) {
                ToastAndroid.showWithGravity('操作失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetChangeTruckTrailerStatus()
            }
            else if (changeTruckTrailerStatus.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`操作失败，${changeTruckTrailerStatus.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetChangeTruckTrailerStatus()
            }
            else if (changeTruckTrailerStatus.isResultStatus == 3) {
                ToastAndroid.showWithGravity('操作失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetChangeTruckTrailerStatus()
            }
        }
        /************************************ */

        /*bindTrail */ //完成
        if (bindTrail.isExecStatus == 2) {
            if (bindTrail.isResultStatus == 0) {
                ToastAndroid.showWithGravity('绑定成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindTruck()
            }
            else if (bindTrail.isResultStatus == 1) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindTruck()
            }
            else if (bindTrail.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`绑定失败，${bindTrail.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindTruck()
            }
            else if (bindTrail.isResultStatus == 3) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindTruck()
            }
        }
        /************************************ */

        /*unBindTrail*/ //完成
        if (unBindTrail.isExecStatus == 2) {
            if (unBindTrail.isResultStatus == 0) {
                ToastAndroid.showWithGravity('解绑成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindTruck()
            }
            else if (unBindTrail.isResultStatus == 1) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindTruck()
            }
            else if (unBindTrail.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`解绑失败，${unBindTrail.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindTruck()
            }
            else if (unBindTrail.isResultStatus == 3) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindTruck()
            }
        }
        /************************************ */

        /*bindDriver*/ //完成
        if (bindDriver.isExecStatus == 2) {
            if (bindDriver.isResultStatus == 0) {
                ToastAndroid.showWithGravity('绑定成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindDriver()
            }
            else if (bindDriver.isResultStatus == 1) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindDriver()
            }
            else if (bindDriver.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`绑定失败，${bindDriver.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindDriver()
            }
            else if (bindDriver.isResultStatus == 3) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindDriver()
            }
        }
        /************************************ */

        /*bindDriver*/ //完成
        if (unBindDriver.isExecStatus == 2) {
            if (unBindDriver.isResultStatus == 0) {
                ToastAndroid.showWithGravity('解绑成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindDriver()
            }
            else if (unBindDriver.isResultStatus == 1) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindDriver()
            }
            else if (unBindDriver.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`解绑失败，${unBindDriver.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindDriver()
            }
            else if (unBindDriver.isResultStatus == 3) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindDriver()
            }
        }
        /************************************ */

        /*updateDrivingImage*/ //完成
        if (updateDrivingImage.isExecStatus == 2) {
            if (updateDrivingImage.isResultStatus == 0) {
                this.props.setPhoto(data.truckInfo.driving_image)
                ToastAndroid.showWithGravity('行驶证图片更新成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImage()
            }
            else if (updateDrivingImage.isResultStatus == 1) {
                ToastAndroid.showWithGravity('行驶证图片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImage()
            }
            else if (updateDrivingImage.isResultStatus == 2) {
                ToastAndroid.showWithGravity('行驶证图片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImage()
            }
            else if (updateDrivingImage.isResultStatus == 3) {
                ToastAndroid.showWithGravity('行驶证图片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImage()
            }
        }
        /************************************ */

        /*updateLicenseImage*/ //完成
        if (updateLicenseImage.isExecStatus == 2) {
            if (updateLicenseImage.isResultStatus == 0) {
                this.props.setPhoto(data.truckInfo.license_image)
                ToastAndroid.showWithGravity('营运证图片更新成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImage()
            }
            else if (updateLicenseImage.isResultStatus == 1) {
                ToastAndroid.showWithGravity('营运证图片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImage()
            }
            else if (updateLicenseImage.isResultStatus == 2) {
                ToastAndroid.showWithGravity('营运证图片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImage()
            }
            else if (updateLicenseImage.isResultStatus == 3) {
                ToastAndroid.showWithGravity('营运证图片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImage()
            }
        }
        /************************************ */

        /*createTruckImage*/ //完成
        if (createTruckImage.isExecStatus == 2) {
            if (createTruckImage.isResultStatus == 0) {
                //this.props.initPhotoList(nextProps.truckInfoReducer.data.imageList.map((item) => item.url))
                ToastAndroid.showWithGravity('车辆图片上传成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateTruckImage()
            }
            else if (createTruckImage.isResultStatus == 1) {
                ToastAndroid.showWithGravity('车辆图片上传失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateTruckImage()
            }
            else if (createTruckImage.isResultStatus == 2) {
                ToastAndroid.showWithGravity('车辆图片上传失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateTruckImage()
            }
            else if (createTruckImage.isResultStatus == 3) {
                ToastAndroid.showWithGravity('车辆图片上传失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateTruckImage()
            }
        }
        /************************************ */

        /*delTruckImage*/ //完成
        if (delTruckImage.isExecStatus == 2) {
            if (delTruckImage.isResultStatus == 0) {
                this.props.initPhotoList(nextProps.truckInfoReducer.data.imageList.map((item) => item.url))
                ToastAndroid.showWithGravity('车辆图片删除成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetDelTruckImage()
            }
            else if (delTruckImage.isResultStatus == 1) {
                ToastAndroid.showWithGravity('车辆图片删除失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetDelTruckImage()
            }
            else if (delTruckImage.isResultStatus == 2) {
                ToastAndroid.showWithGravity('车辆图片删除失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetDelTruckImage()
            }
            else if (delTruckImage.isResultStatus == 3) {
                ToastAndroid.showWithGravity('车辆图片删除失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetDelTruckImage()
            }
        }
        /************************************ */

        /*updateTruckInfo*/ //完成
        if (updateTruckInfo.isExecStatus == 2) {
            if (updateTruckInfo.isResultStatus == 0) {
                //console.log('updateTruckInfo', '执行成功')
                ToastAndroid.showWithGravity('修改成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateTruckInfo()
            }
            else if (updateTruckInfo.isResultStatus == 1) {
                //console.log('updateTruckInfo', updateTruckInfo.errorMsg)
                ToastAndroid.showWithGravity('修改失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.getTruckInfo({ OptionalParam: { truckId: this.props.initParam.truckId } })
                this.props.resetUpdateTruckInfo()
            }
            else if (updateTruckInfo.isResultStatus == 2) {
                //console.log('updateTruckInfo执行失败', updateTruckInfo.failedMsg)
                ToastAndroid.showWithGravity('修改失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.getTruckInfo({ OptionalParam: { truckId: this.props.initParam.truckId } })
                this.props.resetUpdateTruckInfo()
            }
            else if (updateTruckInfo.isResultStatus == 3) {
                //console.log('updateTruckInfo', '服务器异常')
                ToastAndroid.showWithGravity('修改失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.getTruckInfo({ OptionalParam: { truckId: this.props.initParam.truckId } })
                this.props.resetUpdateTruckInfo()
            }
        }
        /************************************ */

        /*bindViceDriver*/ //完成
        if (bindViceDriver.isExecStatus == 2) {
            if (bindViceDriver.isResultStatus == 0) {
                ToastAndroid.showWithGravity('绑定成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindViceDriver()
            }
            else if (bindViceDriver.isResultStatus == 1) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindViceDriver()
            }
            else if (bindViceDriver.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`绑定失败，${bindViceDriver.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindViceDriver()
            }
            else if (bindViceDriver.isResultStatus == 3) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindViceDriver()
            }
        }
        /************************************ */

        /*unBindViceDriver*/ //完成
        if (unBindViceDriver.isExecStatus == 2) {
            if (unBindViceDriver.isResultStatus == 0) {
                ToastAndroid.showWithGravity('解绑成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindViceDriver()
            }
            else if (unBindViceDriver.isResultStatus == 1) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindViceDriver()
            }
            else if (unBindViceDriver.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`解绑失败，${unBindViceDriver.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindViceDriver()
            }
            else if (unBindViceDriver.isResultStatus == 3) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindViceDriver()
            }
        }
        /************************************ */
    }

    componentDidMount() {
        this.props.getTruckInfo({ OptionalParam: { truckId: this.props.initParam.truckId }, type: this.props.initParam.truckType })
        this.props.getTruckInsureRel({ OptionalParam: { truckId: this.props.initParam.truckId, active: 1 } })
        this.props.getTruckRecord({ requiredParam: { userId: this.props.loginReducer.data.user.uid, truckNum: this.props.initParam.truck_num } })
        this.props.getTruckRepairRelList({ OptionalParam: { truckId: this.props.initParam.truckId } })
    }

    onPressSegment(index) {
        if (this.state.truckType != index)
            this.setState({ truckType: index })
    }

    updateTruckInfo() {
        let param = {
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.initParam.truckId
            },
            putParam: {
                truckNum: this.props.truckInfoReducer.data.truckInfo.truck_num,
                companyId: this.props.truckInfoReducer.data.truckInfo.company_id,
                truckType: this.props.truckInfoReducer.data.truckInfo.truck_type,
            }
        }
        if (this.props.truckInfoReducer.data.truckInfo.brand_id) param.putParam.brandId = this.props.truckInfoReducer.data.truckInfo.brand_id
        if (this.props.truckInfoReducer.data.truckInfo.truck_tel) param.putParam.truckTel = this.props.truckInfoReducer.data.truckInfo.truck_tel
        if (this.props.truckInfoReducer.data.truckInfo.the_code) param.putParam.theCode = this.props.truckInfoReducer.data.truckInfo.the_code
        if (this.props.truckInfoReducer.data.truckInfo.driving_date) param.putParam.drivingDate = this.props.truckInfoReducer.data.truckInfo.driving_date
        if (this.props.truckInfoReducer.data.truckInfo.license_date) param.putParam.licenseDate = this.props.truckInfoReducer.data.truckInfo.license_date
        if (this.props.truckInfoReducer.data.truckInfo.remark) param.putParam.remark = this.props.truckInfoReducer.data.truckInfo.remark
        this.props.updateTruckInfo(param)
    }

    bindViceDriver(param) {
        this.props.bindViceDriver({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.initParam.truckId,
                viceDriveId: param.id
            },
            vice_drive_id: param.id,
            vice_drive_name: param.value
        })
    }

    unBindViceDriver() {
        this.props.unBindViceDriver({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.initParam.truckId,
                viceDriveId: this.props.truckInfoReducer.data.truckInfo.vice_drive_id
            }
        })
    }

    renderTractorInfoEnable() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <TagTextBox
                        title='车牌号：'
                        leftTag={10}
                        /* verifications={[{
                            type: 'isVehicleNumber',
                            message: '不是车牌号'
                        }]}
                        onRequire={(flag) => this.setState({ truckNumTractorValidater: flag })} */
                        companyType={this.props.truckInfoReducer.data.truckInfo.operate_type ? this.props.truckInfoReducer.data.truckInfo.operate_type : 10}
                        isDisable={this.props.truckInfoReducer.data.truckInfo.truck_status == 0}
                        value={this.props.truckInfoReducer.data.truckInfo.truck_num ? this.props.truckInfoReducer.data.truckInfo.truck_num : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ truck_num: param })}
                        placeholder='请输入车牌号'
                    />
                    <Select
                        title='品牌：'
                        value={this.props.truckInfoReducer.data.truckInfo.brand_name ? this.props.truckInfoReducer.data.truckInfo.brand_name : '请选择'}
                        showList={RouterDirection.selectMake(this.props.parent)}
                        onValueChange={(param) => this.props.changeTruckInfoField({ brand_id: param.id, brand_name: param.value })}
                    />
                    <TextBox
                        title='联系电话：'
                        /*verifications={[{
                            type: 'isPhone',
                            message: '不是手机号码'
                        }]}
                        onRequire={(flag) => this.setState({ truckTelTractorValidater: flag })}*/
                        value={this.props.truckInfoReducer.data.truckInfo.truck_tel ? this.props.truckInfoReducer.data.truckInfo.truck_tel : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ truck_tel: param })}
                        placeholder='请输入联系电话'
                    />
                    <TextBox
                        title='识别代码：'
                        /*verifications={[{
                            type: 'isLength',
                            arguments: [0, 20],
                            message: '长度不能超过20位'
                        }]}
                        onRequire={(flag) => this.setState({ theCodeTractorValidater: flag })}*/
                        value={this.props.truckInfoReducer.data.truckInfo.the_code ? this.props.truckInfoReducer.data.truckInfo.the_code : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ the_code: param })}
                        placeholder='请输入识别代码'
                    />
                    <Select
                        title='所属公司：'
                        value={this.props.truckInfoReducer.data.truckInfo.company_name ? this.props.truckInfoReducer.data.truckInfo.company_name : '请选择'}
                        showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                        onValueChange={(param) => this.props.changeTruckInfoField({ company_id: param.id, company_name: param.value, operate_type: param.operateType })}
                    />
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联挂车：{this.props.truckInfoReducer.data.truckInfo.trail_num ? this.props.truckInfoReducer.data.truckInfo.trail_num : '您还没有关联挂车'}</Text></View>
                        {!this.props.truckInfoReducer.data.truckInfo.trail_id ? <TouchableNativeFeedback onPress={() => RouterDirection.selectTruck(this.props.parent)({ initParam: { type: 2 }, onSelect: (param) => this.bindTrail(param) })} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>绑定</Text>
                            </View>
                        </TouchableNativeFeedback> : <TouchableNativeFeedback onPress={this.unBindTrail} background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                    <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                                </View>
                            </TouchableNativeFeedback>}
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联主驾：{this.props.truckInfoReducer.data.truckInfo.drive_name ? this.props.truckInfoReducer.data.truckInfo.drive_name : '您还没有关联司机'}</Text></View>
                        {!this.props.truckInfoReducer.data.truckInfo.drive_id ? <TouchableNativeFeedback onPress={() => RouterDirection.selectDriver(this.props.parent)({ initParam: { type: 2 }, onSelect: (param) => this.bindDriver(param) })} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>绑定</Text>
                            </View>
                        </TouchableNativeFeedback> : <TouchableNativeFeedback onPress={this.unBindDriver} background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                    <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                                </View>
                            </TouchableNativeFeedback>}
                    </View>
                     <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联副驾：{this.props.truckInfoReducer.data.truckInfo.vice_drive_name ? this.props.truckInfoReducer.data.truckInfo.vice_drive_name : '您还没有关联司机'}</Text></View>
                        {!this.props.truckInfoReducer.data.truckInfo.vice_drive_id ? <TouchableNativeFeedback onPress={() => RouterDirection.selectDriver(this.props.parent)({ initParam: { type: 2 }, onSelect: (param) => this.bindViceDriver(param) })} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>绑定</Text>
                            </View>
                        </TouchableNativeFeedback> : <TouchableNativeFeedback onPress={this.unBindViceDriver} background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                    <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                                </View>
                            </TouchableNativeFeedback>}
                    </View> 
                    <DateTimePicker
                        value={this.props.truckInfoReducer.data.truckInfo.driving_date ? this.props.truckInfoReducer.data.truckInfo.driving_date : '请选择'}
                        title='行驶证检证日期：'
                        defaultValue={'请选择'}
                        onValueChange={(param) => this.props.changeTruckInfoField({ driving_date: param })}
                    />
                    <DateTimePicker
                        value={this.props.truckInfoReducer.data.truckInfo.license_date ? this.props.truckInfoReducer.data.truckInfo.license_date : '请选择'}
                        title='营运证检证日期：'
                        defaultValue={'请选择'}
                        onValueChange={(param) => this.props.changeTruckInfoField({ license_date: param })}
                    />
                    <RichTextBox
                        title='备注：'
                        //onRequire={(flag) => this.setState({ remarkTractorValidater: flag })}
                        value={this.props.truckInfoReducer.data.truckInfo.remark ? this.props.truckInfoReducer.data.truckInfo.remark : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ remark: param })}
                        showRichText={RouterDirection.richText(this.props.parent)}
                        defaultValue={'请填写'}
                    />
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                        <Button
                            full
                            onPress={this.updateTruckInfo}
                            /* disabled={!(
                                this.state.truckNumTractorValidater &&
                                this.state.truckTelTractorValidater &&
                                this.state.theCodeTractorValidater &&
                                this.state.remarkTractorValidater
                            )} */
                            style={{
                                backgroundColor: (styleColor)
                                /*    this.state.truckNumTractorValidater &&
                                   this.state.truckTelTractorValidater &&
                                   this.state.theCodeTractorValidater &&
                                   this.state.remarkTractorValidater
                               ) ? styleColor : '#888888'*/
                            }}>
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
                    <TagTextBox
                        title='车牌号：'
                        leftTag={10}
                        /*verifications={[{
                            type: 'isVehicleNumber',
                            message: '不是车牌号'
                        }]}
                        onRequire={(flag) => this.setState({ truckNumTractorValidater: flag })}*/
                        companyType={this.props.truckInfoReducer.data.truckInfo.operate_type ? this.props.truckInfoReducer.data.truckInfo.operate_type : 10}
                        isDisable={this.props.truckInfoReducer.data.truckInfo.truck_status == 0}
                        value={this.props.truckInfoReducer.data.truckInfo.truck_num ? this.props.truckInfoReducer.data.truckInfo.truck_num : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ truck_num: param })}
                        placeholder='请输入车牌号'
                    />
                    <Select
                        title='品牌：'
                        value={this.props.truckInfoReducer.data.truckInfo.brand_name ? this.props.truckInfoReducer.data.truckInfo.brand_name : '请选择'}
                        showList={RouterDirection.selectMake(this.props.parent)}
                        onValueChange={(param) => this.props.changeTruckInfoField({ brand_id: param.id, brand_name: param.value })}
                    />
                    <TextBox
                        title='联系电话：'
                        /*verifications={[{
                            type: 'isPhone',
                            message: '不是手机号码'
                        }]}
                        onRequire={(flag) => this.setState({ truckTelTractorValidater: flag })}*/
                        value={this.props.truckInfoReducer.data.truckInfo.truck_tel ? this.props.truckInfoReducer.data.truckInfo.truck_tel : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ truck_tel: param })}
                        placeholder='请输入联系电话'
                    />
                    <TextBox
                        title='识别代码：'
                        /*verifications={[{
                            type: 'isLength',
                            arguments: [0, 20],
                            message: '长度不能超过20位'
                        }]}*/
                        onRequire={(flag) => this.setState({ theCodeTractorValidater: flag })}
                        value={this.props.truckInfoReducer.data.truckInfo.the_code ? this.props.truckInfoReducer.data.truckInfo.the_code : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ the_code: param })}
                        placeholder='请输入识别代码'
                    />
                    <Select
                        title='所属公司：'
                        value={this.props.truckInfoReducer.data.truckInfo.company_name ? this.props.truckInfoReducer.data.truckInfo.company_name : '请选择'}
                        showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                        onValueChange={(param) => this.props.changeTruckInfoField({ company_id: param.id, company_name: param.value, operate_type: param.operateType })}
                    />
                    <DateTimePicker
                        value={this.props.truckInfoReducer.data.truckInfo.driving_date ? this.props.truckInfoReducer.data.truckInfo.driving_date : '请选择'}
                        title='行驶证检证日期：'
                        defaultValue={'请选择'}
                        onValueChange={(param) => this.props.changeTruckInfoField({ driving_date: param })}
                    />
                    <DateTimePicker
                        value={this.props.truckInfoReducer.data.truckInfo.license_date ? this.props.truckInfoReducer.data.truckInfo.license_date : '请选择'}
                        title='营运证检证日期：'
                        defaultValue={'请选择'}
                        onValueChange={(param) => this.props.changeTruckInfoField({ license_date: param })}
                    />
                    <RichTextBox
                        title='备注：'
                        //onRequire={(flag) => this.setState({ remarkTractorValidater: flag })}
                        value={this.props.truckInfoReducer.data.truckInfo.remark ? this.props.truckInfoReducer.data.truckInfo.remark : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ remark: param })}
                        showRichText={RouterDirection.richText(this.props.parent)}
                        defaultValue={'请填写'}
                    />
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                        <Button
                            full
                            onPress={this.updateTruckInfo}
                            /*disabled={!(
                                this.state.truckNumTractorValidater &&
                                this.state.truckTelTractorValidater &&
                                this.state.theCodeTractorValidater &&
                                this.state.remarkTractorValidater
                            )}*/
                            style={{
                                backgroundColor: (styleColor)
                                /* this.state.truckNumTractorValidater &&
                                 this.state.truckTelTractorValidater &&
                                 this.state.theCodeTractorValidater &&
                                 this.state.remarkTractorValidater
                             ) ? styleColor : '#888888'*/
                            }}>
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
                    <TagTextBox
                        title='车牌号：'
                        leftTag={10}
                        /*verifications={[{
                            type: 'isVehicleNumber',
                            message: '不是车牌号'
                        }]}
                        onRequire={(flag) => this.setState({ truckNumTrailerValidater: flag })}*/
                        companyType={this.props.truckInfoReducer.data.truckInfo.operate_type ? this.props.truckInfoReducer.data.truckInfo.operate_type : 10}
                        isDisable={this.props.truckInfoReducer.data.truckInfo.truck_status == 0}
                        value={this.props.truckInfoReducer.data.truckInfo.truck_num ? this.props.truckInfoReducer.data.truckInfo.truck_num : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ truck_num: param })}
                        placeholder='请输入车牌号'
                    />
                    <TextBox
                        title='挂车货位：'
                        /*verifications={[{
                            type: 'isTrailerNumber',
                            message: '货位不正确'
                        }]}
                        onRequire={(flag) => this.setState({ numberTrailerValidater: flag })}*/
                        value={this.props.truckInfoReducer.data.truckInfo.number ? this.props.truckInfoReducer.data.truckInfo.number.toString() : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ number: param })}
                        placeholder='请输入挂车货位'
                    />
                    <TextBox
                        title='识别代码：'
                        /*verifications={[{
                            type: 'isLength',
                            arguments: [0, 20],
                            message: '长度不能超过20位'
                        }]}
                        onRequire={(flag) => this.setState({ theCodeTrailerValidater: flag })}*/
                        value={this.props.truckInfoReducer.data.truckInfo.the_code ? this.props.truckInfoReducer.data.truckInfo.the_code : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ the_code: param })}
                        placeholder='请输入识别代码'
                    />
                    <Select
                        title='所属公司：'
                        value={this.props.truckInfoReducer.data.truckInfo.company_name ? this.props.truckInfoReducer.data.truckInfo.company_name : '请选择'}
                        showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                        onValueChange={(param) => this.props.changeTruckInfoField({ company_id: param.id, company_name: param.value, operate_type: param.operateType })}
                        defaultValue={'请选择'}
                    />
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View><Text style={{ fontSize: 12 }}>关联车头：{this.props.truckInfoReducer.data.truckInfo.first_num ? this.props.truckInfoReducer.data.truckInfo.first_num : '您还没有关联挂车'}</Text></View>
                        {!this.props.truckInfoReducer.data.truckInfo.first_id ? <TouchableNativeFeedback onPress={() => RouterDirection.selectTruck(this.props.parent)({ initParam: { type: 1 }, onSelect: (param) => this.bindTrail(param) })} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>绑定</Text>
                            </View>
                        </TouchableNativeFeedback> : <TouchableNativeFeedback onPress={this.unBindTrail} background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                    <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                                </View>
                            </TouchableNativeFeedback>}
                    </View>
                    <DateTimePicker
                        title='行驶证检证日期：'
                        value={this.props.truckInfoReducer.data.truckInfo.driving_date ? this.props.truckInfoReducer.data.truckInfo.driving_date : '请选择'}
                        defaultValue={'请选择'}
                        onValueChange={(param) => this.props.changeTruckInfoField({ driving_date: param })}
                    />
                    <DateTimePicker
                        title='营运证检证日期：'
                        value={this.props.truckInfoReducer.data.truckInfo.license_date ? this.props.truckInfoReducer.data.truckInfo.license_date : '请选择'}
                        defaultValue={'请选择'}
                        onValueChange={(param) => this.props.changeTruckInfoField({ license_date: param })}
                    />
                    <RichTextBox
                        title='备注：'
                        //onRequire={(flag) => this.setState({ remarkTrailerValidater: flag })}
                        defaultValue={'请填写'}
                        value={this.props.truckInfoReducer.data.truckInfo.remark ? this.props.truckInfoReducer.data.truckInfo.remark : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ remark: param })}
                        showRichText={RouterDirection.richText(this.props.parent)}
                    />
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                        <Button
                            full
                            onPress={this.updateTruckInfo}
                            /*disabled={!(
                                this.state.truckNumTrailerValidater &&
                                this.state.numberTrailerValidater &&
                                this.state.theCodeTrailerValidater &&
                                this.state.remarkTrailerValidater
                            )}*/
                            style={{
                                backgroundColor: (styleColor)
                                /*   this.state.truckNumTrailerValidater &&
                                   this.state.numberTrailerValidater &&
                                   this.state.theCodeTrailerValidater &&
                                   this.state.remarkTrailerValidater
                               ) ? styleColor : '#888888'*/
                            }}>
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
                    <TagTextBox
                        title='车牌号：'
                        leftTag={10}
                        /*verifications={[{
                            type: 'isVehicleNumber',
                            message: '不是车牌号'
                        }]}
                        onRequire={(flag) => this.setState({ truckNumTrailerValidater: flag })}*/
                        companyType={this.props.truckInfoReducer.data.truckInfo.operate_type ? this.props.truckInfoReducer.data.truckInfo.operate_type : 10}
                        isDisable={this.props.truckInfoReducer.data.truckInfo.truck_status == 0}
                        value={this.props.truckInfoReducer.data.truckInfo.truck_num ? this.props.truckInfoReducer.data.truckInfo.truck_num : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ truck_num: param })}
                        placeholder='请输入车牌号'
                    />
                    <TextBox
                        title='挂车货位：'
                        /*verifications={[{
                            type: 'isTrailerNumber',
                            message: '货位不正确'
                        }]}
                        onRequire={(flag) => this.setState({ numberTrailerValidater: flag })}*/
                        value={this.props.truckInfoReducer.data.truckInfo.number ? this.props.truckInfoReducer.data.truckInfo.number.toString() : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ number: param })}
                        placeholder='请输入挂车货位'
                    />
                    <TextBox
                        title='识别代码：'
                        /*verifications={[{
                            type: 'isLength',
                            arguments: [0, 20],
                            message: '长度不能超过20位'
                        }]}
                        onRequire={(flag) => this.setState({ theCodeTrailerValidater: flag })}*/
                        value={this.props.truckInfoReducer.data.truckInfo.the_code ? this.props.truckInfoReducer.data.truckInfo.the_code : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ the_code: param })}
                        placeholder='请输入识别代码'
                    />
                    <Select
                        title='所属公司：'
                        value={this.props.truckInfoReducer.data.truckInfo.company_name ? this.props.truckInfoReducer.data.truckInfo.company_name : '请选择'}
                        showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                        onValueChange={(param) => this.props.changeTruckInfoField({ company_id: param.id, company_name: param.value, operate_type: param.operateType })}
                        defaultValue={'请选择'}
                    />
                    <DateTimePicker
                        title='行驶证检证日期：'
                        value={this.props.truckInfoReducer.data.truckInfo.driving_date ? this.props.truckInfoReducer.data.truckInfo.driving_date : '请选择'}
                        defaultValue={'请选择'}
                        onValueChange={(param) => this.props.changeTruckInfoField({ driving_date: param })}
                    />
                    <DateTimePicker
                        title='营运证检证日期：'
                        value={this.props.truckInfoReducer.data.truckInfo.license_date ? this.props.truckInfoReducer.data.truckInfo.license_date : '请选择'}
                        defaultValue={'请选择'}
                        onValueChange={(param) => this.props.changeTruckInfoField({ license_date: param })}
                    />
                    <RichTextBox
                        title='备注：'
                        defaultValue={'请填写'}
                        value={this.props.truckInfoReducer.data.truckInfo.remark ? this.props.truckInfoReducer.data.truckInfo.remark : ''}
                        onValueChange={(param) => this.props.changeTruckInfoField({ remark: param })}
                        showRichText={RouterDirection.richText(this.props.parent)}
                    />
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                        <Button
                            full
                            onPress={this.updateTruckInfo}
                            /*disabled={!(
                                this.state.truckNumTrailerValidater &&
                                this.state.numberTrailerValidater &&
                                this.state.theCodeTrailerValidater &&
                                this.state.remarkTrailerValidater
                            )}*/
                            style={{
                                backgroundColor: (styleColor)
                                /* this.state.truckNumTrailerValidater &&
                                 this.state.numberTrailerValidater &&
                                 this.state.theCodeTrailerValidater &&
                                 this.state.remarkTrailerValidater
                             ) ? styleColor : '#888888'*/
                            }}>
                            <Text style={{ color: '#fff' }}>保存信息</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        )
    }

    //完成
    unBindDriver() {
        this.props.unBindDriver({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.truckInfoReducer.data.truckInfo.id,
                driverId: this.props.truckInfoReducer.data.truckInfo.drive_id,
            },
            reducerParam: {
                drive_id: null,
                drive_name: null
            }
        })
    }

    //完成
    bindDriver(param) {
        this.props.bindDriver({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.truckInfoReducer.data.truckInfo.id,
                driverId: param.id,
            },
            reducerParam: {
                drive_id: param.id,
                drive_name: param.value
            }
        })
    }

    //完成
    bindTrail(param) {
        if (this.props.truckInfoReducer.data.truckInfo.truck_type == 1) {
            this.props.bindTruck({
                requiredParam: {
                    userId: this.props.loginReducer.data.user.uid,
                    truckId: this.props.truckInfoReducer.data.truckInfo.id,
                    trailId: param.id,
                },
                reducerParam: {
                    trail_id: param.id,
                    trail_num: param.value
                }
            })
        } else if (this.props.truckInfoReducer.data.truckInfo.truck_type == 2) {
            this.props.bindTruck({
                requiredParam: {
                    userId: this.props.loginReducer.data.user.uid,
                    truckId: param.id,
                    trailId: this.props.truckInfoReducer.data.truckInfo.id,
                },
                reducerParam: {
                    first_id: param.id,
                    first_num: param.value
                }
            })
        }
    }

    //完成
    unBindTrail() {
        if (this.props.truckInfoReducer.data.truckInfo.truck_type == 1) {
            this.props.unBindTruck({
                requiredParam: {
                    userId: this.props.loginReducer.data.user.uid,
                    truckId: this.props.truckInfoReducer.data.truckInfo.id,
                    trailId: this.props.truckInfoReducer.data.truckInfo.trail_id,
                },
                reducerParam: {
                    trail_id: null,
                    trail_num: null
                }
            })
        } else if (this.props.truckInfoReducer.data.truckInfo.truck_type == 2) {
            this.props.unBindTruck({
                requiredParam: {
                    userId: this.props.loginReducer.data.user.uid,
                    truckId: this.props.truckInfoReducer.data.truckInfo.first_id,
                    trailId: this.props.truckInfoReducer.data.truckInfo.id,
                },
                reducerParam: {
                    first_id: null,
                    first_num: null
                }
            })
        }
    }

    //完成
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

    //完成
    launchCamera = (onGetPhoto) => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
                //console.log('User cancelled video picker')
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                if (response.customButton == 'choosePhoto') {
                    this.openPicker(onGetPhoto)
                }
            } else {
                ImageResizer.createResizedImage(response.uri, 960, 960, 'JPEG', 100)
                    .then((resizedImageUri) => {
                        let param = {
                            postFileParam: {
                                imageUrl: resizedImageUri,
                                imageType: response.type,
                                imageName: encodeURI(response.fileName)
                            }
                        }
                        onGetPhoto(param)
                    }).catch((err) => {
                        // return console.log(err)
                    })
            }
        })
    }

    //完成
    openPicker(onGetPhoto) {
        ImageCropPicker.openPicker({
            multiple: false
        }).then(image => {
            let pos = image.path.lastIndexOf('/')
            ImageResizer.createResizedImage(image.path, 960, 960, 'JPEG', 100)
                .then((resizedImageUri) => {
                    let param = {
                        postFileParam: {
                            imageUrl: resizedImageUri,
                            imageType: image.mime,
                            imageName: encodeURI(image.path.substring(pos + 1))
                        }
                    }
                    onGetPhoto(param)
                }).catch((err) => {
                    // return console.log(err)
                })
        }).catch(err => {
            // console.log('err')
        })
    }

    //完成
    onPressUpdateDrivingImage() {
        this.launchCamera(this.updateDrivingImage)
    }

    //完成
    onPressUpdateLicenseImage() {
        this.launchCamera(this.updateLicenseImage)
    }

    //完成
    updateDrivingImage(param) {
        this.props.updateDrivingImage({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.initParam.truckId
            },
            OptionalParam: {
                imageType: 2
            },
            putParam: {
                imageType: 1
            },
            postFileParam: {
                ...param.postFileParam,
                imageUrl: param.postFileParam.imageUrl.uri,
                key: "image"
            }
        })
    }

    //完成
    updateLicenseImage(param) {
        this.props.updateLicenseImage({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.initParam.truckId
            },
            OptionalParam: {
                imageType: 2
            },
            putParam: {
                imageType: 2
            },
            postFileParam: {
                ...param.postFileParam,
                imageUrl: param.postFileParam.imageUrl.uri,
                key: "image"
            }
        })
    }

    //完成
    onShowDrivingImage() {
        this.props.setPhoto(this.props.truckInfoReducer.data.truckInfo.driving_image)
        RouterDirection.singlePhotoView(this.props.parent)({
            initParam: {
                onUpdateImage: () => this.launchCamera(this.updateDrivingImage)
            }
        })
    }

    //完成
    onShowLicenseImage() {
        this.props.setPhoto(this.props.truckInfoReducer.data.truckInfo.license_image)
        RouterDirection.singlePhotoView(this.props.parent)({
            initParam: {
                onUpdateImage: () => this.launchCamera(this.updateLicenseImage)
            }
        })

    }

    //完成
    onShowTruckImage(index) {
        this.props.initPhotoList(this.props.truckInfoReducer.data.imageList.map((item) => item.url))
        RouterDirection.customPhotoView(this.props.parent)({
            initParam: {
                onDelImage: this.delTruckImage,
                index
            }
        })
    }

    //完成
    createTruckImage(param) {
        this.props.createTruckImage({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.truckInfoReducer.data.truckInfo.id,
                truckCode: this.props.truckInfoReducer.data.truckInfo.truck_num
            },
            OptionalParam: {
                imageType: 2
            },
            postParam: {
                username: this.props.loginReducer.data.user.mobile,
                userid: this.props.loginReducer.data.user.uid,
                userType: this.props.loginReducer.data.user.type,
            },
            postFileParam: {
                ...param.postFileParam,
                imageUrl: param.postFileParam.imageUrl.uri,
                key: "image"
            }
        })
    }

    //完成
    delTruckImage(param) {
        this.props.delTruckImage({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                url: param,
                truckNum: this.props.initParam.truck_num
            }
        })
    }

    renderTruckPhoto() {
        const { driving_image, license_image } = this.props.truckInfoReducer.data.truckInfo
        let imageList = [...this.props.truckInfoReducer.data.imageList]

        let imageListFoot
        if (imageList.length % 2 == 0) {
            imageListFoot = <View key={'f'} style={{ flexDirection: 'row' }}>
                <Camera onGetPhoto={this.createTruckImage} title='上传车辆照片' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
            </View>
        } else {
            const lastImage = imageList.pop()
            imageListFoot = <View key={'f'} style={{ flexDirection: 'row' }}>
                <PanelCustomItem onShowPhoto={() => this.onShowTruckImage(imageList.length)} imageUrl={lastImage.url} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                <Camera onGetPhoto={this.createTruckImage} title='上传车辆照片' containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
            </View>
        }

        let imageBody = []
        for (let i = 0; i < imageList.length; i += 2) {
            const viewItem = (<View key={i} style={{ flexDirection: 'row' }}>
                <PanelCustomItem onShowPhoto={() => this.onShowTruckImage(i)} imageUrl={imageList[i].url} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                <PanelCustomItem onShowPhoto={() => this.onShowTruckImage(i + 1)} imageUrl={imageList[i + 1].url} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
            </View>)
            imageBody.push(viewItem)
        }

        return (
            <FlatList showsVerticalScrollIndicator={false}
                ListHeaderComponent={<View style={{ flexDirection: 'row' }}>
                    {driving_image
                        ? <PanelSingleItem onUpdateImage={this.onPressUpdateDrivingImage} title='行驶证' onShowPhoto={this.onShowDrivingImage} imageUrl={driving_image} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                        : <Camera title='上传行驶证照片' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} onGetPhoto={this.updateDrivingImage} />}
                    {license_image
                        ? <PanelSingleItem onUpdateImage={this.onPressUpdateLicenseImage} onShowPhoto={this.onShowLicenseImage} title='营运证' imageUrl={license_image} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
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
                renderItem={({ item }) => <View style={{ borderColor: '#ddd', borderBottomWidth: 0.5, paddingHorizontal: 10 }}><RecordListItem content={item.content} name={item.name} time={new Date(item.timez).toLocaleString()} /></View>}
            />
        )
    }

    OnRepairSave(param) {
        let p = {
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.truckInfoReducer.data.truckInfo.id
            },
            postParam: {
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
                userId: this.props.loginReducer.data.user.uid,
                relId: truckRepairing.id
            },
            putParam: {
                remark: param.remark,
                repairMoney: param.repairMoney,
                repairUser: param.repairUser
            }
        })
    }

    renderRepair() {
        let truckRepairing = this.props.truckInfoReducer.data.truckRepairRelList.find((item) => item.repair_status == 0)
        // console.log(truckRepairing)
        return (
            <View style={{ flex: 1 }}>
                {truckRepairing ? <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#e3e3e3' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12 }}>维修日期：{new Date(truckRepairing.repair_date).toLocaleDateString()}</Text>
                        <Button small style={{ backgroundColor: styleColor }} onPress={() => RouterDirection.updateRepair(this.props.parent)({ onRepairUpdate: this.onRepairUpdate })}>
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
                        <Button small onPress={() => RouterDirection.addRepair(this.props.parent)({ OnRepairSave: this.OnRepairSave })} style={{ backgroundColor: '#f27d80', alignSelf: 'flex-end',marginRight:15 }}>
                            <Text style={{ color: '#fff',paddingHorizontal:10 }}>维修</Text>
                        </Button>
                    </View>}
                <View style={{ flex: 1 }} >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.props.truckInfoReducer.data.truckRepairRelList.filter((item) => item.repair_status == 1)}
                        renderItem={({ item }) => <View style={{ paddingVertical: 5, paddingHorizontal: 5, borderRadius: 2, borderWidth: 0.5, marginHorizontal: 10, marginVertical: 10, borderColor: '#e3e3e3' }}>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#e3e3e3', paddingVertical: 5 }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{moment(new Date(item.repair_date)).format('YYYY-MM-DD hh:mm:ss')} 至 {moment(new Date(item.end_date)).format('YYYY-MM-DD hh:mm:ss')}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12, paddingVertical: 5, fontWeight: 'bold' }}>维修原因：</Text>
                                <Text style={{ fontSize: 12, paddingVertical: 5 }}>{item.repair_reason}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12, paddingVertical: 5, fontWeight: 'bold' }}>维修描述：</Text>
                                <Text style={{ fontSize: 12, paddingVertical: 5 }}>{item.remark}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ alignSelf: 'flex-end', fontSize: 10 }}>维修人：<Text style={{ color: '#f27d80', fontSize: 12 }}>{item.repair_user}</Text></Text>
                                <Text style={{ alignSelf: 'flex-end', fontSize: 10 }}>金额：<Text style={{ color: '#f27d80', fontSize: 12 }}>{item.repair_money}</Text>元</Text>
                            </View>
                        </View>}
                    />
                </View>

            </View>
        )
    }

    onAddInsurance(param) {
        this.props.addTruckInfoInsurance({
            end_date: param.endDate,
            insure_name: param.insure,
            insure_money: param.insureMoney,
            insure_num: param.insureNum,
            start_date: param.startDate,
            end_date: param.endDate,
            insure_date: param.createDate,
            insure_type: param.insureType
        })
    }

    renderInsuranceList() {
        let insuranceList = this.props.truckInfoReducer.data.truckInsureRelList.map((item, i) => {
            let panelStyle = (i == this.props.truckInfoReducer.data.truckInsureRelList.length - 1) ? { marginVertical: 10 } : { marginTop: 10 }

            return (
                <View key={i} style={{ backgroundColor: '#edf1f4' }}>
                    <View style={{ marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#fff', borderColor: '#e8e8e8', borderWidth: 0.5, ...panelStyle }}>
                        <View style={{ flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8', alignItems: 'flex-end' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: styleColor }}>{insuranceTypeList.find((typeItem) => typeItem.id == item.insure_type).insuranceType}</Text>
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
                                <Text style={{ fontSize: 11 }}>投保日期：{moment(Date.parse(item.insure_date)).format('YYYY-MM-DD')}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontSize: 11 }}>生效期：{moment(Date.parse(item.start_date)).format('YYYY-MM-DD')} 到：{moment(Date.parse(item.end_date)).format('YYYY-MM-DD')}</Text>
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
                    onPress={() => RouterDirection.addInsurance(this.props.parent)({ initParam: this.props.initParam, onAddInsurance: this.onAddInsurance })}
                    style={{ backgroundColor: styleColor, alignSelf: 'flex-end' }}>
                    <Text style={{ color: '#fff', fontSize: 12,paddingHorizontal:10 }}>增加保单</Text>
                </Button>
            </View>
        )

        return [...insuranceList, addInsuranceBtn]
    }

    render() {
        const { truck_status, truck_type } = this.props.truckInfoReducer.data.truckInfo
        // console.log(this.props)
        //  console.log(this.state)
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', borderWidth: 1, borderColor: styleColor }}>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: styleColor, justifyContent: 'center', backgroundColor: this.state.truckType == 0 ? styleColor : '#fff' }} onPress={() => this.onPressSegment(0)}>
                        <Text style={{ color: this.state.truckType == 0 ? '#fff' : styleColor }}>信息</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: styleColor, justifyContent: 'center', backgroundColor: this.state.truckType == 1 ? styleColor : '#fff' }} onPress={() => this.onPressSegment(1)}>
                        <Text style={{ color: this.state.truckType == 1 ? '#fff' : styleColor }}>照片</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: styleColor, justifyContent: 'center', backgroundColor: this.state.truckType == 2 ? styleColor : '#fff' }} onPress={() => this.onPressSegment(2)}>
                        <Text style={{ color: this.state.truckType == 2 ? '#fff' : styleColor }}>车保</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: styleColor, justifyContent: 'center', backgroundColor: this.state.truckType == 3 ? styleColor : '#fff' }} onPress={() => this.onPressSegment(3)}>
                        <Text style={{ color: this.state.truckType == 3 ? '#fff' : styleColor }}>记录</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, justifyContent: 'center', backgroundColor: this.state.truckType == 4 ? styleColor : '#fff' }} onPress={() => this.onPressSegment(4)}>
                        <Text style={{ color: this.state.truckType == 4 ? '#fff' : styleColor }}>维修</Text>
                    </Button>
                </View>
                <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: styleColor, flex: 1 }}>
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
        loginReducer: state.loginReducer
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
    },
    initPhotoList: (param) => {
        dispatch(initPhotoList(param))
    },
    delPhoto: (param) => {
        dispatch(delPhoto(param))
    },
    setPhoto: (param) => {
        dispatch(setPhoto(param))
    },
    changeTruckInfoField: (param) => {
        dispatch(changeTruckInfoField(param))
    },
    resetUpdateTruckInfo: () => {
        dispatch(resetUpdateTruckInfo())
    },
    addTruckInfoInsurance: (param) => {
        dispatch(addTruckInfoInsurance(param))
    },
    bindViceDriver: (param) => {
        dispatch(bindViceDriver(param))
    },
    resetBindViceDriver: () => {
        dispatch(resetBindViceDriver())
    },
    unBindViceDriver: (param) => {
        dispatch(unBindViceDriver(param))
    },
    resetUnBindViceDriver: () => {
        dispatch(resetUnBindViceDriver())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TruckInfo)