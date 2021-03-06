import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableNativeFeedback,
    ToastAndroid
} from 'react-native'
import { Button } from 'native-base'
import TextBox from '../components/form/TextBox'
import TagTextBox from '../components/form/TagTextBox'
import TagSelect from '../components/form/TagSelect'
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
import {
    getDriverInfo,
    getDriverRecord,
    resetGetDriverInfo,
    resetGetDriverRecord,
    updateDriverInfo,
    resetUpdateDriverInfo,
    changeDriverStatus,
    resetChangeDriverStatus,
    bindTruck,
    unBindTruck,
    resetBindTruck,
    resetUnBindTruck,
    updateDrivingImage,
    updateLicenseImage,
    resetUpdateDrivingImage,
    resetUpdateLicenseImage,
    changeDriverInfoField,
    updateDrivingImageRe,
    resetUpdateDrivingImageRe,
    updateLicenseImageOp,
    resetUpdateLicenseImageOp,
    updateDriverAvatarImage,
    resetUpdateDriverAvatarImage
} from '../../actions/DriverInfoAction'
import { connect } from 'react-redux'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
import { setPhoto } from '../../actions/SinglePhotoViewAction'
import { Actions } from 'react-native-router-flux'
import DrivingLicenseTypeList from '../../config/DrivingLicenseType.json'
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

class DriverInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0,
            // telValidater: true,
            // sibTelValidater: true,
            // driverNameValidater: true,
            // addressValidater: true,
            // cardNoValidater: true
        }
        this.onPressSegment = this.onPressSegment.bind(this)
        this.renderDriverInfoEnable = this.renderDriverInfoEnable.bind(this)
        this.renderDriverInfoDisable = this.renderDriverInfoDisable.bind(this)
        this.renderDriverPhoto = this.renderDriverPhoto.bind(this)
        this.renderDriverRecord = this.renderDriverRecord.bind(this)
        this.updateDrivingImage = this.updateDrivingImage.bind(this)
        this.updateLicenseImage = this.updateLicenseImage.bind(this)
        this.onShowDrivingImage = this.onShowDrivingImage.bind(this)
        this.onShowLicenseImage = this.onShowLicenseImage.bind(this)
        this.onPressUpdateDrivingImage = this.onPressUpdateDrivingImage.bind(this)
        this.onPressUpdateLicenseImage = this.onPressUpdateLicenseImage.bind(this)
        this.launchCamera = this.launchCamera.bind(this)
        this.openPicker = this.openPicker.bind(this)
        this.bindTruck = this.bindTruck.bind(this)
        this.unBindTruck = this.unBindTruck.bind(this)
        this.updateDriverInfo = this.updateDriverInfo.bind(this)
        this.updateDrivingImageRe = this.updateDrivingImageRe.bind(this)
        this.updateLicenseImageOp = this.updateLicenseImageOp.bind(this)
        this.updateDriverAvatarImage = this.updateDriverAvatarImage.bind(this)
        this.onPressUpdateDrivingImageRe = this.onPressUpdateDrivingImageRe.bind(this)
        this.onPressUpdateLicenseImageOp = this.onPressUpdateLicenseImageOp.bind(this)
        this.onPressUpdateDriverAvatarImage = this.onPressUpdateDriverAvatarImage.bind(this)
        this.onShowDrivingImageRe = this.onShowDrivingImageRe.bind(this)
        this.onShowLicenseImageOp = this.onShowLicenseImageOp.bind(this)
        this.onShowDriverAvatarImage = this.onShowDriverAvatarImage.bind(this)

    }

    // static defaultProps = {
    //     initParam: {
    //         driverId: 112
    //     }
    // }


    componentDidMount() {
        this.props.getDriverInfo({ OptionalParam: { driveId: this.props.initParam.driverId } })
        this.props.getDriverRecord({ requiredParam: { userId: this.props.loginReducer.data.user.uid, driverId: this.props.initParam.driverId } })
        //console.log(DrivingLicenseTypeList)
        //DrivingLicenseTypeList.find((item) => item.id == this.props.driverInfoReducer.data.driverInfo.license_type).value
    }

    componentWillReceiveProps(nextProps) {
        const { getDriverInfo,
            getDriverRecord,
            updateDriverInfo,
            bindTruck,
            unBindTruck,
            changeDriverStatus,
            updateDrivingImage,
            updateLicenseImage,
            updateDriverImageRe,
            updateLicenseImageOp,
            updateDriverAvatarImage,
            data } = nextProps.driverInfoReducer

        /*getDriverInfo*/
        if (getDriverInfo.isExecStatus == 2) {
            if (getDriverInfo.isResultStatus == 0) {
                Actions.refresh({
                    rightType: 1,
                    truckStatus: nextProps.driverInfoReducer.data.driverInfo.drive_status,
                    onPressRight: () => this.props.changeDriverStatus({
                        requiredParam: {
                            userId: nextProps.loginReducer.data.user.uid,
                            driveId: nextProps.driverInfoReducer.data.driverInfo.id,
                            driveStatus: nextProps.driverInfoReducer.data.driverInfo.drive_status == 1 ? 0 : 1
                        }
                    })
                })
                this.props.resetGetDriverInfo()
            }
            else if (getDriverInfo.isResultStatus == 1) {
                this.props.resetGetDriverInfo()
            }
            else if (getDriverInfo.isResultStatus == 2) {
                this.props.resetGetDriverInfo()
            }
            else if (getDriverInfo.isResultStatus == 3) {
                this.props.resetGetDriverInfo()
            }
        }
        /************************************ */

        /*getDriverRecord*/
        if (getDriverRecord.isExecStatus == 2) {
            if (getDriverRecord.isResultStatus == 0) {
                this.props.resetGetDriverRecord()
            }
            else if (getDriverRecord.isResultStatus == 1) {
                this.props.resetGetDriverRecord()
            }
            else if (getDriverRecord.isResultStatus == 2) {
                this.props.resetGetDriverRecord()
            }
            else if (getDriverRecord.isResultStatus == 3) {
                this.props.resetGetDriverRecord()
            }
        }
        /************************************ */

        /*bindTruck*/
        if (bindTruck.isExecStatus == 2) {
            if (bindTruck.isResultStatus == 0) {
                ToastAndroid.showWithGravity('绑定成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindTruck()
            }
            else if (bindTruck.isResultStatus == 1) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindTruck()
            }
            else if (bindTruck.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`绑定失败，${bindTruck.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindTruck()
            }
            else if (bindTruck.isResultStatus == 3) {
                ToastAndroid.showWithGravity('绑定失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetBindTruck()
            }
        }
        /************************************ */

        /*unBindTruck*/
        if (unBindTruck.isExecStatus == 2) {
            if (unBindTruck.isResultStatus == 0) {
                ToastAndroid.showWithGravity('解绑成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindTruck()
            }
            else if (unBindTruck.isResultStatus == 1) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindTruck()
            }
            else if (unBindTruck.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`解绑失败，${unBindTruck.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindTruck()
            }
            else if (unBindTruck.isResultStatus == 3) {
                ToastAndroid.showWithGravity('解绑失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUnBindTruck()
            }
        }
        /************************************ */

        /*changeDriverStatus*/
        if (changeDriverStatus.isExecStatus == 2) {
            if (changeDriverStatus.isResultStatus == 0) {
                let msg
                if (data.driverInfo.drive_status == 0) msg = '停用成功！'
                if (data.driverInfo.drive_status == 1) msg = '启用成功！'
                ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
                Actions.refresh({
                    rightType: 1,
                    truckStatus: nextProps.driverInfoReducer.data.driverInfo.drive_status,
                    onPressRight: () => this.props.changeDriverStatus({
                        requiredParam: {
                            userId: nextProps.loginReducer.data.user.uid,
                            driveId: nextProps.driverInfoReducer.data.driverInfo.id,
                            driveStatus: nextProps.driverInfoReducer.data.driverInfo.drive_status == 1 ? 0 : 1
                        }
                    })
                })
                this.props.resetChangeDriverStatus()
            }
            else if (changeDriverStatus.isResultStatus == 1) {
                ToastAndroid.showWithGravity('操作失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetChangeDriverStatus()
            }
            else if (changeDriverStatus.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`操作失败，${changeDriverStatus.failedMsg}！`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetChangeDriverStatus()
            }
            else if (changeDriverStatus.isResultStatus == 3) {
                ToastAndroid.showWithGravity('操作失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetChangeDriverStatus()
            }
        }
        /************************************ */

        /*updateDrivingImage*/
        if (updateDrivingImage.isExecStatus == 2) {
            if (updateDrivingImage.isResultStatus == 0) {
                ToastAndroid.showWithGravity('身份证正面照片更新成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.setPhoto(data.driverInfo.drive_image)
                this.props.resetUpdateDrivingImage()
            }
            else if (updateDrivingImage.isResultStatus == 1) {
                ToastAndroid.showWithGravity('身份证正面照片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImage()
            }
            else if (updateDrivingImage.isResultStatus == 2) {
                ToastAndroid.showWithGravity('身份证正面照片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImage()
            }
            else if (updateDrivingImage.isResultStatus == 3) {
                ToastAndroid.showWithGravity('身份证正面照片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImage()
            }
        }
        /************************************ */

        /*updateLicenseImage*/
        if (updateLicenseImage.isExecStatus == 2) {
            if (updateLicenseImage.isResultStatus == 0) {
                ToastAndroid.showWithGravity('驾驶证图片更新成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.setPhoto(data.driverInfo.license_image)
                this.props.resetUpdateLicenseImage()
            }
            else if (updateLicenseImage.isResultStatus == 1) {
                ToastAndroid.showWithGravity('驾驶证图片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImage()
            }
            else if (updateLicenseImage.isResultStatus == 2) {
                ToastAndroid.showWithGravity('驾驶证图片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImage()
            }
            else if (updateLicenseImage.isResultStatus == 3) {
                ToastAndroid.showWithGravity('驾驶证图片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImage()
            }
        }
        /************************************ */

        /*updateDriverInfo*/
        if (updateDriverInfo.isExecStatus == 2) {
            if (updateDriverInfo.isResultStatus == 0) {
                ToastAndroid.showWithGravity('修改成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDriverInfo()
            }
            else if (updateDriverInfo.isResultStatus == 1) {
                ToastAndroid.showWithGravity('修改失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDriverInfo()
            }
            else if (updateDriverInfo.isResultStatus == 2) {
                ToastAndroid.showWithGravity('修改失败', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDriverInfo()
            }
            else if (updateDriverInfo.isResultStatus == 3) {
                ToastAndroid.showWithGravity('修改失败', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDriverInfo()
            }
        }
        /************************************ */

        /*updateDriverImageRe*/
        if (updateDriverImageRe.isExecStatus == 2) {
            if (updateDriverImageRe.isResultStatus == 0) {
                ToastAndroid.showWithGravity('身份证背面照片更新成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.setPhoto(data.driverInfo.driver_image_re)
                this.props.resetUpdateDrivingImageRe()
            }
            else if (updateDriverImageRe.isResultStatus == 1) {
                ToastAndroid.showWithGravity('身份证背面照片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImageRe()
            }
            else if (updateDriverImageRe.isResultStatus == 2) {
                ToastAndroid.showWithGravity('身份证背面照片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImageRe()
            }
            else if (updateDriverImageRe.isResultStatus == 3) {
                ToastAndroid.showWithGravity('身份证背面照片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImageRe()
            }
        }
        /************************************ */


        /*updateLicenseImageOp*/
        if (updateLicenseImageOp.isExecStatus == 2) {
            if (updateLicenseImageOp.isResultStatus == 0) {
                ToastAndroid.showWithGravity('准驾证照片更新成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.setPhoto(data.driverInfo.op_license_image)
                this.props.resetUpdateLicenseImageOp()
            }
            else if (updateLicenseImageOp.isResultStatus == 1) {
                ToastAndroid.showWithGravity('准驾证照片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImageOp()
            }
            else if (updateLicenseImageOp.isResultStatus == 2) {
                ToastAndroid.showWithGravity('准驾证照片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImageOp()
            }
            else if (updateLicenseImageOp.isResultStatus == 3) {
                ToastAndroid.showWithGravity('准驾证照片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImageOp()
            }
        }
        /************************************ */

        /*updateDrivingImage*/
        if (updateDriverAvatarImage.isExecStatus == 2) {
            if (updateDriverAvatarImage.isResultStatus == 0) {
                ToastAndroid.showWithGravity('司机个人照片更新成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.setPhoto(data.driverInfo.driver_avatar_image)
                this.props.resetUpdateDriverAvatarImage()
            }
            else if (updateDriverAvatarImage.isResultStatus == 1) {
                ToastAndroid.showWithGravity('司机个人照片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDriverAvatarImage()
            }
            else if (updateDriverAvatarImage.isResultStatus == 2) {
                ToastAndroid.showWithGravity('司机个人照片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDriverAvatarImage()
            }
            else if (updateDriverAvatarImage.isResultStatus == 3) {
                ToastAndroid.showWithGravity('司机个人照片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDriverAvatarImage()
            }
        }
        /************************************ */
    }

    onPressSegment(index) {
        if (this.state.active != index)
            this.setState({ active: index })
    }

    updateDrivingImage(param) {
        this.props.updateDrivingImage({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                driverId: this.props.initParam.driverId
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

    updateLicenseImage(param) {
        this.props.updateLicenseImage({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                driverId: this.props.initParam.driverId
            },
            OptionalParam: {
                imageType: 2
            },
            putParam: {
                imageType: 3
            },
            postFileParam: {
                ...param.postFileParam,
                imageUrl: param.postFileParam.imageUrl.uri,
                key: "image"
            }
        })
    }

    updateDrivingImageRe(param) {
        this.props.updateDrivingImageRe({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                driverId: this.props.initParam.driverId
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

    updateLicenseImageOp(param) {
        this.props.updateLicenseImageOp({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                driverId: this.props.initParam.driverId
            },
            OptionalParam: {
                imageType: 2
            },
            putParam: {
                imageType: 4
            },
            postFileParam: {
                ...param.postFileParam,
                imageUrl: param.postFileParam.imageUrl.uri,
                key: "image"
            }
        })
    }

    updateDriverAvatarImage(param) {

        this.props.updateDriverAvatarImage({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                driverId: this.props.initParam.driverId
            },
            OptionalParam: {
                imageType: 2
            },
            putParam: {
                imageType: 5
            },
            postFileParam: {
                ...param.postFileParam,
                imageUrl: param.postFileParam.imageUrl.uri,
                key: "image"
            }
        })
    }

    onPressUpdateDrivingImageRe() {
        this.launchCamera(this.updateDrivingImageRe)
    }

    onPressUpdateLicenseImageOp() {
        this.launchCamera(this.updateLicenseImageOp)
    }

    onPressUpdateDriverAvatarImage() {
        this.launchCamera(this.updateDriverAvatarImage)
    }

    onShowDrivingImageRe() {
        this.props.setPhoto(this.props.driverInfoReducer.data.driverInfo.driver_image_re)
        RouterDirection.singlePhotoView(this.props.parent)({
            initParam: {
                onUpdateImage: () => this.launchCamera(this.updateDrivingImageRe)
            }
        })
    }

    onShowLicenseImageOp() {
        this.props.setPhoto(this.props.driverInfoReducer.data.driverInfo.op_license_image)
        RouterDirection.singlePhotoView(this.props.parent)({
            initParam: {
                onUpdateImage: () => this.launchCamera(this.updateLicenseImageOp)
            }
        })
    }

    onShowDriverAvatarImage() {
        this.props.setPhoto(this.props.driverInfoReducer.data.driverInfo.driver_avatar_image)
        RouterDirection.singlePhotoView(this.props.parent)({
            initParam: {
                onUpdateImage: () => this.launchCamera(this.updateDriverAvatarImage)
            }
        })
    }

    onShowDrivingImage() {
        this.props.setPhoto(this.props.driverInfoReducer.data.driverInfo.drive_image)
        RouterDirection.singlePhotoView(this.props.parent)({
            initParam: {
                onUpdateImage: () => this.launchCamera(this.updateDrivingImage)
            }
        })
    }

    onShowLicenseImage() {
        this.props.setPhoto(this.props.driverInfoReducer.data.driverInfo.license_image)
        RouterDirection.singlePhotoView(this.props.parent)({
            initParam: {
                onUpdateImage: () => this.launchCamera(this.updateLicenseImage)
            }
        })
    }

    onPressUpdateDrivingImage() {
        this.launchCamera(this.updateDrivingImage)
    }

    onPressUpdateLicenseImage() {
        this.launchCamera(this.updateLicenseImage)
    }

    launchCamera(onGetPhoto) {
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

    bindTruck(param) {
        this.props.bindTruck({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: param.id,
                driverId: this.props.driverInfoReducer.data.driverInfo.id
            },
            truck_id: param.id,
            truck_num: param.value
        })
    }

    unBindTruck() {
        this.props.unBindTruck({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.driverInfoReducer.data.driverInfo.truck_id,
                driverId: this.props.driverInfoReducer.data.driverInfo.id
            }
        })
    }

    updateDriverInfo() {
        let param = {
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.initParam.driverId
            },
            putParam: {
                driveName: this.props.driverInfoReducer.data.driverInfo.drive_name,
                companyId: this.props.driverInfoReducer.data.driverInfo.company_id,
                gender: this.props.driverInfoReducer.data.driverInfo.gender
            }
        }
        if (this.props.driverInfoReducer.data.driverInfo.license_date) param.putParam.licenseDate = this.props.driverInfoReducer.data.driverInfo.license_date
        if (this.props.driverInfoReducer.data.driverInfo.address) param.putParam.address = this.props.driverInfoReducer.data.driverInfo.address
        if (this.props.driverInfoReducer.data.driverInfo.license_type) param.putParam.licenseType = this.props.driverInfoReducer.data.driverInfo.license_type
        if (this.props.driverInfoReducer.data.driverInfo.id_number) param.putParam.idNumber = this.props.driverInfoReducer.data.driverInfo.id_number
        if (this.props.driverInfoReducer.data.driverInfo.mobile) param.putParam.mobile = this.props.driverInfoReducer.data.driverInfo.mobile
        if (this.props.driverInfoReducer.data.driverInfo.sib_tel) param.putParam.sibTel = this.props.driverInfoReducer.data.driverInfo.sib_tel
        if (this.props.driverInfoReducer.data.driverInfo.remark) param.putParam.remark = this.props.driverInfoReducer.data.driverInfo.remark

        this.props.updateDriverInfo(param)
    }

    renderDriverInfoEnable() {
        let gender
        if (this.props.driverInfoReducer.data.driverInfo.gender == 0) gender = '女'
        if (this.props.driverInfoReducer.data.driverInfo.gender == 1) gender = '男'
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <TagTextBox
                        title='姓名：'
                        leftTag={10}
                        /*verifications={[{
                            type: 'isLength',
                            arguments: [0, 5],
                            message: '长度0-5位'
                        }]}
                        onRequire={(flag) => this.setState({ driverNameValidater: flag })}*/
                        companyType={this.props.driverInfoReducer.data.driverInfo.operate_type ? this.props.driverInfoReducer.data.driverInfo.operate_type : 10}
                        isDisable={this.props.driverInfoReducer.data.driverInfo.drive_status == 0}
                        value={this.props.driverInfoReducer.data.driverInfo.drive_name ? this.props.driverInfoReducer.data.driverInfo.drive_name : ''}
                        onValueChange={(param) => this.props.changeDriverInfoField({ drive_name: param })}
                        placeholder='请输入姓名'
                    />
                    <Select
                        title='所属公司：'
                        value={this.props.driverInfoReducer.data.driverInfo.company_name ? this.props.driverInfoReducer.data.driverInfo.company_name : '请选择'}
                        showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                        onValueChange={(param) => this.props.changeDriverInfoField({ company_id: param.id, company_name: param.value, operate_type: param.operateType })}
                    />
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 12 }}>主驾货车：{this.props.driverInfoReducer.data.driverInfo.truck_num ? this.props.driverInfoReducer.data.driverInfo.truck_num : '未绑定货车'}</Text>
                        </View>
                        {!this.props.driverInfoReducer.data.driverInfo.truck_num && !this.props.driverInfoReducer.data.driverInfo.vice && <TouchableNativeFeedback onPress={() => RouterDirection.selectTruck(this.props.parent)({ initParam: { type: 1 }, filterType: 1, onSelect: (param) => this.bindTruck(param) })} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>绑定</Text>
                            </View>
                        </TouchableNativeFeedback>}
                        {!!this.props.driverInfoReducer.data.driverInfo.truck_num && !this.props.driverInfoReducer.data.driverInfo.vice && <TouchableNativeFeedback onPress={this.unBindTruck} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ backgroundColor: styleColor, height: 16, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 0.5, borderColor: '#fbfbfb' }}>
                                <Text style={{ fontSize: 10, color: '#fff' }}>解绑</Text>
                            </View>
                        </TouchableNativeFeedback>}
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 12 }}>副驾货车：{this.props.driverInfoReducer.data.driverInfo.vice ? this.props.driverInfoReducer.data.driverInfo.vice : '未绑定副驾货车'}</Text>
                        </View>
                    </View>
                    <CheckBox
                        listTitle='选择性别'
                        value={gender ? gender : '请选择'}
                        itemList={[{ id: 1, value: '男' }, { id: 0, value: '女' }]}
                        onCheck={(param) => this.props.changeDriverInfoField({ gender: param.id })} />
                    {/* <TextBox
                        title='联系电话：'
                        value={this.props.driverInfoReducer.data.driverInfo.mobile ? this.props.driverInfoReducer.data.driverInfo.mobile : ''}
                        onValueChange={(param) => this.props.changeDriverInfoField({ mobile: param })}
                        placeholder='请输入联系电话'
                    /> */}
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 12 }}>联系电话：{this.props.driverInfoReducer.data.driverInfo.mobile ? this.props.driverInfoReducer.data.driverInfo.mobile : ''}</Text>
                        </View>
                    </View>
                    <TextBox
                        title='身份证：'
                        /*verifications={[{
                            type: 'isCardNo',
                            message: '不是身份证号码'
                        }]}
                        onRequire={(flag) => this.setState({ cardNoValidater: flag })}*/
                        value={this.props.driverInfoReducer.data.driverInfo.id_number ? this.props.driverInfoReducer.data.driverInfo.id_number : ''}
                        onValueChange={(param) => this.props.changeDriverInfoField({ id_number: param })}
                        placeholder='请输入身份证'
                    />
                    <TextBox
                        title='家庭住址：'
                        /*verifications={[{
                            type: 'isLength',
                            arguments: [0, 100],
                            message: '长度0-100位'
                        }]}
                        onRequire={(flag) => this.setState({ addressValidater: flag })}*/
                        value={this.props.driverInfoReducer.data.driverInfo.address ? this.props.driverInfoReducer.data.driverInfo.address : ''}
                        onValueChange={(param) => this.props.changeDriverInfoField({ address: param })}
                        placeholder='请输入家庭住址'
                    />
                    <TextBox
                        title='紧急联系人电话：'
                        /*verifications={[{
                            type: 'isPhone',
                            message: '不是手机号码'
                        }]}
                        onRequire={(flag) => this.setState({ sibTelValidater: flag })}*/
                        value={this.props.driverInfoReducer.data.driverInfo.sib_tel ? this.props.driverInfoReducer.data.driverInfo.sib_tel : ''}
                        onValueChange={(param) => this.props.changeDriverInfoField({ sib_tel: param })}
                        placeholder='请输入紧急联系人电话'
                    />
                    <TagSelect
                        title='驾证类别：'
                        value={this.props.driverInfoReducer.data.driverInfo.license_type ? DrivingLicenseTypeList.find((item) => item.id == this.props.driverInfoReducer.data.driverInfo.license_type).value : '请选择'}
                        showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                        isCheck={this.props.driverInfoReducer.data.driverInfo.license_date && ((Date.parse(new Date(this.props.driverInfoReducer.data.driverInfo.license_date))) < (Date.parse(new Date()) + 30 * 24 * 60 * 60 * 1000))}
                        onValueChange={(param) => this.props.changeDriverInfoField({ license_type: param.id })}
                        defaultValue={'请选择'}
                    />
                    <DateTimePicker
                        value={this.props.driverInfoReducer.data.driverInfo.license_date ? this.props.driverInfoReducer.data.driverInfo.license_date : '请选择'}
                        title='驾驶证到期时间：'
                        onValueChange={(param) => this.props.changeDriverInfoField({ license_date: param })}
                    />
                    <RichTextBox
                        title='备注：'
                        /*verifications={[{
                            type: 'isLength',
                            arguments: [0, 100],
                            message: '长度0-100位'
                        }]}*/
                        value={this.props.driverInfoReducer.data.driverInfo.remark ? this.props.driverInfoReducer.data.driverInfo.remark : ''}
                        onValueChange={(param) => this.props.changeDriverInfoField({ remark: param })}
                        showRichText={RouterDirection.richText(this.props.parent)}
                        defaultValue={'请填写'}
                    />
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                        <Button
                            full
                            onPress={this.updateDriverInfo}
                            /*disabled={!(
                                this.state.telValidater &&
                                this.state.sibTelValidater &&
                                this.state.driverNameValidater &&
                                this.state.addressValidater &&
                                this.state.cardNoValidater
                            )}*/
                            style={{
                                backgroundColor: (styleColor)
                                /* this.state.telValidater &&
                                 this.state.sibTelValidater &&
                                 this.state.driverNameValidater &&
                                 this.state.addressValidater &&
                                 this.state.cardNoValidater
                             ) ? styleColor : '#888888'*/
                            }}>
                            <Text style={{ color: '#fff' }}>保存信息</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        )
    }


    renderDriverInfoDisable() {
        let gender
        if (this.props.driverInfoReducer.data.driverInfo.gender == 0) gender = '女'
        if (this.props.driverInfoReducer.data.driverInfo.gender == 1) gender = '男'
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <TagTextBox
                        title='姓名：'
                        leftTag={10}
                        /*verifications={[{
                            type: 'isLength',
                            arguments: [0, 5],
                            message: '长度0-5位'
                        }]}
                        onRequire={(flag) => this.setState({ driverNameValidater: flag })}*/
                        companyType={this.props.driverInfoReducer.data.driverInfo.operate_type ? this.props.driverInfoReducer.data.driverInfo.operate_type : 10}
                        isDisable={this.props.driverInfoReducer.data.driverInfo.drive_status == 0}
                        value={this.props.driverInfoReducer.data.driverInfo.drive_name ? this.props.driverInfoReducer.data.driverInfo.drive_name : ''}
                        onValueChange={(param) => this.props.changeDriverInfoField({ drive_name: param })}
                        placeholder='请输入姓名'
                    />
                    <Select
                        title='所属公司：'
                        value={this.props.driverInfoReducer.data.driverInfo.company_name ? this.props.driverInfoReducer.data.driverInfo.company_name : '请选择'}
                        showList={(param) => RouterDirection.selectCompanyType(this.props.parent)({ router: RouterDirection.selectCompany(this.props.parent), ...param })}
                        onValueChange={(param) => this.props.changeDriverInfoField({ company_id: param.id, company_name: param.value, operate_type: param.operateType })}
                    />
                    <CheckBox
                        listTitle='选择性别'
                        value={gender ? gender : '请选择'}
                        itemList={[{ id: 1, value: '男' }, { id: 0, value: '女' }]}
                        onCheck={(param) => this.props.changeDriverInfoField({ gender: param.id })} />
                    {/* <TextBox
                        title='联系电话：'
                        value={this.props.driverInfoReducer.data.driverInfo.mobile ? this.props.driverInfoReducer.data.driverInfo.mobile : ''}
                        onValueChange={(param) => this.props.changeDriverInfoField({ mobile: param })}
                        placeholder='请输入联系电话'
                    /> */}
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#dddddd', paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 12 }}>联系电话：{this.props.driverInfoReducer.data.driverInfo.mobile ? this.props.driverInfoReducer.data.driverInfo.mobile : ''}</Text>
                        </View>
                    </View>
                    <TextBox
                        title='身份证：'
                        value={this.props.driverInfoReducer.data.driverInfo.id_number ? this.props.driverInfoReducer.data.driverInfo.id_number : ''}
                        onValueChange={(param) => this.props.changeDriverInfoField({ id_number: param })}
                        /*verifications={[{
                            type: 'isCardNo',
                            message: '不是身份证号码'
                        }]}
                        onRequire={(flag) => this.setState({ cardNoValidater: flag })}*/
                        placeholder='请输入身份证'
                    />
                    <TextBox
                        title='家庭住址：'
                        value={this.props.driverInfoReducer.data.driverInfo.address ? this.props.driverInfoReducer.data.driverInfo.address : ''}
                        /*verifications={[{
                            type: 'isLength',
                            arguments: [0, 100],
                            message: '长度0-100位'
                        }]}
                        onRequire={(flag) => this.setState({ addressValidater: flag })}*/
                        onValueChange={(param) => this.props.changeDriverInfoField({ address: param })}
                        placeholder='请输入家庭住址'
                    />
                    <TextBox
                        title='紧急联系人电话：'
                        value={this.props.driverInfoReducer.data.driverInfo.sib_tel ? this.props.driverInfoReducer.data.driverInfo.sib_tel : ''}
                        onValueChange={(param) => this.props.changeDriverInfoField({ sib_tel: param })}
                        /*verifications={[{
                            type: 'isPhone',
                            message: '不是手机号码'
                        }]}
                        onRequire={(flag) => this.setState({ sibTelValidater: flag })}*/
                        placeholder='请输入紧急联系人电话'
                    />
                    <TagSelect
                        title='驾证类别：'
                        value={this.props.driverInfoReducer.data.driverInfo.license_type ? DrivingLicenseTypeList.find((item) => item.id == this.props.driverInfoReducer.data.driverInfo.license_type).value : '请选择'}
                        showList={RouterDirection.selectDrivingLicenseType(this.props.parent)}
                        isCheck={this.props.driverInfoReducer.data.driverInfo.license_date && ((Date.parse(new Date(this.props.driverInfoReducer.data.driverInfo.license_date))) < (Date.parse(new Date()) + 30 * 24 * 60 * 60 * 1000))}
                        onValueChange={(param) => this.props.changeDriverInfoField({ license_type: param.id })}
                        defaultValue={'请选择'}
                    />
                    <DateTimePicker
                        value={this.props.driverInfoReducer.data.driverInfo.license_date ? this.props.driverInfoReducer.data.driverInfo.license_date : '请选择'}
                        title='驾驶证到期时间：'
                        onValueChange={(param) => this.props.changeDriverInfoField({ license_date: param })}
                    />
                    <RichTextBox
                        title='备注：'
                        value={this.props.driverInfoReducer.data.driverInfo.remark ? this.props.driverInfoReducer.data.driverInfo.remark : '请填写'}
                        /*verifications={[{
                            type: 'isLength',
                            arguments: [0, 100],
                            message: '长度0-100位'
                        }]}*/
                        onValueChange={(param) => this.props.changeDriverInfoField({ remark: param })}
                        showRichText={RouterDirection.richText(this.props.parent)}
                    />
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                        <Button
                            full
                            onPress={this.updateDriverInfo}
                            /* disabled={!(
                                 this.state.telValidater &&
                                 this.state.sibTelValidater &&
                                 this.state.driverNameValidater &&
                                 this.state.addressValidater &&
                                 this.state.cardNoValidater
                             )}*/
                            style={{
                                backgroundColor: (styleColor)
                                /*  this.state.telValidater &&
                                 this.state.sibTelValidater &&
                                 this.state.driverNameValidater &&
                                 this.state.addressValidater &&
                                 this.state.cardNoValidater
                             ) ? styleColor : '#888888'*/
                            }}>
                            <Text style={{ color: '#fff' }}>保存信息</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        )
    }

    renderDriverPhoto() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    {!this.props.driverInfoReducer.data.driverInfo.drive_image ?
                        <Camera title='上传身份证正面' onGetPhoto={this.updateDrivingImage} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} /> :
                        <PanelSingleItem
                            onUpdateImage={this.onPressUpdateDrivingImage}
                            onShowPhoto={this.onShowDrivingImage}
                            title='身份证正面'
                            imageUrl={this.props.driverInfoReducer.data.driverInfo.drive_image}
                            containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />}
                    {!this.props.driverInfoReducer.data.driverInfo.license_image ?
                        <Camera title='上传行驶证照片' onGetPhoto={this.updateLicenseImage} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} /> :
                        <PanelSingleItem
                            title='行驶证'
                            onUpdateImage={this.onPressUpdateLicenseImage}
                            onShowPhoto={this.onShowLicenseImage}
                            imageUrl={this.props.driverInfoReducer.data.driverInfo.license_image}
                            containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {!this.props.driverInfoReducer.data.driverInfo.driver_image_re ?
                        <Camera title='上传身份证背面' onGetPhoto={this.updateDrivingImageRe} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} /> :
                        <PanelSingleItem
                            onUpdateImage={this.onPressUpdateDrivingImageRe}
                            onShowPhoto={this.onShowDrivingImageRe}
                            title='身份证背面'
                            imageUrl={this.props.driverInfoReducer.data.driverInfo.driver_image_re}
                            containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />}
                    {!this.props.driverInfoReducer.data.driverInfo.op_license_image ?
                        <Camera title='上传准驾证照片' onGetPhoto={this.updateLicenseImageOp} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} /> :
                        <PanelSingleItem
                            title='准驾证'
                            onUpdateImage={this.onPressUpdateLicenseImageOp}
                            onShowPhoto={this.onShowLicenseImageOp}
                            imageUrl={this.props.driverInfoReducer.data.driverInfo.op_license_image}
                            containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {!this.props.driverInfoReducer.data.driverInfo.driver_avatar_image ?
                        <Camera title='上传个人照片' onGetPhoto={this.updateDriverAvatarImage} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} /> :
                        <PanelSingleItem
                            onUpdateImage={this.onPressUpdateDriverAvatarImage}
                            onShowPhoto={this.onShowDriverAvatarImage}
                            title='个人照片'
                            imageUrl={this.props.driverInfoReducer.data.driverInfo.driver_avatar_image}
                            containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />}
                </View>
            </View>
        )
    }

    renderDriverRecord() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.driverInfoReducer.data.recordList}
                renderItem={({ item }) => <View style={{ borderColor: '#ddd', borderBottomWidth: 0.5, paddingHorizontal: 10 }}>
                    <RecordListItem content={item.content} name={item.name} time={new Date(item.timez).toLocaleString()} />
                </View>}
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', borderWidth: 1, borderColor: styleColor }}>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: styleColor, justifyContent: 'center', backgroundColor: this.state.active == 0 ? styleColor : '#fff' }} onPress={() => this.onPressSegment(0)}>
                        <Text style={{ color: this.state.active == 0 ? '#fff' : styleColor }}>基本信息</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: styleColor, justifyContent: 'center', backgroundColor: this.state.active == 1 ? styleColor : '#fff' }} onPress={() => this.onPressSegment(1)}>
                        <Text style={{ color: this.state.active == 1 ? '#fff' : styleColor }}>照片</Text>
                    </Button>
                    <Button small style={{ flex: 1, borderRadius: 0, justifyContent: 'center', backgroundColor: this.state.active == 2 ? styleColor : '#fff' }} onPress={() => this.onPressSegment(2)}>
                        <Text style={{ color: this.state.active == 2 ? '#fff' : styleColor }}>记录</Text>
                    </Button>
                </View>
                <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: styleColor, flex: 1 }}>
                    {this.state.active == 0 && this.props.driverInfoReducer.data.driverInfo.drive_status == 1 && this.renderDriverInfoEnable()}
                    {this.state.active == 0 && this.props.driverInfoReducer.data.driverInfo.drive_status == 0 && this.renderDriverInfoDisable()}
                    {this.state.active == 1 && this.renderDriverPhoto()}
                    {this.state.active == 2 && this.renderDriverRecord()}
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        driverInfoReducer: state.driverInfoReducer,
        loginReducer: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDriverInfo: (param) => {
        dispatch(getDriverInfo(param))
    },
    getDriverRecord: (param) => {
        dispatch(getDriverRecord(param))
    },
    resetGetDriverInfo: () => {
        dispatch(resetGetDriverInfo())
    },
    resetGetDriverRecord: () => {
        dispatch(resetGetDriverRecord())
    },
    updateDriverInfo: (param) => {
        dispatch(updateDriverInfo(param))
    },
    resetUpdateDriverInfo: () => {
        dispatch(resetUpdateDriverInfo())
    },
    changeDriverStatus: (param) => {
        dispatch(changeDriverStatus(param))
    },
    resetChangeDriverStatus: () => {
        dispatch(resetChangeDriverStatus())
    },
    bindTruck: (param) => {
        dispatch(bindTruck(param))
    },
    unBindTruck: (param) => {
        dispatch(unBindTruck(param))
    },
    resetBindTruck: () => {
        dispatch(resetBindTruck())
    },
    resetUnBindTruck: () => {
        dispatch(resetUnBindTruck())
    },
    updateDrivingImage: (param) => {
        dispatch(updateDrivingImage(param))
    },
    updateLicenseImage: (param) => {
        dispatch(updateLicenseImage(param))
    },
    resetUpdateDrivingImage: () => {
        dispatch(resetUpdateDrivingImage())
    },
    resetUpdateLicenseImage: () => {
        dispatch(resetUpdateLicenseImage())
    },
    setPhoto: (param) => {
        dispatch(setPhoto(param))
    },
    changeDriverInfoField: (param) => {
        dispatch(changeDriverInfoField(param))
    },
    updateDrivingImageRe: (param) => {
        dispatch(updateDrivingImageRe(param))
    },
    resetUpdateDrivingImageRe: () => {
        dispatch(resetUpdateDrivingImageRe())
    },
    updateLicenseImageOp: (param) => {
        dispatch(updateLicenseImageOp(param))
    },
    resetUpdateLicenseImageOp: () => {
        dispatch(resetUpdateLicenseImageOp())
    },
    updateDriverAvatarImage: (param) => {
        dispatch(updateDriverAvatarImage(param))
    },
    resetUpdateDriverAvatarImage: () => {
        dispatch(resetUpdateDriverAvatarImage())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DriverInfo)