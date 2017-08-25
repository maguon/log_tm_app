import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    Dimensions,
    StatusBar,
    ToastAndroid
} from 'react-native'
import { Button, Icon } from 'native-base'
import StepIndicator from '../../components/StepIndicator'
import PanelSingleItem from '../../components/camera/PanelSingleItem'
import PanelCustomItem from '../../components/camera/PanelCustomItem'
import Camera from '../../components/camera/Camera'
import { connect } from 'react-redux'
import {
    updateDrivingImage,
    updateLicenseImage,
    resetUpdateDrivingImage,
    resetUpdateLicenseImage
} from '../../../actions/AddDriverThirdAction'
import { setPhoto } from '../../../actions/SinglePhotoViewAction'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
import * as RouterDirection from '../../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'

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

const window = Dimensions.get('window')
class Third extends Component {
    constructor(props) {
        super(props)
        this.updateDrivingImage=this.updateDrivingImage.bind(this)
        this.updateLicenseImage=this.updateLicenseImage.bind(this)
        this.onShowDrivingImage=this.onShowDrivingImage.bind(this)
        this.onShowLicenseImage=this.onShowLicenseImage.bind(this)
        this.launchCamera=this.launchCamera.bind(this)
        this.openPicker=this.openPicker.bind(this)    
        this.onPressUpdateDrivingImage=this.onPressUpdateDrivingImage.bind(this)
        this.onPressUpdateLicenseImage=this.onPressUpdateLicenseImage.bind(this)
    }

    static defaultProps = {
        initParam: {
            driverId: 117
        }
    }

    componentWillReceiveProps(nextProps) {
        const { updateDrivingImage, updateLicenseImage,data } = nextProps.addDriverThirdReducer
        /*updateDrivingImage*/
        if (updateDrivingImage.isExecStatus == 2) {
            if (updateDrivingImage.isResultStatus == 0) {
                this.props.setPhoto(data.drivingImage)
                ToastAndroid.showWithGravity('身份证图片更新成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImage()
            }
            else if (updateDrivingImage.isResultStatus == 1) {
                ToastAndroid.showWithGravity('身份证图片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImage()   
            }
            else if (updateDrivingImage.isResultStatus == 2) {
                ToastAndroid.showWithGravity('身份证图片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImage()             
            }
            else if (updateDrivingImage.isResultStatus == 3) {
                ToastAndroid.showWithGravity('身份证图片更新失败！', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetUpdateDrivingImage()                
            }
        }
        /************************************ */

        /*updateLicenseImage*/
        if (updateLicenseImage.isExecStatus == 2) {
            if (updateLicenseImage.isResultStatus == 0) {
                this.props.setPhoto(data.licenseImage)
                ToastAndroid.showWithGravity('驾驶证图片更新成功！', ToastAndroid.SHORT, ToastAndroid.CENTER)
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
    }

    updateDrivingImage(param){
        this.props.updateDrivingImage({
            requiredParam: {
                userId: this.props.userReducer.user.userId,
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
                key: "image"
            }
        })
    }

    updateLicenseImage(param){
        this.props.updateLicenseImage({
            requiredParam: {
                userId: this.props.userReducer.user.userId,
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
                key: "image"
            }
        })
    }

    onShowDrivingImage() {
        this.props.setPhoto(this.props.addDriverThirdReducer.data.drivingImage)
        RouterDirection.singlePhotoView(this.props.parent)({
            initParam: {
                onUpdateImage: () => this.launchCamera(this.updateDrivingImage)
            }
        })
    }

    onShowLicenseImage() {
        this.props.setPhoto(this.props.addDriverThirdReducer.data.licenseImage)
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

    render() {
        let btnPaddingTop = window.height - (((window.width - 30) / 32 * 9 + 10) * 5) - 54 - StatusBar.currentHeight - 60 - 40
        btnPaddingTop = btnPaddingTop > 10 ? btnPaddingTop : 10
        return (
            <View style={{ flex: 1 }}>
                <StepIndicator stepList={[{ step: '1', title: '基本信息' }, { step: '2', title: '绑定货车' }, { step: '3', title: '上传照片' }]} current={2} />
                <View key={'w'} style={{ flexDirection: 'row' }}>
                    {!this.props.addDriverThirdReducer.data.drivingImage ?
                        <Camera title='上传身份证照片' onGetPhoto={this.updateDrivingImage} /> :
                        <PanelSingleItem onUpdateImage={this.onPressUpdateDrivingImage} onShowPhoto={this.onShowDrivingImage} title='身份证' imageUrl={this.props.addDriverThirdReducer.data.drivingImage} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />}
                    {!this.props.addDriverThirdReducer.data.licenseImage ?
                        <Camera title='上传行驶证照片' onGetPhoto={this.updateLicenseImage} /> :
                        <PanelSingleItem title='行驶证' onUpdateImage={this.onPressUpdateLicenseImage} onShowPhoto={this.onShowLicenseImage} imageUrl={this.props.addDriverThirdReducer.data.licenseImage} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />}
                </View>
                <View style={{ paddingTop: btnPaddingTop, paddingBottom: 10, paddingHorizontal: 10 }}>
                    <Button full onPress={()=>Actions.pop({popNum:3})} style={{ backgroundColor: '#00cade' }}>
                        <Text style={{ color: '#fff' }}>完成</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addDriverThirdReducer: state.addDriverThirdReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Third)
