import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions
} from 'react-native'
import { Button, Icon } from 'native-base'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'

const window = Dimensions.get('window')

var photoOptions = {
    //底部弹出框选项
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: null,
    customButtons: [{ title: '选择照片（一次最多5张）', name: 'choosePhoto' }],
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

export default class Camera extends Component {
    constructor(props) {
        super(props)
        this.openPicker = this.openPicker.bind(this)
        this.launchCamera = this.launchCamera.bind(this)
        this.state = { modalVisible: false }
    }

    static defaultProps = {
        containerSytle: { marginLeft: 10, marginRight: 5, marginTop: 10 },
        width: (window.width - 15) / 2,
        title: '上传驾驶证照片'
    }


    launchCamera = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
               //console.log('User cancelled video picker')
            }else if (response.error) {
                //console.log('ImagePicker Error: ', response.error)
            }else if (response.customButton) {
                if (response.customButton == 'choosePhoto') {
                    this.openPicker()
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
                        this.props.onGetPhoto(param)
                    }).catch((err) => {
                        // return console.log(err)
                    })
            }
        })
    }


    openPicker() {
        ImageCropPicker.openPicker({
            multiple: true
        }).then(images => {
            if (images.length > 5) {
                this.setState({ modalVisible: true })
            }
            else {
                images.forEach((item) => {
                    let pos = item.path.lastIndexOf('/')
                    ImageResizer.createResizedImage(item.path, 960, 960, 'JPEG', 100)
                        .then((resizedImageUri) => {
                            let param = {
                                postFileParam: {
                                    imageUrl: resizedImageUri,
                                    imageType: item.mime,
                                    imageName: encodeURI(item.path.substring(pos + 1))
                                }
                            }
                            this.props.onGetPhoto(param)
                        }).catch((err) => {
                            // return console.log(err)
                        })
                })
            }
        }).catch(err => {
            // console.log('err')
        })
    }

    render() {
        return (
            <View style={{ width: this.props.width, height: this.props.width / 16 * 9, ...this.props.containerSytle }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button onPress={this.launchCamera} rounded style={{ width: 50, borderRadius: 25, height: 50, backgroundColor: '#00cade', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                        <Icon name='camera' style={{ fontSize: 24 }} />
                    </Button>
                    <Text style={{ fontSize: 10, color: '#bfbfbf', paddingTop: 5 }}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}