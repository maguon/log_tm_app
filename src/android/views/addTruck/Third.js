import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableNativeFeedback,
    ToastAndroid
} from 'react-native'
import { Button, Icon } from 'native-base'
import StepIndicator from '../../components/StepIndicator'
import PanelSingleItem from '../../components/camera/PanelSingleItem'
import PanelCustomItem from '../../components/camera/PanelCustomItem'
import { connect } from 'react-redux'
import * as RouterDirection from '../../../util/RouterDirection'
import Camera from '../../components/camera/Camera'
import {
    updateDrivingImage,
    updateLicenseImage,
    createTruckImage,
    resetUpdateDrivingImage,
    resetUpdateLicenseImage,
    resetCreateTruckImage,
    delTruckImage,
    resetDelTruckImage
} from '../../../actions/AddTruckThirdAction'
import { setPhoto } from '../../../actions/SinglePhotoViewAction'
import { initPhotoList, delPhoto } from '../../../actions/CustomPhotoViewAction'
import { Actions } from 'react-native-router-flux'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
import globalStyles, { styleColor } from '../../GlobalStyles'

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


class Third extends Component {
    constructor(props) {
        super(props)
        this.updateDrivingImage = this.updateDrivingImage.bind(this)
        this.updateLicenseImage = this.updateLicenseImage.bind(this)
        this.renderImageList = this.renderImageList.bind(this)
        this.createTruckImage = this.createTruckImage.bind(this)
        this.onPressNextStep = this.onPressNextStep.bind(this)
        this.onShowDrivingImage = this.onShowDrivingImage.bind(this)
        this.onShowLicenseImage = this.onShowLicenseImage.bind(this)
        this.onShowTruckImage = this.onShowTruckImage.bind(this)
        this.onPressUpdateDrivingImage = this.onPressUpdateDrivingImage.bind(this)
        this.onPressUpdateLicenseImage = this.onPressUpdateLicenseImage.bind(this)
        this.launchCamera = this.launchCamera.bind(this)
        this.openPicker = this.openPicker.bind(this)
        this.delTruckImage = this.delTruckImage.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const { updateDrivingImage, updateLicenseImage, createTruckImage,delTruckImage, data } = nextProps.addTruckThirdReducer
        /*updateDrivingImage*/
        if (updateDrivingImage.isExecStatus == 2) {
            if (updateDrivingImage.isResultStatus == 0) {
                this.props.setPhoto(data.drivingImage)
                ToastAndroid.showWithGravity('上传行驶证照片成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImage()
            }
            else if (updateDrivingImage.isResultStatus == 1) {
                ToastAndroid.showWithGravity('上传行驶证照片失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)                
                this.props.resetUpdateDrivingImage()
            }
            else if (updateDrivingImage.isResultStatus == 2) {
                ToastAndroid.showWithGravity('上传行驶证照片失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImage()
            }
            else if (updateDrivingImage.isResultStatus == 3) {
                ToastAndroid.showWithGravity('上传行驶证照片失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)                
                this.props.resetUpdateDrivingImage()
            }
        }
        /************************************ */

        /*updateLicenseImage*/
        if (updateLicenseImage.isExecStatus == 2) {
            if (updateLicenseImage.isResultStatus == 0) {
                this.props.setPhoto(data.licenseImage)
                ToastAndroid.showWithGravity('上传营运证照片成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImage()
            }
            else if (updateLicenseImage.isResultStatus == 1) {
                ToastAndroid.showWithGravity('上传营运证照片失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImage()
            }
            else if (updateLicenseImage.isResultStatus == 2) {
                ToastAndroid.showWithGravity('上传营运证照片失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImage()
            }
            else if (updateLicenseImage.isResultStatus == 3) {
                ToastAndroid.showWithGravity('上传营运证照片失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateLicenseImage()
            }
        }
        /************************************ */

        /*createTruckImage*/
        if (createTruckImage.isExecStatus == 2) {
            if (createTruckImage.isResultStatus == 0) {
                ToastAndroid.showWithGravity('上传车辆照片成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateTruckImage()
            }
            else if (createTruckImage.isResultStatus == 1) {
                ToastAndroid.showWithGravity('上传车辆照片失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetCreateTruckImage()
            }
            else if (createTruckImage.isResultStatus == 2) {
                ToastAndroid.showWithGravity('上传车辆照片失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)       
                this.props.resetCreateTruckImage()
            }
            else if (createTruckImage.isResultStatus == 3) {
                ToastAndroid.showWithGravity('上传车辆照片失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)                
                this.props.resetCreateTruckImage()
            }
        }
        /************************************ */



        /*delTruckImage*/
        if (delTruckImage.isExecStatus == 2) {
            if (delTruckImage.isResultStatus == 0) {
                this.props.initPhotoList(data.truckImageList)
                ToastAndroid.showWithGravity('删除车辆照片成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetDelTruckImage()
            }
            else if (delTruckImage.isResultStatus == 1) {
                ToastAndroid.showWithGravity('删除车辆照片失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)                
                this.props.resetDelTruckImage()
            }
            else if (delTruckImage.isResultStatus == 2) {
                ToastAndroid.showWithGravity('删除车辆照片失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)                
                this.props.resetDelTruckImage()
            }
            else if (delTruckImage.isResultStatus == 3) {
                ToastAndroid.showWithGravity('删除车辆照片失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)                
                this.props.resetDelTruckImage()
            }
        }
        /************************************ */
    }

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

    createTruckImage(param) {
        this.props.createTruckImage({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                truckId: this.props.initParam.truckId,
                truckCode: this.props.initParam.truckCode
            },
            OptionalParam: {
                imageType: 2
            },
            postParam: {
                username: this.props.loginReducer.data.user.mobile,
                userId: this.props.loginReducer.data.user.uid,
                userType: this.props.loginReducer.data.user.type,
            },
            postFileParam: {
                ...param.postFileParam,
                imageUrl: param.postFileParam.imageUrl.uri,
                key: "image"
            }
        })
    }

    onPressNextStep() {
        Actions.addTruckFourth({ initParam: this.props.initParam })
    }

    onShowDrivingImage() {
        this.props.setPhoto(this.props.addTruckThirdReducer.data.drivingImage)
        RouterDirection.singlePhotoView(this.props.parent)({
            initParam: {
                onUpdateImage: () => this.launchCamera(this.updateDrivingImage)
            }
        })
    }

    onShowLicenseImage() {
        this.props.setPhoto(this.props.addTruckThirdReducer.data.licenseImage)
        RouterDirection.singlePhotoView(this.props.parent)({
            initParam: {
                onUpdateImage: () => this.launchCamera(this.updateLicenseImage)
            }
        })

    }

    onShowTruckImage(index) {
        this.props.initPhotoList(this.props.addTruckThirdReducer.data.truckImageList)
        RouterDirection.customPhotoView(this.props.parent)({
            initParam: {
                onDelImage: this.delTruckImage,
                index
            }
        })
    }

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

    onPressUpdateDrivingImage() {
        this.launchCamera(this.updateDrivingImage)
    }

    onPressUpdateLicenseImage() {
        this.launchCamera(this.updateLicenseImage)
    }

    delTruckImage(url) {
        this.props.delTruckImage({
            requiredParam: {
                userId: this.props.loginReducer.data.user.uid,
                url: url,
                truckNum: this.props.initParam.truckCode
            }
        })
        //console.log(url)
    }

    //requiredParam

    renderImageList() {
        let truckImageList = [...this.props.addTruckThirdReducer.data.truckImageList]
       // console.log(truckImageList)
        const imageListHead = <View key={'w'} style={{ flexDirection: 'row' }}>
            {!this.props.addTruckThirdReducer.data.drivingImage ?
                <Camera title='上传行驶证照片' onGetPhoto={this.updateDrivingImage} /> :
                <PanelSingleItem onUpdateImage={this.onPressUpdateDrivingImage} onShowPhoto={this.onShowDrivingImage} title='行驶证' imageUrl={this.props.addTruckThirdReducer.data.drivingImage} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />}
            {!this.props.addTruckThirdReducer.data.licenseImage ?
                <Camera title='上传营运证照片' onGetPhoto={this.updateLicenseImage} /> :
                <PanelSingleItem title='营运证' onUpdateImage={this.onPressUpdateLicenseImage} onShowPhoto={this.onShowLicenseImage} imageUrl={this.props.addTruckThirdReducer.data.licenseImage} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />}
        </View>

        let imageListFoot
        if (truckImageList.length % 2 == 0) {
            imageListFoot = <View key={'f'} style={{ flexDirection: 'row' }}>
                <Camera onGetPhoto={this.createTruckImage} title='上传车辆照片' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
            </View>
        } else {
            const lastImage = truckImageList.pop()
            imageListFoot = <View key={'f'} style={{ flexDirection: 'row' }}>
                <PanelCustomItem onShowPhoto={() => this.onShowTruckImage(truckImageList.length)} imageUrl={lastImage} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                <Camera onGetPhoto={this.createTruckImage} title='上传车辆照片' containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
            </View>
        }

        let imageBody = []
        for (let i = 0; i < truckImageList.length; i += 2) {
            const viewItem = (<View key={i} style={{ flexDirection: 'row' }}>
                <PanelCustomItem onShowPhoto={() => this.onShowTruckImage(i)} imageUrl={truckImageList[i]} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                <PanelCustomItem onShowPhoto={() => this.onShowTruckImage(i + 1)} imageUrl={truckImageList[i + 1]} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />
            </View>)
            imageBody.push(viewItem)
        }
        return [imageListHead, ...imageBody, imageListFoot]
    }

    render() {
        this.props.addTruckThirdReducer
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator
                    stepList={[{ step: '1', title: '基本信息' },
                    { step: '2', title: '关联信息' },
                    { step: '3', title: '上传照片' },
                    { step: '4', title: '车保信息' }]}
                    current={2} />
                <FlatList showsVerticalScrollIndicator={false}
                    data={this.renderImageList()}
                    renderItem={({ item }) => item}
                />
                <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                    <Button
                        full
                        onPress={this.onPressNextStep}
                        style={{ backgroundColor: styleColor }}>
                        <Text style={{ color: '#fff' }}>下一步</Text>
                    </Button>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
        addTruckThirdReducer: state.addTruckThirdReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateDrivingImage: (param) => {
        dispatch(updateDrivingImage(param))
    },
    updateLicenseImage: (param) => {
        dispatch(updateLicenseImage(param))
    },
    createTruckImage: (param) => {
        dispatch(createTruckImage(param))
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
    setPhoto: (param) => {
        dispatch(setPhoto(param))
    },
    delTruckImage: (param) => {
        dispatch(delTruckImage(param))
    },
    resetDelTruckImage: () => {
        dispatch(resetDelTruckImage())
    },
    initPhotoList: (param) => {
        dispatch(initPhotoList(param))
    },
    delPhoto: (param) => {
        dispatch(delPhoto(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Third)