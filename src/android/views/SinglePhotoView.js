import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    StatusBar,
} from 'react-native'
import { Button, Icon } from 'native-base'
import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window')

class SinglePhotoView extends Component {
    constructor(props) {
        super(props)
        this.renderPagination = this.renderPagination.bind(this)
        this.renderPhoteView = this.renderPhoteView.bind(this)
    }

    static defaultProps = {
        initParam: {
            onUpdateImage: () => { console.log(1111) }
        }
    }

    renderPagination(index, total, context) {
        return (
            <View style={{
                flex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: StatusBar.currentHeight + 24,
                left: 0,
                right: 0
            }}>
                <View style={{
                    borderRadius: 7,
                    backgroundColor: 'rgba(255,255,255,.15)',
                    padding: 3,
                    paddingHorizontal: 7
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 14
                    }}>{(index + 1).toString()} / {total.toString()}</Text>
                </View>
            </View>
        )
    }

    renderPhoteView() {
        const { communicationSettingReducer: { data: { file_host } } } = this.props
        return this.props.singlePhotoViewReducer.data.photo.map((item, i) => {
            return <View key={i} style={{ flex: 1 }} >
                <PhotoView
                    source={{ uri: `${file_host}/image/${item}` }}
                    resizeMode='contain'
                    minimumZoomScale={1}
                    maximumZoomScale={3}
                    androidScaleType='fitCenter'
                    style={styles.photo}
                />
            </View>
        })
    }

    render() {
        console.log(this.props.singlePhotoViewReducer)
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <Swiper
                    ref='Swiper'
                    //index={0} 
                    style={styles.wrapper}
                    renderPagination={this.renderPagination}
                    loop={false}
                    automaticallyAdjustContentInsets={true}
                >
                    {this.renderPhoteView()}
                </Swiper>
                <View style={{ position: 'absolute', top: 0, backgroundColor: 'rgba(255,255,255,0.1)', height: 40, width: width, flexDirection: 'row' }}>
                    <Button iconLeft transparent style={{ position: 'absolute', left: 0, }}
                        onPress={Actions.pop}>
                        <Icon style={{ color: '#888888' }} name='arrow-back' />
                        <Text style={{ color: '#888888' }}>返回</Text>
                    </Button>
                    <Button iconLeft transparent style={{ position: 'absolute', right: 0, }}
                        onPress={this.props.initParam.onUpdateImage}>
                        <Icon style={{ color: '#888888' }} name='camera' />
                        {/* <Text style={{ color: '#888888' }}>更新</Text> */}
                    </Button>
                </View>
                {/* <ConfirmModal
          title='确认删除图片？'
          isVisible={this.state.confirmModalVisible}
          onPressOk={this.onPressOk}
          onPressCancel={this.onPressCancel} /> */}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        singlePhotoViewReducer: state.singlePhotoViewReducer,
        communicationSettingReducer: state.communicationSettingReducer
    }
}

export default connect(mapStateToProps)(SinglePhotoView)

var styles = {
    wrapper: {
        backgroundColor: '#000',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        // width:600,
        // height,
        flex: 1
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
}